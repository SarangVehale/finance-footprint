
import React from "react";
import { ChevronRight } from "lucide-react";

/**
 * Overview content section for documentation
 * Provides general information about the Finance Footprint application
 */
const OverviewContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">Finance Footprint Overview</h1>
      <p className="text-muted-foreground">Explore the Finance Footprint system and its capabilities</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">Introduction</h2>
      <p className="text-muted-foreground">
        Finance Footprint is a personal finance tracking application built with React, TypeScript, and Tailwind CSS. 
        It provides users with intuitive tools to track income and expenses, visualize financial data, and manage
        financial notes. The application is designed to work across web and mobile platforms, with a focus on
        responsive design and user experience.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Key Features</h2>
      <ul className="space-y-2">
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Transaction tracking (income and expenses)</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Visual analytics with charts and insights</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Dark/light mode support</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Multiple currency support</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Notes management with text and checklist support</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Mobile-responsive design</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Real-time updates</span>
        </li>
        <li className="flex items-start">
          <div className="mr-2 mt-1 rounded-full bg-primary/10 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
          </div>
          <span>Native mobile support (iOS & Android)</span>
        </li>
      </ul>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">System Architecture</h2>
      <p className="text-muted-foreground mb-4">
        Finance Footprint consists of a React frontend with TypeScript, utilizing local storage for data persistence.
        The system is built with a mobile-first approach and supports PWA installation.
      </p>
      
      <div className="bg-muted/40 p-6 rounded-md border">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="border rounded-md p-4 bg-card text-center w-full sm:w-auto">
            <div className="mb-2 font-bold">React Frontend</div>
            <div className="text-xs text-muted-foreground">UI & Logic</div>
          </div>
          <ChevronRight className="rotate-90 sm:rotate-0" />
          <div className="border rounded-md p-4 bg-card text-center w-full sm:w-auto">
            <div className="mb-2 font-bold">Local Storage</div>
            <div className="text-xs text-muted-foreground">Data Persistence</div>
          </div>
          <ChevronRight className="rotate-90 sm:rotate-0" />
          <div className="border rounded-md p-4 bg-card text-center w-full sm:w-auto">
            <div className="mb-2 font-bold">Analytics Engine</div>
            <div className="text-xs text-muted-foreground">Data Processing</div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default OverviewContent;
