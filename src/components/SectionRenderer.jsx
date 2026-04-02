import React from 'react';
import { Mail, ArrowRight, CheckCircle, Smartphone, Monitor, ShieldCheck, Zap } from 'lucide-react';

const SectionRenderer = ({ section, pageTheme }) => {
  const { type, content } = section;

  switch (type) {
    case 'hero':
      return (
        <section className="section hero py-16" id={section.id}>
          <div className="container text-center">
            <h1 className="text-5xl font-bold mb-6">{content.title || 'Welcome to Your Vibe'}</h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto mb-10">{content.subtitle || 'Build something beautiful that resonates with your audience.'}</p>
            {content.ctaText && (
              <a href={content.ctaLink || '#'} className="btn btn-primary btn-lg">
                {content.ctaText} <ArrowRight size={20} className="ml-2" />
              </a>
            )}
          </div>
        </section>
      );

    case 'features':
      return (
        <section className="section py-16" id={section.id}>
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">{content.title || 'Our Features'}</h2>
              <p className="opacity-70">{content.subtitle || 'Everything you need to succeed.'}</p>
            </div>
            <div className="features-grid">
              {(content.list || [
                { title: 'Fast Performance', desc: 'Optimized for speed and efficiency.', icon: <Zap size={32} /> },
                { title: 'Secure Design', desc: 'Built with security first in mind.', icon: <ShieldCheck size={32} /> },
                { title: 'Mobile First', desc: 'Looks great on any device.', icon: <Smartphone size={32} /> },
              ]).map((item, i) => (
                <div key={i} className="feature-card">
                  <div className="text-primary mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case 'contact':
      return (
        <section className="section py-16" id={section.id}>
          <div className="container max-w-xl mx-auto">
            <div className="card">
              <div className="text-center mb-10">
                <Mail size={40} className="text-primary mx-auto mb-4" />
                <h2 className="text-3xl font-bold">{content.title || 'Get in Touch'}</h2>
                <p className="opacity-70 mt-2">{content.subtitle || 'Send us a message and we\'ll get back to you soon.'}</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); alert('Form submission mock!'); }}>
                <input type="text" placeholder="Your Name" className="input" required />
                <input type="email" placeholder="Your Email" className="input" required />
                <textarea placeholder="Message" className="input" rows="4" required></textarea>
                <button type="submit" className="btn btn-primary w-full">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      );

    default:
      return <div className="p-4 text-center opacity-50">Invalid Section Type</div>;
  }
};

export default SectionRenderer;
