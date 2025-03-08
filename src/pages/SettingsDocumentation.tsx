
import React from "react";
import MobileLayout from "@/components/MobileLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Book, Code, FileText, HelpCircle, Lightbulb, Settings, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const SettingsDocumentation: React.FC = () => {
  return (
    <MobileLayout
      title="Documentation"
      showBackButton={true}
      onBackClick={() => window.history.back()}
    >
      <div className="p-4 sm:p-6 bg-background">
        <div className="mb-4 pb-4 border-b">
          <h1 className="text-xl font-bold mb-2">Finance Footprint Documentation</h1>
          <p className="text-muted-foreground text-sm">
            Comprehensive guide to the application's features, architecture, and usage
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <Book className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">Project Overview</h2>
              </div>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="font-medium text-base mb-2">Purpose</h3>
                    <p className="text-sm text-muted-foreground">
                      Finance Footprint helps users track their personal finances, providing visual analytics, 
                      multiple currency support, and transaction management capabilities.
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Key Features</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Transaction tracking (income and expenses)</li>
                      <li>Visual analytics with charts</li>
                      <li>Dark/light mode support</li>
                      <li>Multiple currency support</li>
                      <li>Notes management with text and checklist support</li>
                      <li>Mobile-responsive design</li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Technologies Used</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-primary/5 p-2 rounded">
                        <span className="font-medium">Frontend:</span>
                        <p className="text-muted-foreground">React, TypeScript, Tailwind CSS</p>
                      </div>
                      <div className="bg-primary/5 p-2 rounded">
                        <span className="font-medium">State Management:</span>
                        <p className="text-muted-foreground">React state, localStorage</p>
                      </div>
                      <div className="bg-primary/5 p-2 rounded">
                        <span className="font-medium">Visualization:</span>
                        <p className="text-muted-foreground">Recharts</p>
                      </div>
                      <div className="bg-primary/5 p-2 rounded">
                        <span className="font-medium">Mobile Support:</span>
                        <p className="text-muted-foreground">Capacitor (iOS/Android)</p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </div>

            <div className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">User Workflows</h2>
              </div>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="font-medium text-base mb-2">Transaction Management</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                      <li>
                        <span className="font-medium">Adding a Transaction:</span>
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>Click "Add Income" or "Add Expense" on the home screen</li>
                          <li>Enter transaction details (amount, category, description)</li>
                          <li>Click "Add" to save the transaction</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-medium">Editing a Transaction:</span>
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>Click the edit icon next to a transaction</li>
                          <li>Modify details in the modal</li>
                          <li>Click "Update" to save changes</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-medium">Deleting a Transaction:</span>
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>Click the delete icon next to a transaction</li>
                          <li>Confirm deletion in the prompt</li>
                        </ul>
                      </li>
                    </ol>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Note Management</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                      <li>
                        <span className="font-medium">Creating a Note:</span>
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>Navigate to the Notes page</li>
                          <li>Click "Add Note" button</li>
                          <li>Select note type (text or checklist)</li>
                          <li>Enter note title and content</li>
                        </ul>
                      </li>
                      <li>
                        <span className="font-medium">Using Checklist Notes:</span>
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>Create a new checklist note</li>
                          <li>Add items using the "Add item" button</li>
                          <li>Toggle checkboxes to mark items complete</li>
                          <li>Edit item text by clicking on it</li>
                        </ul>
                      </li>
                    </ol>
                  </section>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">Settings Overview</h2>
              </div>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="font-medium text-base mb-2">Architecture</h3>
                    <p className="text-sm text-muted-foreground">
                      The Settings module follows a modal-based architecture:
                    </p>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                      <li><span className="font-medium">Main Settings Page:</span> Entry point displaying the settings menu</li>
                      <li><span className="font-medium">Settings Menu:</span> Menu with all available setting options</li>
                      <li><span className="font-medium">Modal Container:</span> Handles the display of different setting modals</li>
                      <li><span className="font-medium">Individual Setting Modals:</span> Specific components for each setting category</li>
                    </ol>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">File Structure</h3>
                    <div className="text-sm bg-muted p-3 rounded font-mono">
                      <p>src/</p>
                      <p>└── components/</p>
                      <p>    └── settings/</p>
                      <p>        ├── AboutModal.tsx</p>
                      <p>        ├── AppearanceModal.tsx</p>
                      <p>        ├── CategoriesModal.tsx</p>
                      <p>        ├── CurrencyModal.tsx</p>
                      <p>        ├── ExportedFilesModal.tsx</p>
                      <p>        ├── FAQModal.tsx</p>
                      <p>        ├── ForumModal.tsx</p>
                      <p>        ├── GuideModal.tsx</p>
                      <p>        ├── HelpSupportModal.tsx</p>
                      <p>        ├── ModalContainer.tsx</p>
                      <p>        ├── SettingsMenu.tsx</p>
                      <p>        └── TutorialsModal.tsx</p>
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Key Components</h3>
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Settings Page (Settings.tsx)</h4>
                        <p className="text-xs text-muted-foreground">
                          The main settings page serves as the container for all settings functionality.
                          It initializes and manages state for settings options (theme, currency, categories).
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Settings Menu (SettingsMenu.tsx)</h4>
                        <p className="text-xs text-muted-foreground">
                          Displays all available settings options organized in categories.
                          Each menu item opens a specific modal when clicked.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Modal Container (ModalContainer.tsx)</h4>
                        <p className="text-xs text-muted-foreground">
                          Provides a consistent container for all setting modals.
                          Handles modal display, positioning, and animations.
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </div>

            <div className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">Settings Usage Guide</h2>
              </div>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="font-medium text-base mb-2">Changing Theme</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                      <li>Navigate to Settings</li>
                      <li>Tap "Appearance"</li>
                      <li>Select preferred theme (Light, Dark, or System)</li>
                      <li>Theme is applied immediately</li>
                      <li>Toast notification confirms the change</li>
                    </ol>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Managing Categories</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                      <li>Navigate to Settings</li>
                      <li>Tap "Categories"</li>
                      <li>
                        To add a category:
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>Enter new category name</li>
                          <li>Tap the plus button</li>
                        </ul>
                      </li>
                      <li>
                        To delete a category:
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>Tap the trash icon next to the category</li>
                          <li>Category is removed immediately (except "Other")</li>
                        </ul>
                      </li>
                    </ol>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Changing Currency</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                      <li>Navigate to Settings</li>
                      <li>Tap "Currency"</li>
                      <li>Select preferred currency from the list</li>
                      <li>Currency is applied throughout the application</li>
                      <li>Toast notification confirms the change</li>
                    </ol>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Accessing Documentation</h3>
                    <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                      <li>Navigate to Settings</li>
                      <li>In the Documentation section, tap on desired resource:
                        <ul className="list-disc list-inside ml-5 mt-1">
                          <li>User Guide</li>
                          <li>FAQs</li>
                          <li>Tutorials & Guides</li>
                        </ul>
                      </li>
                      <li>View the documentation content in the modal</li>
                    </ol>
                  </section>
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <div className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <Code className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">Technical Implementation</h2>
              </div>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="font-medium text-base mb-2">Data Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Finance Footprint uses localStorage for data persistence:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-2">
                      <li>
                        <span className="font-medium">Theme Preference:</span>
                        <p className="ml-5 text-xs">Stored and retrieved using next-themes. Automatically applies system preference if set to "system".</p>
                      </li>
                      <li>
                        <span className="font-medium">Currency Selection:</span>
                        <p className="ml-5 text-xs">Stored and retrieved using storageService. Applied consistently across the application.</p>
                      </li>
                      <li>
                        <span className="font-medium">Transaction Categories:</span>
                        <p className="ml-5 text-xs">Managed in state and persisted in localStorage. Available throughout the application for transaction categorization.</p>
                      </li>
                    </ul>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Implementation Details</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium">Modal State Management</h4>
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          {`const [activeModal, setActiveModal] = useState<ModalType>(() => {
  // Check if we're coming back from a tutorial page with state
  if (location.state?.openModal) {
    return location.state.openModal;
  }
  return null;
});`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Theme Handling</h4>
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          {`const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
  setTheme(newTheme);
  toast({
    title: "Theme Updated",
    description: \`Theme set to \${newTheme} mode\`,
    duration: 2000,
  });
};`}
                        </pre>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Currency Management</h4>
                        <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                          {`const handleCurrencyChange = (newCurrency: string) => {
  setCurrency(newCurrency);
  storageService.setCurrency(newCurrency);
  toast({
    title: "Currency Updated",
    description: \`Currency set to \${newCurrency}\`,
    duration: 2000,
  });
  setActiveModal(null); // Auto-close the modal
};`}
                        </pre>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </div>

            <div className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">Security & Performance</h2>
              </div>
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <section>
                    <h3 className="font-medium text-base mb-2">Security Considerations</h3>
                    <p className="text-sm text-muted-foreground">
                      Finance Footprint uses localStorage for data persistence, which has some security implications:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                      <li><span className="font-medium">Data Scope:</span> Data is stored only on the user's device</li>
                      <li><span className="font-medium">Browser Access:</span> Data is accessible to any JavaScript running on the same domain</li>
                      <li><span className="font-medium">Clearing Data:</span> Clearing browser cache/cookies will delete all stored data</li>
                    </ul>
                    
                    <div className="mt-3 bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded text-sm border border-yellow-200 dark:border-yellow-800">
                      <p className="font-medium text-yellow-800 dark:text-yellow-400">Recommendations:</p>
                      <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 text-xs mt-1">
                        <li>Avoid storing extremely sensitive financial information</li>
                        <li>Use device passcode/password protection</li>
                        <li>Clear browser data when using shared devices</li>
                      </ul>
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="font-medium text-base mb-2">Performance Optimization</h3>
                    <div className="space-y-2">
                      <div>
                        <h4 className="text-sm font-medium">Current Optimizations</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          <li>Using React.memo for components that don't need frequent re-renders</li>
                          <li>Using useMemo for expensive calculations</li>
                          <li>Batched updates to reduce renders</li>
                          <li>Loading content when needed, not upfront</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium">Recommended Optimizations</h4>
                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                          <li>Break large components into smaller ones</li>
                          <li>Compress images and use appropriate formats</li>
                          <li>Implement code splitting for faster initial loads</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              </ScrollArea>
            </div>

            <div className="bg-card rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-5 w-5 mr-2 text-primary" />
                <h2 className="text-lg font-medium">Future Roadmap</h2>
              </div>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Planned features and technical improvements:</p>
                <ul className="list-disc list-inside">
                  <li>Cloud sync for cross-device data access</li>
                  <li>Budget planning with targets and alerts</li>
                  <li>Enhanced analytics with predictive features</li>
                  <li>Recurring transactions support</li>
                </ul>
                <div className="mt-2">
                  <Link to="/settings" className="text-primary flex items-center text-sm hover:underline">
                    Back to Settings
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default SettingsDocumentation;
