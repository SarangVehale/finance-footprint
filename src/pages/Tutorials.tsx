
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileLayout from "../components/MobileLayout";
import { 
  ChevronLeft, 
  BookOpen, 
  Clock, 
  User,
  Tag
} from "lucide-react";
import { gettingStarted, advancedTutorials } from "../config/tutorials";
import { Tutorial } from "../types/tutorial";

const TutorialPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Find the tutorial from all available tutorials
  const allTutorials = [...gettingStarted, ...advancedTutorials];
  const tutorial = allTutorials.find(t => t.id === id);

  // Handle loading state
  React.useEffect(() => {
    // Simulate loading the tutorial content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [id]);

  // If tutorial not found
  if (!tutorial && !isLoading) {
    return (
      <MobileLayout
        title="Tutorial Not Found"
        leftIcon={<ChevronLeft onClick={() => navigate(-1)} />}
      >
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold mb-2">Tutorial Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The tutorial you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/settings")}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Back to Settings
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout
      title={isLoading ? "Loading..." : tutorial?.title || "Tutorial"}
      leftIcon={<ChevronLeft onClick={() => navigate(-1)} />}
    >
      {isLoading ? (
        <div className="p-4 space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
          <div className="h-4 bg-muted animate-pulse rounded"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
          <div className="h-32 bg-muted animate-pulse rounded mt-6"></div>
          <div className="space-y-2 mt-6">
            <div className="h-4 bg-muted animate-pulse rounded"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-4/5"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-5/6"></div>
          </div>
        </div>
      ) : tutorial ? (
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-3">{tutorial.title}</h1>
            <p className="text-muted-foreground mb-4">{tutorial.description}</p>
            
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" />
                <span>{tutorial.time}</span>
              </div>
              
              <div className="px-2 py-0.5 bg-primary/10 text-primary text-sm rounded-full">
                {tutorial.difficulty}
              </div>
              
              {tutorial.category && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Tag size={14} className="mr-1" />
                  <span>{tutorial.category}</span>
                </div>
              )}
            </div>
            
            {tutorial.author && (
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <User size={14} className="mr-1" />
                <span>By {tutorial.author}</span>
              </div>
            )}
          </div>
          
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <TutorialContent tutorialId={tutorial.id} />
          </div>
        </div>
      ) : null}
    </MobileLayout>
  );
};

// This component will render different content based on the tutorial ID
const TutorialContent: React.FC<{ tutorialId: string }> = ({ tutorialId }) => {
  switch (tutorialId) {
    case "account-setup":
      return <AccountSetupTutorial />;
    case "first-transaction":
      return <FirstTransactionTutorial />;
    case "dashboard-overview":
      return <DashboardOverviewTutorial />;
    case "financial-goals":
      return <FinancialGoalsTutorial />;
    case "security":
      return <SecurityTutorial />;
    case "custom-categories":
      return <CustomCategoriesTutorial />;
    case "spending-analysis":
      return <SpendingAnalysisTutorial />;
    case "budgeting-goals":
      return <BudgetingGoalsTutorial />;
    case "recurring-transactions":
      return <RecurringTransactionsTutorial />;
    case "tax-planning":
      return <TaxPlanningTutorial />;
    case "financial-reports":
      return <FinancialReportsTutorial />;
    default:
      return <DefaultTutorialContent />;
  }
};

// Individual tutorial content components
const AccountSetupTutorial: React.FC = () => (
  <div>
    <h2>Getting Started with Your Account</h2>
    <p>Welcome to Finance Footprint! Setting up your account is the first step toward financial clarity. This guide will walk you through the essential steps to configure your account for success.</p>
    
    <h3>Step 1: Complete Your Profile</h3>
    <p>After signing up, the first thing you'll want to do is complete your profile information. This helps personalize your experience and ensures you get the most relevant insights.</p>
    
    <h3>Step 2: Set Your Currency</h3>
    <p>Finance Footprint supports multiple currencies. Navigate to Settings → Currency to select your preferred currency. This will be used throughout the app for all financial calculations.</p>
    
    <h3>Step 3: Connect Your Accounts (Optional)</h3>
    <p>For a seamless experience, you can connect your bank accounts to automatically import transactions. Rest assured, we use bank-level encryption to keep your information secure.</p>
    
    <h3>Step 4: Set Up Categories</h3>
    <p>Finance Footprint comes with default expense and income categories, but you can customize these to better match your financial habits. Go to Settings → Categories to add, edit, or remove categories.</p>
    
    <h3>Step 5: Enable Notifications</h3>
    <p>Stay on top of your finances by enabling key notifications. You can receive alerts for large transactions, budget limits, bill reminders, and more.</p>
  </div>
);

