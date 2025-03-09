
import React from "react";

/**
 * Security content section for documentation
 * Provides information about security measures and best practices
 */
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

export default SecurityContent;
