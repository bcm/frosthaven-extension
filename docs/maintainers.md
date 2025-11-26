# Frosthaven Scenario Backlog Extension  
### Maintainer Guide: Development, Testing, Deployment & Maintenance

---

## 1. Local Development Setup

### Prerequisites
- Node 18+
- npm or pnpm
- Git
- Chrome or ChatGPT Atlas
- Supabase account
- Optional: Supabase CLI, Android device

### Installation

```
git clone git@github.com:<org>/<repo>.git
cd frosthaven-extension
npm install
```

Start dev mode:

```
npm run dev
```

---

## 2. Project Structure

```
src/
  content/
  background/
  modules/
public/
tests/
dist/
.github/workflows/
vite.config.ts
package.json
```

---

## 3. Extension Loading in Chrome / Atlas

1. Visit `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load Unpacked**
4. Select the `dist/` directory

For fast reloading, install **Extension Reloader**.

---

## 4. Supabase Setup

### Requirements
- Enable Google sign-in
- Create table `scenario_backlogs`
- Create bucket `frosthaven-extension-assets`
- Create RLS policies

### Redirect URL
```
chrome-extension://<extension-id>/auth.html
```

### Environment Variables
Create `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

These are bundled into extension via Vite.

---

## 5. Code Quality

### Linting
```
npm run lint
```

### Prettier
Automatic formatting (via plugin or script).

---

## 6. Testing

Use Vitest.

### Run all tests:

```
npm test
```

### Run in watch mode:

```
npm run test:watch
```

### Test Types
- Unit tests  
- DOM parsing tests  
- Overlay rendering tests  
- Mocked Supabase integration tests  
- Background worker tests  

---

## 7. GitHub Actions CI

Workflow file: `.github/workflows/ci.yml`

### CI Steps
1. Checkout  
2. Install Node  
3. Install dependencies  
4. Run lint  
5. Run tests  
6. Run build  
7. Upload build artifacts  

Triggers:
- PRs
- Push to `main`

---

## 8. Building for Production

```
npm run build
```

Output will be in `dist/`.

Preview:

```
npm run preview
```

---

## 9. Publishing to Chrome Web Store

1. Zip the `dist/` directory  
2. Upload in Chrome Developer Dashboard  
3. Add icons, descriptions, screenshots  
4. Choose visibility:
   - **Unlisted** (recommended early)
   - Public (full review)  
5. Submit

Review: Hours → days.

---

## 10. Using the Extension in ChatGPT Atlas

Atlas supports:
- Unpacked extensions
- CRX packages

Load via the same steps as Chrome.

---

## 11. Mobile Testing (Android)

Using Android Chrome:

1. Install via unlisted Web Store link  
2. Navigate to Frosthaven Storyline  
3. Test mobile drawer UI  
4. Test touch dragging  

Note: iOS does **not** support Chrome extensions.

---

## 12. Asset Hosting

### Preferred: Supabase Storage
- Bucket for JSON, images, config files

### Alternative: AWS S3
- Serve assets at:
  ```
  https://<domain>/frosthaven-extension/<asset>
  ```

Manifest must include:

```
"host_permissions": ["https://<domain>/frosthaven-extension/*"]
```

---

## 13. Versioning & Releases

Use semantic versioning:
- `0.1.x` alpha
- `0.2.x` beta
- `1.0.0` stable

Create tags:

```
git tag v0.1.0
git push --tags
```

---

## 14. Maintenance Tasks

### Monthly
- Update dependencies
- Review Supabase logs
- Audit permissions

### As Needed
- Update DOM selectors if Frosthaven site changes  
- Expand tests before adding new features  
- Refactor only when tests are green  

---

## 15. Troubleshooting

### Content script does not load
- Check manifest match patterns  
- Ensure Vite built files are present  

### Supabase login broken
- Verify OAuth redirect URL  
- Check extension ID  
- Ensure RLS policies are correct  

### Scenario parsing fails
- Frostrhaven DOM changed → update selectors  

---

## 16. Summary

This guide covers:

- Local development
- TDD workflow
- Supabase-based storage
- CI with GitHub Actions
- Deployment to Chrome and Atlas
- Long-term maintenance practices

