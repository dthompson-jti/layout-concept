# eSeries Hackathon Project: Next-Generation UI Proof of Concept

This project is a high-craft proof of concept exploring the next-generation user interface for the eSeries court case management system. It demonstrates a modern, responsive, and deeply interactive layout approach — evolving beyond static, linear screens into a personalized, modular, and fluid workspace.

The project serves as both a technical reference and a UX vision piece for the modernization of eSeries and the foundations of its new design system.

## Core Philosophy

This project embodies clarity, flexibility, and craft. Every element — layout, motion, and interaction — aims to deliver a professional yet contemporary experience for a broad spectrum of court users.

*   **Adaptive**: Responsive masonry grid supports wide monitors, tablets, and mobile without compromise.
*   **Personalized**: Users can arrange, collapse, and hide tiles — preserving preferences automatically.
*   **Performant**: Virtualized tables and lightweight rendering ensure smooth performance even with large datasets.
*   **Accessible**: Built with accessibility in mind, leveraging semantic HTML and accessible component primitives.
*   **Evangelical**: A tangible vision for what modern, high-craft UI design can look and feel like in complex enterprise systems.

## Key Concepts

### 1. The Case Dashboard

The Case Dashboard is the centerpiece — a dynamic, modular canvas for case data. It allows users to see what matters most, the way they prefer.

*   **Masonry Layout**: Responsive multi-column grid (1–3 columns) that adapts fluidly to viewport size.
*   **Reorder & Customize**: Drag-and-drop tile arrangement and visibility controls.
*   **Persistent Layouts**: User settings (order, collapsed state, hidden state) are automatically stored in the browser's local storage.
*   **Role Awareness (Future)**: While not in scope for the POC, future versions may adapt tile sets based on user role or permissions.

### 2. Tile Architecture

Each tile is a self-contained module with a clear structure and behavior:

| Mode        | Description                                                                                       |
| :---------- | :------------------------------------------------------------------------------------------------ |
| **Expanded**  | Full inline interaction view, showing data tables or cards.                                       |
| **Collapsed** | Hides the tile's content to save space, keeping only the header visible.                          |
| **Maximized** | Immersive full-page experience, maintaining visual continuity through a shared layout animation. |

All transitions are powered by Framer Motion for smooth, context-preserving animations. Tiles are independent; no data dependencies exist between them in this proof of concept.

#### Table ↔ Card View

Each data tile supports a one-tap toggle between Table and Cards. Cards derive from the same column configuration used by the table. Columns declare a priority (1–4), visibility by breakpoint, and optional card roles (title, subtitle, badge, meta). Cards scroll vertically with virtualization and adapt to width using an intracard auto-fit grid, keeping content wider (not taller) on larger viewports. User view choice is persisted per tile.

### 3. Interaction Model

This project emphasizes fluid motion and immediate response. Every animation is purposeful — connecting states rather than distracting from them.

*   Tile maximization feels physical, as the tile grows naturally to fill the screen.
*   Drag-and-drop interactions use subtle shadows for realism.
*   Tables scroll with 60–120fps fidelity through virtualization.
*   State transitions are accessible and interruptible, respecting user control.

## Technologies & Architecture

A modern, high-performance stack was chosen for speed, clarity, and long-term scalability.

| Category                | Technology                                              | Purpose                                                 |
| :---------------------- | :------------------------------------------------------ | :------------------------------------------------------ |
| **Framework**           | React + Vite                                            | Fast, modular development environment.                  |
| **State Management**    | Jotai + `jotai/utils`                                   | Atomic state and seamless `localStorage` persistence.   |
| **Layout**              | `react-masonry-css`                                     | Lightweight responsive masonry grid.                    |
| **Animation**           | Framer Motion                                           | Physics-based, interruptible UI transitions.            |
| **Drag & Drop**         | `@dnd-kit/core`                                         | Accessible, performant reordering.                      |
| **Tables & Virtualization** | `@tanstack/react-table` + `@tanstack/react-virtual` | Headless logic and high-performance scrolling.          |
| **UI Primitives**       | Radix UI                                                | Accessible, unstyled foundations for custom components. |
| **Styling**             | CSS Modules + CSS Variables                             | Scoped, themeable styles built on design tokens.        |
| **Language**            | TypeScript                                              | Type safety and improved maintainability.               |

## Project Structure

The project uses a flat, feature-centric architecture. Global, reusable code is kept separate from the self-contained `caseDashboard` feature.

```
/
├── public/                          # Static assets
└── src/
    ├── components/                  # Global, reusable UI components (Tooltip, Modal, Select, etc.)
    ├── data/                        # Global state (Jotai atoms), custom hooks, and type definitions
    ├── features/
    │   └── caseDashboard/           # The main, self-contained feature for this POC
    │       ├── CaseDashboard.tsx    # Main view: orchestrates the layout, DnD, and tiles
    │       ├── Tile.tsx             # The core tile container component
    │       ├── VirtualizedTable.tsx # Reusable high-performance table for tiles
    │       ├── DocumentsTile.tsx    # Example of a specific tile component
    │       ├── ... (other tile components)
    │       ├── dashboardState.ts    # Jotai atoms for layout state and persistence
    │       └── tileRegistry.ts      # Maps tile keys to their components for rendering
    │
    ├── App.tsx                      # Main application component
    ├── main.tsx                     # Application entry point
    └── index.css                    # Global styles and CSS layer imports
```

### Key Files

*   **`src/features/caseDashboard/CaseDashboard.tsx`** – Core layout orchestrator: manages the masonry grid, DnD context, and maximized tile transitions.
*   **`src/features/caseDashboard/dashboardState.ts`** – Defines the `TileConfig` type and the Jotai atom for persisting the layout state via `atomWithStorage`.
*   **`src/features/caseDashboard/VirtualizedTable.tsx`** – High-performance data table combining TanStack Table and TanStack Virtual for smooth scrolling with large datasets.
*   **`src/features/caseDashboard/Tile.tsx`** – The fundamental tile container; handles collapsed/expanded states, actions, and serves as the layout root for animations.

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

## Future Directions

*   **Accessibility Audit**: Full keyboard navigation testing and reduced motion compliance.
*   **Data Sync**: Migrate layout preferences from local storage to a cloud-based persistence layer.
*   **Role-Based Dashboards**: Tailor available tiles and default layouts based on user type.
*   **Tile Schema Standardization**: Establish a formal `TileConfig` contract for integration into a wider design system.
*   **Evangelization Demo**: Create a narrative walkthrough video showing the legacy experience vs. this new proof of concept.

## Design Principles

> “Motion should maintain context, not decorate.”

> “Every layout change should feel physically plausible.”

> “Hierarchy is expressed through scale and motion, not just color or borders.”

This project is the proof of craft — a glimpse into the future of eSeries, where flexibility, performance, and design maturity converge.