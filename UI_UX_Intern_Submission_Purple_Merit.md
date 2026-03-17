# Purple Merit Technologies: UI/UX Intern Assessment
**Candidate:** [Your Name]
**Role:** UI/UX Intern Assessment
**Date:** March 2026

---

## 1. Problem Statement

### Users
The primary users of this platform are content creators, social media managers, agencies, and brands who manage accounts across multiple social ecosystems.

### The Problem
The current landscape of social media management is heavily fragmented. Users are forced to utilize 15+ different native apps or overly complex enterprise tools to handle their workflows. This fragmentation leads to:
- Repetitive copy-pasting across platforms.
- Struggle adapting content to varying formats (e.g., cropping a 16:9 video for a 9:16 Reel).
- Highly manual scheduling processes for multi-channel campaigns.
- Fragmented analytics that make cross-platform performance comparison nearly impossible.

### The Solution
A unified, responsive web platform that serves as a single source of truth. By utilizing a "Create Once, Customize Everywhere" philosophy, the platform simplifies multi-platform logic into an intuitive UX, featuring a universal composer, visual scheduling, and rolled-up analytics.

### Assumptions
- Users have authenticated access to their social accounts via a standard OAuth flow.
- The platform APIs support the required scheduling and analytics endpoints.
- The overarching user goal is saving time without sacrificing platform-specific content quality.

---

## 2. User Flows & Information Architecture

### Main Content Creation Flow
`Dashboard` → `Select "Create New Post"` → `Upload Universal Media` → `Select Target Platforms` → `Customize Platform-Specific Settings (e.g. crop for IG)` → `Schedule/Publish`

### Live Scheduling Flow
`Dashboard` → `Schedule Live Event` → `Upload Pre-Recorded Video` → `Select Compatible Platforms (YouTube, FB, IG, Twitch)` → `Add Live Details (Thumbnail/Title)` → `Schedule`

### Analytics Flow
`Dashboard` → `Click "Analytics"` → `View High-Level Summaries (Reach/Engagement)` → `Use Date/Platform Filters` → `View Platform Breakdown` → `Review Individual Post Performance Tables`

---

## 3. Wireframes & Structural Layout
The structural logic of the platform is baked into a consistent layout system:
- **Left Sidebar:** Persistent navigation containing the core workflows (Dashboard, Create, Calendar, Analytics).
- **Top Header:** Global search, notifications, and profile settings.
- **Main Content Area:** Responsive grid system that adapts dynamically to the workflow (e.g., a two-column split for creating posts, or a full-width data table for analytics).

---

## 4. High-Fidelity Designs

*Please see the included generated UI mockups or the live interactable prototype.*

The design system utilizes a modern, clean aesthetic:
- **Color Palette:** Deep purple primary (`#7c3aed`) with crisp white surfaces and slate gray text for maximum legibility.
- **Typography:** `Inter` for strong, legible data presentation.
- **Components:** Soft borders (`12px` radius), subtle drop shadows for elevation, and glassmorphism elements to feel premium.

---

## 5. Responsive Updates
I made sure the platform looks good on mobile too. 
- **Desktop:** Uses the full width for the side-by-side composer and data tables.
- **Mobile/Tablet:** The sidebar navigation tucks away into a hamburger menu. The split-pane composer stacks vertically (upload area first, then the preview) so it's actually usable on a phone screen.

---

## 6. Prototype Link
The interactive prototype is built in React and runs locally. It covers the flow from the Dashboard, to Creating a post, to Scheduling, and checking Analytics.

**Local Prototype URL:** `http://localhost:5173`
*(Make sure to run `npm install` and `npm run dev` in the project folder first)*

---

## 7. Design Rationale

**1. Why structure it this way?**
I decided to keep the Navigation pretty flat. Content creation, scheduling, and analytics are totally different headspaces. Placing them as top-level sidebar items means users can jump around quickly without getting lost in deep menus.

**2. Handling multi-platform posting?**
Instead of making the user create 4 different posts for 4 different platforms, I designed what I call a "Universal Composer." The left side handles the base content (the video/image and the main caption). The right side dynamically previews what this base content will look like on the selected platforms, and even warns the user if a format is incompatible (like trying to put a 10-minute video on Twitter).

**3. Scheduling UX**
The visual calendar grid lets users see their whole plan for the month. I added color-coded event tags (like Red for Video, Blue for Carousel) so it's easy to see what's going out without reading every single line.

**4. Analytics Breakdown**
Data hierarchy is super important here. I put the "health check" metrics (Total Impressions, Avg Engagement Rate) right at the top. The secondary charts (like Audience by Platform) are in the middle to spot trends. The really dense spreadsheet-style data for individual posts is kept at the bottom for when users specifically need to drill down into the numbers.
