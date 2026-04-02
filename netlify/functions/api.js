import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

const app = express();
app.use(cors({ origin: true, credentials: true })); 
app.use(express.json());
app.use(cookieParser());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// --- AUTH ---
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashedPassword } });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' });
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' });
    res.json({ user: { id: user.id, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// --- PAGES (Authenticated) ---
app.get('/api/pages', authenticate, async (req, res) => {
  try {
    const pages = await prisma.page.findMany({ where: { userId: req.user.userId }, orderBy: { updatedAt: 'desc' } });
    res.json({ pages });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/pages', authenticate, async (req, res) => {
  try {
    const { title, slug, theme, sections } = req.body;
    const existing = await prisma.page.findUnique({ where: { slug } });
    if (existing) return res.status(400).json({ error: 'Slug already taken' });

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        theme: theme || 'minimal',
        sections: JSON.stringify(sections || []),
        userId: req.user.userId
      }
    });
    res.json({ page });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/pages/:id', authenticate, async (req, res) => {
  try {
    const page = await prisma.page.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    res.json({ page });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/pages/:id', authenticate, async (req, res) => {
  try {
    const { title, slug, theme, sections } = req.body;
    const page = await prisma.page.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!page) return res.status(404).json({ error: 'Page not found' });
    
    // Check if new slug is taken
    if (slug && slug !== page.slug) {
        const existing = await prisma.page.findUnique({ where: { slug } });
        if (existing) return res.status(400).json({ error: 'Slug already taken' });
    }

    const updated = await prisma.page.update({
      where: { id: req.params.id },
      data: {
        title: title || page.title,
        slug: slug || page.slug,
        theme: theme || page.theme,
        sections: sections ? JSON.stringify(sections) : page.sections
      }
    });
    res.json({ page: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/pages/:id/publish', authenticate, async (req, res) => {
  try {
    const page = await prisma.page.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!page) return res.status(404).json({ error: 'Page not found' });

    const updated = await prisma.page.update({
      where: { id: req.params.id },
      data: { isPublished: true }
    });
    res.json({ page: updated });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/pages/:id/unpublish', authenticate, async (req, res) => {
  try {
    const page = await prisma.page.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!page) return res.status(404).json({ error: 'Page not found' });

    const updated = await prisma.page.update({
      where: { id: req.params.id },
      data: { isPublished: false }
    });
    res.json({ page: updated });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/pages/:id/duplicate', authenticate, async (req, res) => {
  try {
    const page = await prisma.page.findFirst({ where: { id: req.params.id, userId: req.user.userId } });
    if (!page) return res.status(404).json({ error: 'Page not found' });

    const newSlug = page.slug + '-copy-' + Math.floor(Math.random() * 10000);
    const newPage = await prisma.page.create({
      data: {
        title: page.title + ' (Copy)',
        slug: newSlug,
        theme: page.theme,
        sections: page.sections,
        userId: req.user.userId,
        isPublished: false
      }
    });
    res.json({ page: newPage });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- PUBLIC ---
app.get('/api/public/pages/:slug', async (req, res) => {
  try {
    const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
    if (!page || !page.isPublished) return res.status(404).json({ error: 'Page not found' });
    res.json({ page });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/public/pages/:slug/view', async (req, res) => {
  try {
    const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
    if (!page || !page.isPublished) return res.status(404).json({ error: 'Page not found' });

    const updated = await prisma.page.update({
      where: { id: page.id },
      data: { viewCount: { increment: 1 } }
    });
    res.json({ success: true, viewCount: updated.viewCount });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/public/pages/:slug/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
    if (!page || !page.isPublished) return res.status(404).json({ error: 'Page not found' });

    const submission = await prisma.contactSubmission.create({
      data: { name, email, message, pageId: page.id }
    });
    res.json({ success: true, submission });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const handler = serverless(app);
