
import React from "react";

/**
 * Troubleshooting content section for documentation
 * Provides solutions for common issues and problems
 */
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
              <li>Go to Application {' > '} Local Storage</li>
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

export default TroubleshootingContent;