const FirstTransactionTutorial: React.FC = () => (
  <div>
    <h2>Adding Your First Transaction</h2>
    <p>Recording transactions is the foundation of financial tracking. Let's walk through the process of adding your first transaction in Finance Footprint.</p>
    
    <h3>Adding an Expense</h3>
    <p>1. From the home screen, tap the "+" button at the bottom</p>
    <p>2. Select "Add Expense"</p>
    <p>3. Enter the amount of your expense</p>
    <p>4. Choose the appropriate category</p>
    <p>5. Add a description (optional but recommended)</p>
    <p>6. Select the date of the transaction</p>
    <p>7. Tap "Save" to record your expense</p>
    
    <h3>Adding Income</h3>
    <p>The process for adding income is similar:</p>
    <p>1. From the home screen, tap the "+" button</p>
    <p>2. Select "Add Income"</p>
    <p>3. Follow the same steps as adding an expense</p>
    
    <h3>Pro Tips</h3>
    <p>• Use the description field to add context to your transactions</p>
    <p>• Take photos of receipts by tapping the camera icon</p>
    <p>• For recurring transactions, use the "Repeat" option to set a schedule</p>
    <p>• Split transactions across multiple categories when needed</p>
  </div>
);

// Default tutorial content as a fallback
const DefaultTutorialContent: React.FC = () => (
  <div>
    <p>This tutorial content is being updated. Please check back soon for the complete guide.</p>
    
    <h3>In the meantime, you might be interested in:</h3>
    <ul>
      <li>Setting Up Your Account</li>
      <li>Adding Your First Transaction</li>
      <li>Understanding the Dashboard</li>
    </ul>
    
    <p>If you have specific questions, don't hesitate to reach out to our support team.</p>
  </div>
);

// Add the rest of the tutorial content components
const DashboardOverviewTutorial: React.FC = () => (
  <div>
    <h2>Understanding the Dashboard</h2>
    <p>The dashboard is your financial command center in Finance Footprint. Here's a comprehensive look at all the features available to you.</p>
    
    <h3>Balance Overview</h3>
    <p>At the top of your dashboard, you'll see your current balance. This reflects the sum of all your accounts and gives you an immediate snapshot of your financial standing.</p>
    
    <h3>Income vs. Expenses</h3>
    <p>The income vs. expenses chart shows your money flow for the selected time period. This visual representation helps you quickly understand if you're spending more than you're earning.</p>
    
    <h3>Recent Transactions</h3>
    <p>Below the charts, you'll find your most recent transactions. This allows you to quickly review your latest financial activities without navigating to the full transaction history.</p>
    
    <h3>Budget Progress</h3>
    <p>Your active budgets are displayed with progress bars, showing how much of each budget you've used. This helps you stay on track with your spending goals.</p>
    
    <h3>Quick Actions</h3>
    <p>The quick action buttons at the bottom allow you to add transactions, view reports, and access other frequently used features with a single tap.</p>
  </div>
);

const FinancialGoalsTutorial: React.FC = () => (
  <div>
    <h2>Setting Your Financial Goals</h2>
    <p>Goals give direction to your financial journey. Learn how to set and track meaningful financial objectives in Finance Footprint.</p>
    
    <h3>Types of Financial Goals</h3>
    <p>Finance Footprint supports several types of financial goals:</p>
    <ul>
      <li>Savings goals (e.g., emergency fund, vacation)</li>
      <li>Debt reduction goals (e.g., credit card, student loans)</li>
      <li>Spending limits (e.g., dining out, entertainment)</li>
      <li>Income targets (e.g., freelance income, side hustle)</li>
    </ul>
    
    <h3>Creating a New Goal</h3>
    <p>1. Navigate to the Goals section</p>
    <p>2. Tap "Add New Goal"</p>
    <p>3. Select the goal type</p>
    <p>4. Enter a name, target amount, and deadline</p>
    <p>5. Optionally, add a motivational note</p>
    <p>6. Save your goal</p>
    
    <h3>Tracking Progress</h3>
    <p>Once your goal is set up, you can track your progress in several ways:</p>
    <p>• View the progress bar in the Goals section</p>
    <p>• Receive notifications when milestones are reached</p>
    <p>• See a projection of when you'll reach your goal based on current behavior</p>
    
    <h3>Tips for Successful Goal Setting</h3>
    <p>• Make goals specific and measurable</p>
    <p>• Set realistic timeframes</p>
    <p>• Break large goals into smaller milestones</p>
    <p>• Regularly review and adjust your goals as needed</p>
  </div>
);

