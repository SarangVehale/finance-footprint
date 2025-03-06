
# Finance Footprint Application Documentation

## File Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/       # Layout components
│   ├── ui/           # UI components from shadcn
│   ├── notes/        # Note-related components
│   └── settings/     # Settings-related components
├── config/           # Configuration files
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Main page components
├── services/         # Service files (localStorage, API, etc.)
└── types/            # TypeScript type definitions
```

## Key Components

### Layout
- `MobileLayout.tsx` - Mobile-friendly layout with navigation bar

### Pages
- `Index.tsx` - Home page with transaction summary and entry
- `Analytics.tsx` - Data visualization and financial analytics
- `History.tsx` - Transaction history
- `Notes.tsx` - Notes management
- `Settings.tsx` - Application settings
- `Tutorials.tsx` - Tutorial content
- `VideoTutorial.tsx` - Video tutorial player

### Settings Components
- `TutorialsModal.tsx` - Modal for tutorial content
- `ModalContainer.tsx` - Container for settings modals

### Notes Components
- `NoteModal.tsx` - Modal for creating/editing notes

## State Management
The application uses React state, localStorage for persistence, and React Query for data fetching.

## Styling
Tailwind CSS is used for styling with integration of shadcn/ui components.
