
import React from "react";

/**
 * System Architecture content section for documentation
 * Provides details about the system structure and components
 */
const SystemContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">System Architecture</h1>
      <p className="text-muted-foreground">An overview of the Finance Footprint application architecture</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">Architecture Overview</h2>
      <p className="text-muted-foreground">
        Finance Footprint follows a component-based architecture using React, with a focus 
        on modular design, responsive UI, and local data persistence.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Key Components</h2>
      <div className="space-y-4">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">MobileLayout</h3>
          <p className="text-sm text-muted-foreground">
            A responsive layout component that serves as the foundation for all mobile views,
            providing a consistent header, content area, and navigation.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Transaction Management</h3>
          <p className="text-sm text-muted-foreground">
            Handles income and expense tracking, with components for transaction entry,
            display, and summary calculation.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Analytics System</h3>
          <p className="text-sm text-muted-foreground">
            Provides visual representations of financial data using charts and calculated metrics,
            with filtering capabilities.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Notes System</h3>
          <p className="text-sm text-muted-foreground">
            Allows users to create and manage text and checklist notes, with automatic saving
            and responsive display.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Settings System</h3>
          <p className="text-sm text-muted-foreground">
            Manages user preferences including theme, currency, and categories, using a 
            modal-based interface.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Tutorial System</h3>
          <p className="text-sm text-muted-foreground">
            Provides written and video tutorials to help users learn the application,
            organized by difficulty and topic.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Data Flow</h2>
      <ol className="space-y-2">
        <li className="flex items-start">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
            1
          </div>
          <div>
            <span className="font-medium">User Input</span>
            <p className="text-sm text-muted-foreground">User interactions (form inputs, button clicks)</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
            2
          </div>
          <div>
            <span className="font-medium">State Updates</span>
            <p className="text-sm text-muted-foreground">Component state is updated using React's state management</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
            3
          </div>
          <div>
            <span className="font-medium">Data Processing</span>
            <p className="text-sm text-muted-foreground">Business logic processes the data</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
            4
          </div>
          <div>
            <span className="font-medium">Persistence</span>
            <p className="text-sm text-muted-foreground">storageService saves data to localStorage</p>
          </div>
        </li>
        <li className="flex items-start">
          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
            5
          </div>
          <div>
            <span className="font-medium">UI Update</span>
            <p className="text-sm text-muted-foreground">React re-renders the UI with the new state</p>
          </div>
        </li>
      </ol>
    </section>
  </div>
);

export default SystemContent;