const SecurityTutorial: React.FC = () => (
  <div>
    <h2>Managing Account Security</h2>
    <p>Your financial data deserves the highest level of protection. Learn how to secure your Finance Footprint account with these best practices.</p>
    
    <h3>Strong Password Practices</h3>
    <p>Create a unique, complex password that includes:</p>
    <ul>
      <li>At least 12 characters</li>
      <li>A mix of uppercase and lowercase letters</li>
      <li>Numbers and special characters</li>
      <li>No personal information like birthdays or names</li>
    </ul>
    
    <h3>Enabling Two-Factor Authentication</h3>
    <p>Two-factor authentication adds an extra layer of security:</p>
    <p>1. Go to Settings → Security</p>
    <p>2. Toggle on Two-Factor Authentication</p>
    <p>3. Follow the prompts to link your phone or email</p>
    
    <h3>Regular Security Audits</h3>
    <p>Periodically review:</p>
    <p>• Connected devices and sessions</p>
    <p>• Third-party app connections</p>
    <p>• Recent account activities</p>
    
    <h3>Data Encryption and Privacy</h3>
    <p>Finance Footprint uses bank-level encryption to protect your data. We never share your financial information with third parties without your explicit permission.</p>
    
    <h3>What to Do If You Suspect a Security Breach</h3>
    <p>If you notice any suspicious activity:</p>
    <p>1. Change your password immediately</p>
    <p>2. Contact our support team</p>
    <p>3. Review recent transactions for unauthorized activity</p>
  </div>
);

// Additional tutorials for advanced features
const CustomCategoriesTutorial: React.FC = () => (
  <div>
    <h2>Creating Custom Categories</h2>
    <p>Custom categories help you organize your finances in a way that makes sense for your unique situation. Here's how to set them up.</p>
    
    <h3>Why Custom Categories Matter</h3>
    <p>Default categories work for many users, but custom categories allow you to:</p>
    <ul>
      <li>Track specific projects or goals</li>
      <li>Separate business and personal expenses</li>
      <li>Create more detailed budget allocations</li>
      <li>Better analyze your spending patterns</li>
    </ul>
    
    <h3>Creating a New Category</h3>
    <p>1. Go to Settings → Categories</p>
    <p>2. Tap "Add New Category"</p>
    <p>3. Choose between Income or Expense</p>
    <p>4. Enter a name for your category</p>
    <p>5. Select an icon and color (optional)</p>
    <p>6. Save your new category</p>
    
    <h3>Setting Up Subcategories</h3>
    <p>For even more detailed tracking:</p>
    <p>1. Select an existing category</p>
    <p>2. Tap "Add Subcategory"</p>
    <p>3. Enter the subcategory name</p>
    <p>4. Save the subcategory</p>
    
    <h3>Organizing Categories</h3>
    <p>You can drag and drop categories to reorder them, or use the search feature to quickly find specific categories when recording transactions.</p>
  </div>
);

const SpendingAnalysisTutorial: React.FC = () => (
  <div>
    <h2>Analyzing Your Spending Patterns</h2>
    <p>Understanding where your money goes is the first step toward financial improvement. Finance Footprint offers powerful tools to analyze your spending habits.</p>
    
    <h3>Accessing Your Analytics</h3>
    <p>Navigate to the Analytics tab to view comprehensive insights about your financial behavior.</p>
    
    <h3>Category Breakdown</h3>
    <p>The pie chart shows the proportion of your spending across different categories. This visual representation helps identify areas where you might be overspending.</p>
    
    <h3>Time Trends</h3>
    <p>The line graph displays your spending over time, allowing you to identify patterns, seasonal variations, or unusual spending spikes.</p>
    
    <h3>Merchant Analysis</h3>
    <p>View your top merchants to see where you spend most frequently. This can reveal subscription services you might have forgotten about or stores where you tend to overspend.</p>
    
    <h3>Custom Reports</h3>
    <p>Create custom reports by:</p>
    <p>1. Selecting specific date ranges</p>
    <p>2. Filtering by categories or tags</p>
    <p>3. Comparing different time periods</p>
    <p>4. Exporting data for further analysis</p>
    
    <h3>Using Insights to Improve</h3>
    <p>Based on your spending analysis, Finance Footprint will suggest actionable tips to help you save money and reach your financial goals faster.</p>
  </div>
);

// Implementing the remaining tutorial content components
const BudgetingGoalsTutorial: React.FC = () => (
  <div>
    <h2>Setting Budgets and Goals</h2>
    <p>Effective budgeting is the cornerstone of financial success. Learn how to create meaningful budgets and track your progress with Finance Footprint.</p>
    
    {/* Content for budgeting tutorial */}
  </div>
);

const RecurringTransactionsTutorial: React.FC = () => (
  <div>
    <h2>Automating Regular Transactions</h2>
    <p>Save time and ensure consistency by setting up recurring transactions for your regular income and expenses.</p>
    
    {/* Content for recurring transactions tutorial */}
  </div>
);

const TaxPlanningTutorial: React.FC = () => (
  <div>
    <h2>Tax Planning with Finance Footprint</h2>
    <p>Prepare for tax season all year round with proper categorization and reporting tools in Finance Footprint.</p>
    
    {/* Content for tax planning tutorial */}
  </div>
);

const FinancialReportsTutorial: React.FC = () => (
  <div>
    <h2>Creating Financial Reports</h2>
    <p>Generate comprehensive reports to gain deeper insights into your financial health and share information with advisors.</p>
    
    {/* Content for financial reports tutorial */}
  </div>
);

export default TutorialPage;
