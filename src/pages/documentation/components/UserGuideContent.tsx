
import React from "react";

/**
 * User Guide content section for documentation
 * Provides instructions and guidance for using the application
 */
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

export default UserGuideContent;
