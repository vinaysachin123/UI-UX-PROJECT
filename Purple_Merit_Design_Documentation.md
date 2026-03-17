# UI/UX Intern Assessment: Purple Merit Technologies

## 7.1 Problem Framing
**Users**: Creators, brands, agencies, and social media managers who manage accounts across multiple platforms.
**Problem**: The main issue I found is that the process of creating, publishing, scheduling, and analyzing social media content is spread out across 15+ different tools. This forces users into repetitive copy-pasting workflows, manual scheduling, and makes it hard to see performance in one place.
**Assumptions**: 
- I assumed users already have authenticated access to all their social accounts through a standard OAuth flow.
- The biggest pain point solving for is time wasted on repetitive tasks, so a unified "create once, customize everywhere" approach makes the most sense.

## 7.2 User Flow / Information Architecture

### Information Architecture (Navigation)
- **Home/Dashboard**: High-level overview, quick actions, agenda.
- **Create**: Media upload, unified editor, platform-specific customization.
- **Calendar**: Visual scheduling, drag-and-drop planning, list views.
- **Analytics**: Cross-platform insights, report generation.
- **Assets Library**: Saved media, templates, brand kits.
- **Settings**: Connected accounts, user preferences.

### Core User Flows
1. **Primary Content Creation to Publishing Flow**:
   Dashboard -> Click "Create Post" -> Select Content Type (Video/Image/Carousel) -> Upload Media/Write Caption -> Select Target Platforms -> Platform-Specific Tweaks (e.g. crop for IG vs. YouTube) -> Click "Publish Now" or "Schedule".
2. **Scheduling Flow**:
   At the final publishing step -> Select "Schedule for Later" -> Set optimal times globally or per-platform -> Review Timezone -> Confirm Schedule -> View on Calendar.
3. **Live Scheduling Flow (Pre-Recorded)**:
   Dashboard -> "Schedule Live Event" -> Upload pre-recorded video -> Select live-supported platforms (YouTube, FB, IG, Twitch) -> Enter Title/Thumbnail -> Set Date/Time -> Schedule.
4. **Analytics Access**:
   Dashboard -> Click "Analytics" tab -> View rolled-up metrics -> Filter by platform/date/campaign -> Drill-down into specific post performance.

## 7.3 Wireframes
Since this project was developed as a higher-fidelity coded prototype directly in React, the wireframes are baked into the flex/grid layout of `Layout.jsx` and the page components. The structural hierarchy is quite simple:
1. A persistent left sidebar for jumping between the main workflows (Dashboard, Create, Calendar, Analytics).
2. A top header for global search and notifications.
3. The main content area on the right, which switches based on the active task (e.g. data tables for analytics, split view for the post composer).

## 7.7 Design Rationale
- **Unified Editor with Split Preview**: To handle the complexity of posting to 15 different platforms, the design uses a 'universal' compose area on the left, paired with a dynamic preview panel on the right. This lets users type their caption once, but interactively preview exactly how the post will render on Instagram versus YouTube before hitting submit.
- **Task-Based Navigation**: I kept the IA flat. Creating, scheduling, and analyzing are top-level distinct tasks, so they live in the main sidebar to allow fast switching without deep menus.
- **Data Hierarchy in Analytics**: High-level totals (like Reach and Engagement Rate) stay pinned at the top as quick check-ups. Deeper trend charts and row-level post data live below, allowing users to progressively drill down into the numbers.
