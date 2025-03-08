
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ChevronRight, 
  Book, 
  Code, 
  FileText, 
  HelpCircle, 
  Lightbulb, 
  Settings, 
  Shield,
  UserCircle,
  Server,
  Cpu,
  FileCode,
  TerminalSquare
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center space-x-3 w-full px-4 py-3 text-left",
      isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
    )}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

const SettingsDocumentation: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState("overview");
  const isMobile = window.innerWidth < 768;

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewContent />;
      case "system":
        return <SystemContent />;
      case "technical":
        return <TechnicalContent />;
      case "userGuide":
        return <UserGuideContent />;
      case "apiReference":
        return <ApiReferenceContent />;
      case "fileStructure":
        return <FileStructureContent />;
      case "troubleshooting":
        return <TroubleshootingContent />;
      case "security":
        return <SecurityContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <MobileLayout
      title="Documentation"
      showBackButton={true}
      onBackClick={() => window.history.back()}
    >
      <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)]">
        {/* Sidebar for desktop */}
        <aside className="hidden md:block w-64 bg-card border-r border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold flex items-center">
              <Book className="h-5 w-5 mr-2" />
              Documentation
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Explore the Finance Footprint system</p>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="py-2">
              <NavItem
                icon={<HelpCircle className="h-5 w-5" />}
                label="Overview"
                isActive={activeSection === "overview"}
                onClick={() => handleNavClick("overview")}
              />
              <NavItem
                icon={<Settings className="h-5 w-5" />}
                label="System Architecture"
                isActive={activeSection === "system"}
                onClick={() => handleNavClick("system")}
              />
              <NavItem
                icon={<UserCircle className="h-5 w-5" />}
                label="User Guide"
                isActive={activeSection === "userGuide"}
                onClick={() => handleNavClick("userGuide")}
              />
              <NavItem
                icon={<Server className="h-5 w-5" />}
                label="API Reference"
                isActive={activeSection === "apiReference"}
                onClick={() => handleNavClick("apiReference")}
              />
              <NavItem
                icon={<FileText className="h-5 w-5" />}
                label="File Structure"
                isActive={activeSection === "fileStructure"}
                onClick={() => handleNavClick("fileStructure")}
              />
              <NavItem
                icon={<FileCode className="h-5 w-5" />}
                label="Technical Details"
                isActive={activeSection === "technical"}
                onClick={() => handleNavClick("technical")}
              />
              <NavItem
                icon={<TerminalSquare className="h-5 w-5" />}
                label="Troubleshooting"
                isActive={activeSection === "troubleshooting"}
                onClick={() => handleNavClick("troubleshooting")}
              />
              <NavItem
                icon={<Shield className="h-5 w-5" />}
                label="Security"
                isActive={activeSection === "security"}
                onClick={() => handleNavClick("security")}
              />
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile Tabs */}
        <div className="md:hidden w-full p-2">
          <Tabs defaultValue="overview" value={activeSection} onValueChange={setActiveSection} className="w-full">
            <ScrollArea className="w-full" orientation="horizontal">
              <TabsList className="mb-4 flex w-max">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="userGuide">User Guide</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="apiReference">API</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
            </ScrollArea>

            {/* Tab content will be handled by the renderContent function */}
          </Tabs>
        </div>

        {/* Content area */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6">
              {renderContent()}
            </div>
          </ScrollArea>
        </main>
      </div>
    </MobileLayout>
  );
};

// Individual Content Components
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

const UserGuideContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">User Guide</h1>
      <p className="text-muted-foreground">Learn how to use Finance Footprint effectively</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">First Time Setup</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Launch the application</li>
            <li>Complete the welcome tour to understand key features</li>
            <li>Set your preferred currency in Settings</li>
            <li>Add your first transaction from the home screen</li>
          </ol>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Dashboard Overview</h3>
          <p className="text-sm text-muted-foreground">
            The dashboard displays your current balance, recent transactions, and quick access 
            to add income or expenses. Use the bottom navigation to access other features.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Transaction Management</h2>
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Adding Transactions</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Tap "Add Income" or "Add Expense" on the home screen</li>
            <li>Enter the amount</li>
            <li>Select or add a category</li>
            <li>Add an optional description</li>
            <li>Tap "Add" to save the transaction</li>
          </ol>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Editing Transactions</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Find the transaction in the list</li>
            <li>Tap the edit icon next to the transaction</li>
            <li>Modify the details in the modal</li>
            <li>Tap "Update" to save changes</li>
          </ol>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Deleting Transactions</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Find the transaction in the list</li>
            <li>Tap the delete icon next to the transaction</li>
            <li>Confirm deletion in the prompt</li>
          </ol>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Using Notes</h2>
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Creating Notes</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Navigate to the Notes tab</li>
            <li>Tap "Add Note" button</li>
            <li>Select note type (text or checklist)</li>
            <li>Enter note title and content</li>
            <li>The note is automatically saved</li>
          </ol>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Using Checklist Notes</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Create a new checklist note</li>
            <li>Add items using the "Add item" button</li>
            <li>Toggle checkboxes to mark items complete</li>
            <li>Edit item text by clicking on it</li>
          </ol>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Analytics Features</h2>
      <p className="text-sm text-muted-foreground mb-3">
        The Analytics tab provides visual insights into your financial data.
      </p>
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Expense Analysis</h3>
          <p className="text-sm text-muted-foreground">
            View your expenses broken down by category with pie charts and percentages.
            Filter by date range to focus on specific time periods.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Income Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your income sources and trends over time with bar charts and line graphs.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Savings Overview</h3>
          <p className="text-sm text-muted-foreground">
            Track your savings rate and net income with a visual savings calculator.
          </p>
        </div>
      </div>
    </section>
  </div>
);

const ApiReferenceContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">API Reference</h1>
      <p className="text-muted-foreground">Documentation for internal APIs and services</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">Storage Service</h2>
      <div className="bg-card rounded-lg p-4 border">
        <h3 className="font-medium text-base mb-2">Transaction Methods</h3>
        <div className="space-y-3">
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">getTransactions(): Transaction[]</p>
            <p className="text-xs text-muted-foreground mt-1">Retrieves all stored transactions</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">saveTransaction(transaction: Transaction): boolean</p>
            <p className="text-xs text-muted-foreground mt-1">Saves a new transaction to storage</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">updateTransaction(transaction: Transaction): boolean</p>
            <p className="text-xs text-muted-foreground mt-1">Updates an existing transaction</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">deleteTransaction(id: string): boolean</p>
            <p className="text-xs text-muted-foreground mt-1">Removes a transaction by ID</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-4 border mt-4">
        <h3 className="font-medium text-base mb-2">Note Methods</h3>
        <div className="space-y-3">
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">getNotes(): Note[]</p>
            <p className="text-xs text-muted-foreground mt-1">Retrieves all stored notes</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">saveNote(note: Note): boolean</p>
            <p className="text-xs text-muted-foreground mt-1">Saves a new note to storage</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">updateNote(note: Note): boolean</p>
            <p className="text-xs text-muted-foreground mt-1">Updates an existing note</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">deleteNote(id: string): boolean</p>
            <p className="text-xs text-muted-foreground mt-1">Removes a note by ID</p>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-lg p-4 border mt-4">
        <h3 className="font-medium text-base mb-2">Settings Methods</h3>
        <div className="space-y-3">
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">getCurrency(): string</p>
            <p className="text-xs text-muted-foreground mt-1">Gets the user's currency preference</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">setCurrency(currency: string): void</p>
            <p className="text-xs text-muted-foreground mt-1">Updates the user's currency preference</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">getCategories(): string[]</p>
            <p className="text-xs text-muted-foreground mt-1">Gets the list of transaction categories</p>
          </div>
          
          <div className="bg-muted p-3 rounded">
            <p className="font-mono text-sm">setCategories(categories: string[]): void</p>
            <p className="text-xs text-muted-foreground mt-1">Updates the list of transaction categories</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

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

const TechnicalContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">Technical Details</h1>
      <p className="text-muted-foreground">Implementation details and code architecture</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">State Management</h2>
      <p className="text-muted-foreground mb-3">
        The application uses a combination of local state management approaches:
      </p>
      
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">React State Hooks</h3>
          <p className="text-sm text-muted-foreground">
            Component-level state is managed using React's useState hook:
          </p>
          <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
            {`const [transactions, setTransactions] = useState<Transaction[]>([]);
const [activeTab, setActiveTab] = useState<string>("all");
const [isLoading, setIsLoading] = useState<boolean>(true);`}
          </pre>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Effects and Lifecycle</h3>
          <p className="text-sm text-muted-foreground">
            Data loading and side effects are managed with useEffect:
          </p>
          <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
            {`useEffect(() => {
  // Load transactions from storage
  const storedTransactions = storageService.getTransactions();
  setTransactions(storedTransactions);
  setIsLoading(false);
}, []);`}
          </pre>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Derived State</h3>
          <p className="text-sm text-muted-foreground">
            Calculated values are derived from state using useMemo for performance:
          </p>
          <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
            {`const totalBalance = useMemo(() => {
  return transactions.reduce((sum, t) => {
    return t.type === "income" ? sum + t.amount : sum - t.amount;
  }, 0);
}, [transactions]);`}
          </pre>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Component Architecture</h2>
      <p className="text-muted-foreground mb-3">
        The application follows a component-based architecture with a focus on reusability and composition.
      </p>
      
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Component Design Patterns</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Container components for data fetching and state management</li>
            <li>Presentational components for UI rendering</li>
            <li>Composition for complex UI structures</li>
            <li>Props for component configuration</li>
            <li>Memoization for performance optimization</li>
          </ul>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Modal System</h3>
          <p className="text-sm text-muted-foreground">
            The application uses a custom modal system for dialogs and forms:
          </p>
          <pre className="text-xs bg-muted p-2 rounded mt-2 overflow-x-auto">
            {`const [activeModal, setActiveModal] = useState<ModalType>(null);

// Open a modal
const handleOpenModal = (modal: ModalType) => {
  setActiveModal(modal);
};

// Close the current modal
const handleCloseModal = () => {
  setActiveModal(null);
};

// Render modal content based on activeModal state
<ModalContainer 
  activeModal={activeModal} 
  onClose={handleCloseModal}
  // Additional props for specific modals
/>`}
          </pre>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Form Handling</h2>
      <p className="text-muted-foreground mb-3">
        Forms are implemented using controlled components with React state:
      </p>
      
      <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
        {`// Form state
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("Other");
const [description, setDescription] = useState("");

// Form submission
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  
  const newTransaction: Transaction = {
    id: crypto.randomUUID(),
    type: "expense",
    amount: parseFloat(amount),
    category,
    description,
    date: new Date().toISOString()
  };
  
  // Save to storage
  storageService.saveTransaction(newTransaction);
  
  // Update state
  setTransactions([newTransaction, ...transactions]);
  
  // Reset form
  setAmount("");
  setCategory("Other");
  setDescription("");
};`}
      </pre>
    </section>
  </div>
);

const TroubleshootingContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">Troubleshooting Guide</h1>
      <p className="text-muted-foreground">Solutions for common issues and problems</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">Common Issues</h2>
      
      <div className="space-y-4">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Storage Access Issues</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold">Symptoms:</span> Data not being saved, errors when adding transactions or notes
          </p>
          <div className="bg-muted/30 p-3 rounded">
            <h4 className="text-sm font-medium mb-1">Solutions:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Check browser storage permissions</li>
              <li>Clear browser cache and refresh</li>
              <li>Check for localStorage availability using browser dev tools</li>
              <li>Try using incognito/private browsing mode to reset permissions</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">UI Display Issues</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold">Symptoms:</span> Elements overlapping, content not visible, keyboard issues
          </p>
          <div className="bg-muted/30 p-3 rounded">
            <h4 className="text-sm font-medium mb-1">Solutions:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Check device orientation and screen size</li>
              <li>Verify CSS styles for responsive design</li>
              <li>Inspect element placement with browser dev tools</li>
              <li>Test on different devices or screen sizes</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Transaction Data Not Showing</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold">Symptoms:</span> Transactions not appearing in list, summary not updating
          </p>
          <div className="bg-muted/30 p-3 rounded">
            <h4 className="text-sm font-medium mb-1">Solutions:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Check console for errors related to transaction retrieval</li>
              <li>Verify storage access is working</li>
              <li>Check if transaction data format matches expected type</li>
              <li>Clear localStorage and add new test transactions</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Keyboard Overlay Issues</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold">Symptoms:</span> Keyboard covers input fields or buttons on mobile devices
          </p>
          <div className="bg-muted/30 p-3 rounded">
            <h4 className="text-sm font-medium mb-1">Solutions:</h4>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Check viewport meta tag in index.html</li>
              <li>Verify scroll behavior in modals</li>
              <li>Add padding to forms to ensure visibility</li>
              <li>Use keyboard event listeners to adjust UI</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Debugging Techniques</h2>
      
      <div className="space-y-4">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Console Logging</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Add strategic console logs to track data flow:
          </p>
          <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
            {`console.log("Component rendered with props:", props);
console.log("Transaction added:", newTransaction);
console.log("Current state:", { transactions, balance });`}
          </pre>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Storage Inspection</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Inspect localStorage contents directly in browser devtools:
          </p>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Open browser developer tools (F12)</li>
            <li>Go to "Application" tab</li>
            <li>Select "Local Storage" in the sidebar</li>
            <li>Browse key-value pairs</li>
          </ol>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">React DevTools</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Use React DevTools to inspect component hierarchy and state:
          </p>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Install React DevTools browser extension</li>
            <li>Open browser developer tools (F12)</li>
            <li>Go to the "Components" or "Profiler" tab</li>
            <li>Explore component tree and state values</li>
          </ol>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Error Recovery</h2>
      
      <div className="space-y-4">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Data Corruption</h3>
          <p className="text-sm text-muted-foreground mb-2">
            If localStorage data becomes corrupted:
          </p>
          <div className="bg-muted/30 p-3 rounded">
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Open browser developer tools</li>
              <li>Go to Application > Local Storage</li>
              <li>Clear data for the application domain</li>
              <li>Refresh the application to start with clean state</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">UI Freezes</h3>
          <p className="text-sm text-muted-foreground mb-2">
            If the user interface becomes unresponsive:
          </p>
          <div className="bg-muted/30 p-3 rounded">
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Try refreshing the page</li>
              <li>Check for infinite loops or heavy computations</li>
              <li>Look for memory leaks in useEffect cleanup</li>
              <li>Consider adding error boundaries around problematic components</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const SecurityContent: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold mb-2">Security Considerations</h1>
      <p className="text-muted-foreground">Information about security measures and best practices</p>
    </div>

    <section>
      <h2 className="text-xl font-semibold mb-3">Data Storage</h2>
      <p className="text-muted-foreground mb-3">
        Finance Footprint uses localStorage for data persistence, which has some security implications:
      </p>
      
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Data Scope</h3>
          <p className="text-sm text-muted-foreground">
            Data is stored only on the user's device. Unlike server-based applications, data is not
            transmitted or stored in external databases.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Browser Access</h3>
          <p className="text-sm text-muted-foreground">
            Data is accessible to any JavaScript running on the same domain. This means the
            application itself has full access to stored data, but so would any malicious
            scripts that might be injected.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Data Clearing</h3>
          <p className="text-sm text-muted-foreground">
            Clearing browser cache/cookies will delete all stored data. Users should be aware
            that browser maintenance routines might remove their financial data.
          </p>
        </div>
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
        <h3 className="font-medium text-yellow-800 dark:text-yellow-400 mb-2">Recommendations for Users</h3>
        <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 text-sm space-y-1">
          <li>Avoid storing extremely sensitive financial information</li>
          <li>Use device passcode/password protection</li>
          <li>Clear browser data when using shared devices</li>
          <li>Consider using the PWA install option for better isolation</li>
          <li>Export important data regularly as a backup</li>
        </ul>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Implementation Safeguards</h2>
      <p className="text-muted-foreground mb-3">
        The application implements several security measures to protect user data:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Input Validation</h3>
          <p className="text-sm text-muted-foreground">
            All user inputs are validated to prevent injection attacks and ensure data integrity.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Storage Access Checks</h3>
          <p className="text-sm text-muted-foreground">
            The application verifies localStorage availability before attempting data operations.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">Error Handling</h3>
          <p className="text-sm text-muted-foreground">
            Robust error handling prevents data corruption and provides feedback on issues.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">No External Transmission</h3>
          <p className="text-sm text-muted-foreground">
            Data is not transmitted to external servers, reducing exposure to network vulnerabilities.
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-semibold mb-3">Privacy Considerations</h2>
      <p className="text-muted-foreground mb-3">
        The application is designed with privacy in mind:
      </p>
      
      <div className="space-y-3">
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">No Data Collection</h3>
          <p className="text-sm text-muted-foreground">
            The application does not collect, track, or transmit user data to external services.
            All data remains on the user's device.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">No Analytics</h3>
          <p className="text-sm text-muted-foreground">
            No third-party analytics or tracking scripts are included in the application.
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <h3 className="font-medium text-base mb-2">No External Dependencies</h3>
          <p className="text-sm text-muted-foreground">
            The application minimizes external dependencies to reduce potential security vulnerabilities.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default SettingsDocumentation;
