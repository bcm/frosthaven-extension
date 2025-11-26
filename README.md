# Frosthaven Scenario Backlog

A Chrome extension that enhances the [Frosthaven Storyline Tracker](https://frosthaven-story.vercel.app/) by adding a scenario backlog overlay for prioritizing unlocked scenarios.

## Features

- 🎯 **Smart Detection** - Automatically identifies unlocked and incomplete scenarios
- 🔄 **Drag & Drop** - Prioritize scenarios with intuitive drag-and-drop reordering
- ☁️ **Cloud Sync** - Syncs your backlog across all devices using Supabase
- 🔐 **Google Sign-In** - Secure authentication with Google OAuth
- 📱 **Responsive Design** - Works on desktop and mobile (Android)
- 💾 **Offline Support** - Local caching with automatic sync when online

## Quick Start

### Prerequisites

- Node.js v24.11.1 (LTS) - managed via nvm
- pnpm package manager
- Chrome browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bcm/frosthaven-extension.git
   cd frosthaven-extension
   ```

2. **Install dependencies**
   ```bash
   nvm use
   pnpm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Load extension in Chrome**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist/` folder

## Documentation

Detailed documentation is available in the [`docs/`](./docs) directory:

- **[Local Testing Guide](./docs/local-testing.md)** - Step-by-step instructions for testing the extension locally
- **[Technical Design](./docs/design.md)** - Comprehensive architecture and implementation details
- **[Maintainers Guide](./docs/maintainers.md)** - Development workflows and best practices
- **[Walkthrough](./docs/walkthrough.md)** - Feature overview and usage guide

## Technology Stack

- **Framework**: Vite + TypeScript
- **Extension Tooling**: CRXJS Vite Plugin
- **Backend**: Supabase (Auth + PostgreSQL + Storage)
- **UI Library**: SortableJS for drag-and-drop
- **Testing**: Vitest + JSDOM
- **Code Quality**: ESLint + Prettier + Husky

## Development

### Available Scripts

```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build production bundle
pnpm test         # Run test suite
pnpm lint         # Lint code
pnpm lint:fix     # Lint and auto-fix issues
pnpm format       # Format code with Prettier
```

### Pre-commit Hooks

The project uses Husky and lint-staged to automatically:
- Lint and fix code
- Format with Prettier
- Run related tests

These checks run automatically on every commit.

## Architecture

### Components

- **Content Script** - Injects overlay UI and extracts scenario data from the page
- **Service Worker** - Handles Google OAuth and manages background tasks
- **Supabase Client** - Authentication and data persistence
- **DOM Parser** - Extracts scenario information from the Frosthaven tracker
- **Overlay UI** - Responsive floating panel with drag-and-drop functionality

### Data Model

Scenario backlogs are stored in Supabase with row-level security:

```typescript
interface ScenarioBacklog {
  user_id: string;        // Supabase Auth user ID
  campaign_key: string;   // "frosthaven"
  ordering: number[];     // Ordered scenario IDs
  notes: object;          // Optional scenario notes
  updated_at: timestamp;  // Auto-updated
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❄️ for the Frosthaven community**
