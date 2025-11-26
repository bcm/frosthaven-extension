# Frosthaven Scenario Backlog Walkthrough

## Overview
This extension adds a scenario backlog overlay to the Frosthaven Storyline Tracker. It allows you to prioritize unlocked scenarios and syncs the order across devices using Supabase.

## Features Implemented
- **DOM Parsing**: Automatically detects unlocked & incomplete scenarios from the tracker page.
- **Drag-and-Drop**: Reorder scenarios to prioritize your backlog.
- **Cloud Sync**: Persists your backlog order to Supabase (Postgres).
- **Authentication**: Uses Google OAuth via Supabase.
- **Responsive UI**: Works on Desktop and Mobile.

## Verification Steps

### 1. Build the Extension
The extension has been built to the `dist/` directory.
```bash
npm run build
```

### 2. Load in Chrome
1. Open Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** (top right).
3. Click **Load unpacked**.
4. Select the `dist/` folder in this project.

### 3. Configure Supabase (Important)
You need to provide your actual Supabase URL and Anon Key in the `.env` file (or build with them).
Since `.env` is not committed, ensure you have set:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```
Then rebuild: `npm run build`.

### 4. Test on Frosthaven Tracker
1. Go to a Frosthaven Storyline Tracker page (or use a local mock).
2. The overlay should appear in the top-right.
3. **Login**: If not logged in, the extension will prompt (or check console for now). Click the extension icon to trigger login if implemented in popup, or rely on the service worker flow.
4. **Drag & Drop**: Drag scenarios to reorder.
5. **Reload**: Reload the page to verify the order persists.

## Project Structure
- `src/content-script.ts`: Main logic (DOM parsing, UI injection).
- `src/dom-extract.ts`: DOM parsing logic.
- `src/dragdrop.ts`: SortableJS wrapper.
- `src/overlay.ts`: UI component.
- `src/supabase-client.ts`: Supabase integration.
- `src/service-worker.ts`: Background auth handling.

## Tests
Unit tests cover DOM parsing, Drag-and-Drop, and Overlay logic.
```bash
npm test
```
