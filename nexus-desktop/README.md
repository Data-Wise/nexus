# Nexus Desktop

Desktop application for personal knowledge management - built with Electron, React, and TypeScript.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Tech Stack

- **Electron** 28+ - Desktop application framework
- **React** 18 - UI framework
- **TypeScript** 5 - Type safety
- **Vite** 5 - Build tool via electron-vite
- **Tailwind CSS** 3 - Styling
- **Zustand** 4 - State management

## Project Structure

```
nexus-desktop/
├── src/
│   ├── main/              # Electron main process
│   │   └── index.ts
│   ├── preload/           # Preload scripts
│   │   └── index.ts
│   └── renderer/          # React application
│       ├── index.html
│       └── src/
│           ├── main.tsx
│           ├── App.tsx
│           └── index.css
├── dist-electron/         # Build output
└── package.json
```

## Sprint Progress

**Current Sprint**: Sprint 1 - Hello World (10 hours)

- [x] Set up Electron + React + TypeScript (2h)
- [ ] Create basic window layout (2h)
- [ ] Hard-code example notes (1h)
- [ ] Add routing between notes (2h)
- [ ] Polish with Tailwind (2h)
- [ ] Package as launchable app (1h)

## Next Steps

See [../SPRINT-1.md](../SPRINT-1.md) for detailed task breakdown.
