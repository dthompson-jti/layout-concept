**`README.md`**
```markdown
# eSeries Hackathon Project: Next-Generation UI Proof of Concept

This project is a high-craft proof of concept exploring the next-generation user interface for the eSeries court case management system. It demonstrates a modern, responsive, and deeply interactive layout approach — evolving beyond static, linear screens into a personalized, modular, and fluid workspace.

The project serves as both a technical reference and a UX vision piece for the modernization of eSeries and the foundations of its new design system.

## Core Philosophy

This project embodies clarity, flexibility, and craft. Every element — layout, motion, and interaction — aims to deliver a professional yet contemporary experience for a broad spectrum of court users.

*   **Adaptive**: Responsive components and layouts support wide monitors, tablets, and mobile without compromise.
*   **Personalized**: Users can arrange, collapse, and hide dashboard tiles — preserving preferences automatically.
*   **Performant**: Virtualized tables, direct motion value updates, and lightweight rendering ensure smooth performance even with large datasets and complex animations.
*   **Accessible**: Built with accessibility in mind, leveraging semantic HTML and accessible component primitives.
*   **Evangelical**: A tangible vision for what modern, high-craft UI design can look and feel like in complex enterprise systems.

## Key Concepts

### 1. The Smart Sticky Header Unit

The `AppHeader` and `CaseHeader` are combined into a single, cohesive unit that provides critical, at-a-glance context for the entire case. This unit employs a sophisticated interaction model to maximize screen real estate while keeping navigation and actions immediately accessible.

*   **Direct-Manipulation Scrolling**: The header unit's visibility is directly and proportionally tied to the user's scroll gesture. It is not a binary "show/hide" animation; instead, it feels as though the user is physically pushing the header unit off-screen and pulling it back on. If a user scrolls down by 30 pixels, the header moves up by 30 pixels.
*   **Performance-First Animation**: The animation is driven by a `motionValue` in Framer Motion, which updates the CSS `transform` property directly in the DOM, bypassing React's render cycle for high-frequency scroll events. This ensures a silky-smooth, 60fps experience with zero jank.
*   **Architectural Pattern**: The implementation uses a "Fixed Wrapper Pattern" where the entire header unit is a single `position: fixed` element. A dynamically sized spacer element is placed in the document flow to prevent the main content from rendering underneath the fixed unit.

### 2. The Responsive Case Header

Nested within the smart header unit, the `CaseHeader` is designed with a "progressive disclosure" strategy, ensuring clarity and utility on any device.

*   **Multi-Breakpoint Layout**: The header utilizes three distinct layouts for mobile, tablet, and desktop, ensuring optimal information hierarchy and spacing for each context.
*   **Graceful Enhancement**: On the smallest screens, only essential identifiers are shown. As screen real estate increases, secondary and tertiary details (filing dates, personnel, tags) are gracefully introduced.
*   **Adaptive Badge Grouping**: On tablets and mobile, status badges and informational tags are consolidated into a single, clean row for at-a-glance context.

### 3. The Case Dashboard

The Case Dashboard is the centerpiece — a dynamic, modular canvas for case data. It allows users to see what matters most, the way they prefer.

*   **Masonry Layout**: Responsive multi-column grid (1–3 columns) that adapts fluidly to viewport size.
*   **Reorder & Customize**: Drag-and-drop tile arrangement and visibility controls.
*   **Persistent Layouts**: User settings (order, collapsed state, hidden state) are automatically stored in the browser's local storage.

### 4. Tile Architecture

Each tile is a self-contained module with a clear structure and behavior:

| Mode        | Description                                                                                       |
| :---------- | :------------------------------------------------------------------------------------------------ |
| **Expanded**  | Full inline interaction view, showing data tables or cards.                                       |
| **Collapsed** | Hides the tile's content to save space, keeping only the header visible.                          |
| **Maximized** | Immersive full-page experience, maintaining visual continuity through a shared layout animation. |

All transitions are powered by Framer Motion for smooth, context-preserving animations.

#### Table ↔ Card View

Each data tile supports a one-tap toggle between Table and Cards. Cards derive from the same column configuration used by the table. Columns declare a priority, visibility by breakpoint, and optional card roles (title, subtitle, badge, meta). Cards scroll vertically with virtualization and adapt to width using an intracard auto-fit grid. User view choice is persisted per tile.

## Interaction Model

This project emphasizes fluid motion and immediate response. Every animation is purposeful — connecting states rather than distracting from them.

*   **Physicality in Motion**: The Smart Sticky Header is the prime example of our interaction philosophy. Its movement is not decorative; it is a direct, 1:1 response to user input, making the interface feel tangible and predictable.
*   **Context Preservation**: Tile maximization feels physical, as the tile grows naturally from its position to fill the screen, maintaining the user's sense of place.
*   **High-Fidelity Scrolling**: Tables and card lists scroll with 60–120fps fidelity through virtualization, even with thousands of rows.
*   **Interruptible and Responsive**: All major animations are interruptible, respecting user control at all times.

## Technologies & Architecture

A modern, high-performance stack was chosen for speed, clarity, and long-term scalability.

| Category                | Technology                                              | Purpose                                                 |
| :---------------------- | :------------------------------------------------------ | :------------------------------------------------------ |
| **Framework**           | React + Vite                                            | Fast, modular development environment.                  |
| **State Management**    | Jotai + `jotai/utils`                                   | Atomic state and seamless `localStorage` persistence.   |
| **Layout**              | `react-masonry-css`                                     | Lightweight responsive masonry grid.                    |
| **Animation**           | Framer Motion                                           | Physics-based, interruptible UI transitions and gestures. |
| **Drag & Drop**         | `@dnd-kit/core`                                         | Accessible, performant reordering.                      |
| **Tables & Virtualization** | `@tanstack/react-table` + `@tanstack/react-virtual` | Headless logic and high-performance scrolling.          |
| **UI Primitives**       | Radix UI                                                | Accessible, unstyled foundations for custom components. |
| **Styling**             | CSS Modules + CSS Variables                             | Scoped, themeable styles built on design tokens.        |
| **Language**            | TypeScript                                              | Type safety and improved maintainability.               |

## Project Structure

```
/
├── public/
└── src/
    ├── components/                  # Global, reusable UI components
    ├── data/                        # Global state, hooks, mock data, and type definitions
    ├── features/
    │   ├── caseHeader/              # The responsive header feature
    │   └── caseDashboard/           # The modular dashboard feature
    │
    ├── App.tsx                      # Main application component, orchestrates layout and header animation
    ├── main.tsx                     # Application entry point
    └── index.css                    # Global styles and CSS layer imports
