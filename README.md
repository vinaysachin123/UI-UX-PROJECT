# VibeKit Studio

VibeKit Studio is a full-stack, "vibe-centric" mini-site builder built for the Purple Merit Intern Assessment.

## 🚀 Deployed URL
**Live Demo**: [https://vibe-kit-studio.netlify.app](https://vibe-kit-studio.netlify.app)

---

## 🛠 Features

*   **Custom Design System**: Using Vanilla CSS with modern CSS variables for high-performance, frame-rate-friendly interactions.
*   **Dynamic Theming**: Switch between "Cyberpunk", "Mineral", "Neo-Brutalism", and "Modern Minimal" in a single click.
*   **Visual Page Builder**: Add, reorder, and edit sections (Hero, Features, Contact) with a live responsive preview.
*   **Public Publishing**: Generate unique slugs and publish your sites live to the world.
*   **Analytics**: Integrated view counting for every published page.
*   **Full Stack Security**: JWT-based authentication and server-side validation.

---

## ⚙️ Local Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone [your-repo-url]
    cd vibe-kit-studio
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="your-postgresql-url"
    JWT_SECRET="your-secure-secret"
    NODE_ENV="development"
    ```

4.  **Prisma Setup**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

---

## 🏗 Tradeoffs + Improvements

*   **Tradeoff: JSON Storage**: Sections are stored as a JSON string in the database for maximum flexibility. *Improvement*: Store sections as structured relational data for advanced querying.
*   **Tradeoff: No Image Uploads**: Currently uses consistent placeholders/icons. *Improvement*: Integrate Cloudinary or AWS S3 for user-uploaded assets.
*   **Tradeoff: Refresh Logic**: Handling deep links with redirects. *Improvement*: Edge functions for even faster localized routing.
*   **Tradeoff: Simple Auth**: Using standard JWT/HTTP-Only cookies. *Improvement*: Implement OAuth2 (Google/GitHub) for smoother signup.
*   **Tradeoff: Manual Validation**: *Improvement*: Use Zod or Joi for even more robust schema validation.

---

## 📧 Test User Credentials
*   **Email**: `test@purplemerit.com`
*   **Password**: `password123`
(Or simply create a new account via the signup page!)

---

## 📱 Responsiveness
Tested and optimized for:
*   **Desktop**: 1440px+
*   **Tablet**: 768px (iPad Mini/Air)
*   **Mobile**: 375px (iPhone 12/13/14)

---

Developed with ❤️ by [Your Name] for Purple Merit Technologies.
