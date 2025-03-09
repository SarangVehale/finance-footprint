
import React from "react";

/**
 * API Reference content section for documentation
 * Provides information about internal APIs and services
 */
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

export default ApiReferenceContent;
