# Frosthaven Scenario Backlog Extension  
### Detailed Technical Design Document (For Antigravity Agent)  
**Development Methodology: TDD (Red → Green → Refactor)**

---

## 1. Overview

Build a **Chrome/ChatGPT Atlas extension** that enhances the Frosthaven Storyline Tracker by adding a floating overlay that:

- Detects **unlocked + incomplete** scenarios
- Allows **drag-and-drop prioritization**
- Persists scenario ordering to **Supabase Postgres**
- Uses **Google Sign-In** authentication
- Syncs across all devices
- Has a **responsive UI** (desktop + Android)
- Hosts remote assets in **Supabase Storage** (preferred) or **S3**

All code development follows **test-driven development (TDD)**.

---

## 2. Technical Architecture

### 2.1 Components

#### Content Scripts
- `content-script.ts`
  - Injects overlay UI
  - Extracts scenario data
  - Manages drag-drop interactions
  - Communicates with Supabase

#### Background Service Worker
- `service-worker.ts`
  - Handles Google OAuth login flow
  - Refreshes Supabase auth tokens
  - Routes messages between scripts

#### Internal Modules
- `dom-extract.ts` — scenario parsing logic  
- `overlay.ts` — overlay UI component logic  
- `dragdrop.ts` — SortableJS wrapper module  
- `supabase-client.ts` — auth + CRUD  
- `types.ts` — shared type interfaces  
- `storage.ts` — fallback offline cache  

#### Remote Assets
- Prefer **Supabase Storage**
- Fallback: **S3 bucket** provided by user

---

## 3. Data Model

### Supabase Table: `scenario_backlogs`

| Field        | Type      | Description |
|--------------|-----------|-------------|
| user_id      | uuid      | Supabase Auth user |
| campaign_key | text      | Typically "frosthaven" |
| ordering     | jsonb     | Array of scenario numbers |
| notes        | jsonb     | Optional scenario notes |
| updated_at   | timestamptz | Auto-updated |

### Row-Level Security (RLS)
- Users can only read/update rows where `auth.uid() = user_id`

---

## 4. Supabase Integration

### 4.1 Authentication: Google OAuth

Enable in Supabase dashboard.

Browser extension must include:
- `auth.html` file (handles OAuth redirect)
- logic in service worker to finalize login

Required redirect URL:
```
chrome-extension://<extension-id>/auth.html
```

### 4.2 API Functions to Implement

```ts
async function supabaseLoad(userId: string, campaignKey: string): Promise<number[]>
async function supabaseSave(userId: string, campaignKey: string, ordering: number[]): Promise<void>
async function supabaseEnsureSession(): Promise<void>
```

---

## 5. DOM Parsing Logic

Parse scenario nodes from the Frosthaven map DOM.

Inputs:
- Scenario numbers
- “×” marker for locked scenarios
- radio buttons for "Incomplete" / "Complete"

Output:

```ts
interface Scenario {
  id: number;
  unlocked: boolean;
  complete: boolean;
  element: HTMLElement;
}
```

Only **unlocked + incomplete** scenarios go into backlog.

---

## 6. UI / Overlay Component

### Desktop Layout
- Floating draggable panel (top-right)
- Title: "Scenario Backlog"
- Scrollable list
- Drag-and-drop (SortableJS)
- Save indicator

### Mobile Layout
- Full-width bottom drawer
- Large touch targets
- Uses media queries

### Drag-and-Drop
- SortableJS with touch support
- On reorder → save to Supabase (with debounce)

---

## 7. Build System

Use:
- **Vite**
- **crxjs** plugin
- TypeScript

Build output directory:
```
dist/
```

---

## 8. Test-Driven Development Requirements

### Tools
- **Vitest**
- **JSDOM**
- **Chrome extension API mocks**
- **Supabase client mocks**

### Required Tests
- DOM parsing tests
- Overlay UI rendering tests
- Drag-drop order tests
- Supabase integration tests
- Background worker message passing tests

### TDD Process
1. Write failing test  
2. Implement minimum viable code  
3. Refactor with tests passing  

---

## 9. Remote Asset Hosting

### Prefer: Supabase Storage
- Bucket: `frosthaven-extension-assets`
- Public read enabled

### Fallback: S3
- Path structure:
  ```
  https://<domain>/frosthaven-extension/<asset>
  ```

Manifest permissions must include host patterns.

---

## 10. Deliverables (for Antigravity Agent)

Antigravity must produce:

1. Complete TypeScript extension codebase  
2. Fully implemented Supabase auth + data sync  
3. Responsive UI overlay component  
4. DOM parser for Frosthaven map  
5. Test suite with high coverage  
6. GitHub Actions CI workflow  
7. Production-ready build in `dist/`  

