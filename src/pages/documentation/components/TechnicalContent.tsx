
import React from "react";

/**
 * Technical Details content section for documentation
 * Provides implementation details and code architecture
 */
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

export default TechnicalContent;
