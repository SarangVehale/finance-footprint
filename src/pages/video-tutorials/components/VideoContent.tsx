
import React from "react";

/**
 * VideoContent - Renders specific video content based on id
 * 
 * @param videoId - The id of the video to render
 */
const VideoContent: React.FC<{ videoId: string }> = ({ videoId }) => {
  switch (videoId) {
    case "app-walkthrough":
      return <AppWalkthroughContent />;
    case "reports-exports":
      return <ReportsExportsContent />;
    case "mobile-tips":
      return <MobileTipsContent />;
    case "budget-analysis":
      return <BudgetAnalysisContent />;
    case "data-viz":
      return <DataVizContent />;
    case "importing-data":
      return <ImportingDataContent />;
    default:
      return <DefaultVideoContent />;
  }
};

// Individual video content components
const AppWalkthroughContent: React.FC = () => (
  <div>
    <p>
      This comprehensive walkthrough covers all essential features of Finance Footprint.
      Follow along as we explore the entire application interface and functionality.
    </p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction</li>
      <li>01:15 - Dashboard Overview</li>
      <li>03:42 - Adding Transactions</li>
      <li>05:38 - Categories and Budgeting</li>
      <li>08:20 - Reports and Analytics</li>
      <li>11:05 - Settings and Customization</li>
      <li>13:30 - Mobile Features</li>
    </ul>
  </div>
);

// Default video content as a fallback
const DefaultVideoContent: React.FC = () => (
  <div>
    <p>This video will guide you through important features and functionality in Finance Footprint.</p>
    <p>Follow along with the demonstration to learn useful tips and techniques for managing your finances effectively.</p>
  </div>
);

// Additional video content components
const ReportsExportsContent: React.FC = () => (
  <div>
    <p>Learn how to generate comprehensive financial reports and export your data for use in other applications.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Reports</li>
      <li>01:30 - Creating Custom Reports</li>
      <li>03:45 - Exporting to Excel/CSV</li>
      <li>05:20 - Sharing Reports Securely</li>
      <li>06:50 - Tips for Tax Time Reports</li>
    </ul>
  </div>
);

const MobileTipsContent: React.FC = () => (
  <div>
    <p>Discover how to make the most of Finance Footprint on your mobile device with these tips and tricks.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Mobile Interface Overview</li>
      <li>01:10 - Quick Transaction Entry</li>
      <li>02:35 - Using Receipt Scanning</li>
      <li>04:15 - Offline Mode Features</li>
      <li>05:30 - Widget Configuration</li>
    </ul>
  </div>
);

const BudgetAnalysisContent: React.FC = () => (
  <div>
    <p>Deep dive into advanced budget analysis techniques to gain better insights into your spending patterns.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Budget Analysis</li>
      <li>01:45 - Trend Identification</li>
      <li>04:10 - Comparative Analysis</li>
      <li>06:30 - Using Filters and Tags</li>
      <li>09:15 - Setting Up Alerts and Notifications</li>
      <li>11:00 - Insights and Recommendations</li>
    </ul>
  </div>
);

const DataVizContent: React.FC = () => (
  <div>
    <p>Learn how to use data visualization techniques to better understand your financial data.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Data Visualization</li>
      <li>01:20 - Understanding Chart Types</li>
      <li>03:40 - Customizing Your View</li>
      <li>05:15 - Digging Deeper with Filters</li>
      <li>07:30 - Saving and Sharing Visualizations</li>
      <li>09:00 - Data Insights and Interpretations</li>
    </ul>
  </div>
);

const ImportingDataContent: React.FC = () => (
  <div>
    <p>Follow this guide to import financial data from bank statements or other financial applications.</p>
    <h4>Video Chapters:</h4>
    <ul>
      <li>00:00 - Introduction to Data Importing</li>
      <li>01:15 - Supported File Formats</li>
      <li>02:30 - Bank Statement Import Process</li>
      <li>04:40 - Handling Duplicate Entries</li>
      <li>05:55 - Categorizing Imported Transactions</li>
      <li>06:45 - Troubleshooting Common Issues</li>
    </ul>
  </div>
);

export default VideoContent;