```

### Architectural Notes

*   **The "Fixed Unit" Pattern for Animated Headers**: The smart header is implemented as a single fixed-position unit containing both the `AppHeader` and `CaseHeader`. This unit is animated via `transform: translateY`. This pattern is critical because it avoids the known conflict where applying a `transform` to a `position: sticky` element breaks its sticky behavior. A dynamically-sized spacer `div` is used to push the main content down, preventing it from being obscured by the fixed header.
*   **Flat Structure**: Type definition files (`.d.ts`) and data models (`.ts`) live alongside hooks and state atoms in the `src/data` directory. There is no separate `src/types` directory, promoting a flatter, more discoverable structure.
*   **TypeScript Module Augmentation**: The file `src/data/tanstack-table.d.ts` is critical. It uses TypeScript's declaration merging to extend the types of the `@tanstack/react-table` library. This makes it possible to add custom metadata (like `priority` and `cardRole`) to column definitions in a fully type-safe way.
*   **File Naming and Casing**: Use `.tsx` only for files containing JSX. Files that only export types, constants, or logic should use `.ts`. **Crucially, be mindful of file name casing.** Git's default behavior on case-insensitive file systems (like Windows) can ignore casing changes, leading to hard-to-debug errors. Always use `git mv` for renaming files.

### Key Files

*   **`src/App.tsx`** – The application's root component. It orchestrates the entire page layout, manages the "Fixed Unit" header pattern, and contains the core Framer Motion logic that links scroll position to the header's `translateY` transform.
*   **`src/features/caseHeader/CaseHeader.tsx`** – The responsive, data-driven header that provides top-level case context and adapts its layout across three breakpoints. It is now a pure presentational component.
*   **`src/features/caseDashboard/CaseDashboard.tsx`** – Core layout orchestrator: manages the masonry grid, DnD context, and maximized tile transitions.
*   **`src/features/caseDashboard/dashboardState.ts`** – Defines the `TileConfig` type and the Jotai atom for persisting the dashboard layout state.

## Getting Started

### Prerequisites

*   Node.js ≥ v18
*   npm ≥ v9

### Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd eseries-layout-hackathon

# Install dependencies
npm install
```

### Run Development Server

```bash
npm run dev
```

Access the application at: `http://localhost:5173`

## Design Principles

> “Motion should be a direct response to user input, not a decoration.”

> “Every layout change should feel physically plausible.”

> “Hierarchy is expressed through scale and motion, not just color or borders.”

This project is the proof of craft — a glimpse into the future of eSeries, where flexibility, performance, and design maturity converge.
```