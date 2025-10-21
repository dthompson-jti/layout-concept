### Part 2: Updated PRD & UX/UI Specification

Here is the updated specification document that incorporates your decisions and refines the plan for the new features.

---

## **SPEC: Dashboard & Tile View Modes**

### 1. Overview

This document outlines the architecture and user experience for two major enhancements to the eSeries Dashboard: a global **Dashboard View Toggle** ([Grid | List]) and a tile-specific **Content View Toggle** ([Table | Card]). These features provide users with powerful control over information density and layout, ensuring the application is both powerful for expert users and readable for reviewers on any device.

### 2. Dashboard Controls

Located directly below the main "Case Dashboard" header, these controls manage the overall page layout.

#### 2.1. Dashboard View Toggle

A two-state `IconToggleGroup` that allows the user to switch between the two primary dashboard layouts.

*   **States:**
    1.  **Grid View (Default):** The current multi-column masonry layout. Optimized for information density and user customization of tile order and size.
    2.  **List View:** A single-column, simplified "feed" layout. Optimized for top-to-bottom readability.
*   **Iconography:**
    *   Grid: `grid_view`
    *   List: `view_list`
*   **State Persistence:** The user's choice (`grid` or `list`) will be saved to local storage via the `dashboardViewModeAtom` and will be the default on their next visit.

#### 2.2. Personalization Controls

A set of focused action buttons for managing the view.

*   **`[edit]` (Personalize):** A `btn-secondary` icon-only button.
    *   **Action:** Toggles `isEditModeAtom` on or off. This is its only function. When active, the user can drag-and-drop tiles in Grid View. In List View, this control may be disabled as reordering is not applicable.
*   **`[...]` (More Options):** A `btn-secondary` icon-only button.
    *   **Action:** Opens a dropdown menu for dashboard-level actions.
    *   **Menu Options:** "Reset to default layout", "Show/hide tiles", etc.

#### 2.3. List View Behavior Rules

Based on your feedback, List View will be an opinionated mode designed for clarity:

1.  **Single Column:** All tiles render at 100% width in a single vertical stack.
2.  **Forced Expansion:** All tiles are **forced into an expanded state**, ignoring their individual `isCollapsed` preference. This ensures the user sees all content in the feed without extra clicks.
3.  **Seamless Design:** The `background-color` and `border` of the main `Tile` component are removed to create a continuous, flowing page of content rather than a collection of distinct boxes.

### 3. Tile-Level Controls: [Table | Card] View

For tiles that display datasets (e.g., Documents, Case History), a content-level view toggle will be present in the tile's header.

#### 3.1. Technical Architecture

*   **Single Source of Truth:** Both the Table and Card views will be generated from a single, extended column definition schema (`AppColumnDef`). This eliminates duplicated logic and ensures consistency.
*   **Schema Extension (`AppColumnDef`):** We will extend TanStack Table's `ColumnDef` with two optional properties:
    *   `priority: 1 | 2 | 3`: Controls field visibility in the Card view at different breakpoints. (1=always visible, 3=desktop only).
    *   `cardRole: 'title' | 'subtitle' | 'badge' | 'meta'`: Assigns a semantic role to a field, dictating its visual treatment within a card.

#### 3.2. Card Schema Flexibility & Solution

To answer your question ("evaluate, I don't know"), we will implement a flexible, two-tiered system for card rendering:

1.  **The Standard Path (Declarative):** For 90% of cases, developers will simply use the `cardRole` property. Our `Card` component will automatically handle the styling for a `title`, `subtitle`, `badge`, and a grid of `meta` key-value pairs. This is fast, consistent, and easy.
2.  **The Escape Hatch (Functional):** For complex fields requiring custom rendering (e.g., a user avatar, a progress bar), the `AppColumnDef` will support an optional `renderCardField` function. If this function is provided, it will be used instead of the standard `cardRole` logic for that specific field.

This provides the best of both worlds: high-speed development for standard cases and full flexibility for exceptions.

**Example `AppColumnDef`:**
```typescript
const documentColumns: AppColumnDef<Document>[] = [
  { id: 'name', header: 'Name', accessorKey: 'name', priority: 1, cardRole: 'title' },
  { id: 'status', header: 'Status', accessorKey: 'status', priority: 1, cardRole: 'badge' },
  { id: 'type', header: 'Type', accessorKey: 'type', priority: 2, cardRole: 'meta' },
  // Example of using the escape hatch for a custom component
  { id: 'uploadedBy', header: 'Uploaded By', accessorKey: 'by', priority: 2, renderCardField: (user) => <UserAvatar name={user.name} /> },
];
```

#### 3.3. State Persistence

The chosen view mode (`table` or `card`) for each individual tile will be persisted in local storage via the `tileViewModesAtom`, which stores a `Record<string, 'table' | 'card'>`. A user's preference for the Documents tile will not affect their preference for the Case History tile.