# Local Testing Guide

This guide explains how to test the Frosthaven Scenario Backlog extension locally in Chrome.

## Prerequisites

- Node.js v24.11.1 (LTS) - run `nvm use` in the project directory
- pnpm installed globally
- Chrome browser

## Step 1: Build the Extension

The extension uses Vite with CRXJS for development. You have two options:

### Option A: Development Mode (Recommended)

Development mode provides hot module reloading - changes to your code will automatically reload the extension.

```bash
pnpm dev
```

This will:
- Start the Vite dev server
- Build the extension in watch mode
- Output the extension files to the `dist/` directory
- Automatically rebuild when you make changes

**Keep this terminal running** while you develop.

### Option B: Production Build

For testing the production build:

```bash
pnpm build
```

This creates an optimized production build in the `dist/` directory.

## Step 2: Load the Extension in Chrome

1. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → Extensions → Manage Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked" button
   - Navigate to your project directory
   - Select the `dist/` folder
   - Click "Select"

4. **Verify Installation**
   - You should see "Frosthaven Scenario Backlog" appear in your extensions list
   - The extension icon should appear in your Chrome toolbar

## Step 3: Test the Extension

### Testing the Popup

1. Click the extension icon in the Chrome toolbar
2. The popup should open showing the extension UI

### Testing on the Frosthaven Storyline Tracker

1. Navigate to the Frosthaven Storyline Tracker website
2. The content script should automatically inject and run
3. Look for the extension's overlay/UI elements on the page

### Testing Authentication

1. Click the extension icon to open the popup
2. Click the "Login with Google" button
3. Complete the OAuth flow
4. Verify you're logged in

## Step 4: Debugging

### View Console Logs

**Content Script Logs:**
- Open DevTools on the webpage (F12 or Cmd+Option+I)
- Go to the Console tab
- Logs from `content-script.ts` appear here

**Background Service Worker Logs:**
- Go to `chrome://extensions/`
- Find "Frosthaven Scenario Backlog"
- Click "service worker" link under "Inspect views"
- Logs from `service-worker.ts` appear here

**Popup Logs:**
- Right-click the extension icon
- Select "Inspect popup"
- Logs from popup code appear here

### Common Issues

**Extension not loading:**
- Make sure you ran `pnpm dev` or `pnpm build` first
- Check that the `dist/` folder exists and contains files
- Try clicking "Reload" button on the extension card

**Changes not appearing:**
- If using `pnpm dev`, the extension should auto-reload
- If it doesn't, click the reload button on `chrome://extensions/`
- For popup changes, close and reopen the popup

**Content script not running:**
- Check the Console for errors
- Verify you're on the correct website
- The extension runs on all URLs (`<all_urls>` in manifest)

## Hot Reload (Development Mode)

When running `pnpm dev`:

1. **Code Changes** → Vite rebuilds → Extension auto-reloads
2. **Manifest Changes** → May require manual reload on `chrome://extensions/`
3. **Service Worker Changes** → Click "service worker" link to restart it

## Environment Variables

Make sure your `.env` file is configured with your Supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are loaded at build time, so restart `pnpm dev` after changing them.

## Testing Checklist

- [ ] Extension loads without errors
- [ ] Popup opens and displays correctly
- [ ] Content script injects on target website
- [ ] Google OAuth login works
- [ ] Scenario data is fetched and displayed
- [ ] Drag-and-drop reordering works
- [ ] Changes persist after page reload
- [ ] No console errors

## Uninstalling

To remove the extension:
1. Go to `chrome://extensions/`
2. Click "Remove" on the extension card

## Next Steps

- See [design.md](./design.md) for architecture details
- See [maintainers.md](./maintainers.md) for development workflows
