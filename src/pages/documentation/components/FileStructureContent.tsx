
import React from "react";

/**
 * File Structure content section for documentation
 * Provides information about project file organization
 */
const FileStructureContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">File Structure</h1>
      <p className="text-muted-foreground">Overview of the project file organization</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">Project Structure</h2>
      <div className="bg-muted/30 p-4 rounded-md font-mono text-sm overflow-x-auto">
        <div className="space-y-1">
          <p>src/</p>
          <p className="pl-6">├── components/</p>
          <p className="pl-12">├── ui/</p>
          <p className="pl-12">├── notes/</p>
          <p className="pl-12">├── settings/</p>
          <p className="pl-12">└── MobileLayout.tsx</p>
          <p className="pl-6">├── config/</p>
          <p className="pl-12">└── tutorials/</p>
          <p className="pl-6">├── docs/</p>
          <p className="pl-12">├── FileStructure.md</p>
          <p className="pl-12">├── SettingsSystem.md</p>
          <p className="pl-12">└── TutorialSystem.md</p>
          <p className="pl-6">├── hooks/</p>
          <p className="pl-12">├── use-mobile.tsx</p>
          <p className="pl-12">└── use-toast.ts</p>
          <p className="pl-6">├── lib/</p>
          <p className="pl-12">└── utils.ts</p>
          <p className="pl-6">├── pages/</p>
          <p className="pl-12">├── analytics/</p>
          <p className="pl-12">├── tutorials/</p>
          <p className="pl-12">├── video-tutorials/</p>
          <p className="pl-12">├── documentation/</p>
          <p className="pl-12">├── Index.tsx</p>
          <p className="pl-12">├── History.tsx</p>
          <p className="pl-12">├── Notes.tsx</p>
          <p className="pl-12">├── Settings.tsx</p>
          <p className="pl-12">└── SettingsDocumentation.tsx</p>
          <p className="pl-6">├── services/</p>
          <p className="pl-12">└── localStorage.ts</p>
          <p className="pl-6">└── types/</p>
          <p className="pl-12">├── note.ts</p>
          <p className="pl-12">├── transaction.ts</p>
          <p className="pl-12">└── tutorial.ts</p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Key Directories</h2>
      
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">components/</h3>
          <p className="text-sm text-muted-foreground">
            Contains all reusable UI components, organized by category.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium">Key Files:</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              <li>MobileLayout.tsx: Base responsive layout component</li>
              <li>notes/NoteCard.tsx: Card component for note display</li>
              <li>settings/SettingsMenu.tsx: Main settings navigation menu</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">pages/</h3>
          <p className="text-sm text-muted-foreground">
            Contains all main page components that are used for routing.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium">Key Files:</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              <li>Index.tsx: Home screen with transaction summary</li>
              <li>Notes.tsx: Notes management interface</li>
              <li>Settings.tsx: Application settings page</li>
              <li>analytics/Analytics.tsx: Financial analytics dashboard</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">services/</h3>
          <p className="text-sm text-muted-foreground">
            Service layer for data operations and external interactions.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium">Key Files:</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              <li>localStorage.ts: Local storage service for data persistence</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">types/</h3>
          <p className="text-sm text-muted-foreground">
            TypeScript type definitions for application data models.
          </p>
          <div className="mt-2">
            <h4 className="text-sm font-medium">Key Files:</h4>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              <li>transaction.ts: Types for transaction data</li>
              <li>note.ts: Types for note data</li>
              <li>tutorial.ts: Types for tutorial data</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default FileStructureContent;
