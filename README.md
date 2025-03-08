
# Finance Footprint

A modern, intuitive personal finance tracking application built with React, TypeScript, and Tailwind CSS. The app supports both web and mobile platforms.

## Features

- 💰 Track income and expenses
- 📊 Visual analytics and insights
- 🌙 Dark mode support
- 💱 Multiple currency support
- 📱 Mobile-responsive design
- 🔄 Real-time updates
- 📝 Transaction management
- 📈 Spending analysis
- 📱 Native mobile support (iOS & Android)

## Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn
- For iOS development: macOS with Xcode installed
- For Android development: Android Studio with SDK tools

### Web Development

1. Clone the repository
```bash
git clone https://github.com/yourusername/finance-footprint.git
cd finance-footprint
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

### Mobile Development

#### Setup

1. Install Capacitor dependencies:
```bash
npm install @capacitor/core @capacitor/ios @capacitor/android
npm install -D @capacitor/cli
```

2. Initialize Capacitor (already done in this project)
```bash
npx cap init
```

#### iOS Development (macOS only)

1. Build the project:
```bash
npm run build
```

2. Add iOS platform:
```bash
npx cap add ios
```

3. Update iOS project:
```bash
npx cap sync ios
```

4. Open in Xcode:
```bash
npx cap open ios
```

5. In Xcode:
   - Select your Team for signing
   - Update bundle identifier if needed
   - Build and run on simulator or device

#### Android Development

1. Build the project:
```bash
npm run build
```

2. Add Android platform:
```bash
npx cap add android
```

3. Update Android project:
```bash
npx cap sync android
```

4. Open in Android Studio:
```bash
npx cap open android
```

5. Creating an APK:
   - In Android Studio, go to Build > Generate Signed Bundle / APK
   - Choose APK
   - Create or select a keystore file
   - Fill in the keystore details
   - Choose release build variant
   - Select destination folder
   - Wait for the build to complete

#### Progressive Web App (PWA)

The app is configured as a PWA and can be installed on mobile devices through the browser:

1. Build the project:
```bash
npm run build
```

2. Test PWA locally:
```bash
npm run preview
```

## Documentation

### System Documentation

Comprehensive documentation is available for understanding the architecture and implementation details of Finance Footprint:

- **[System Architecture](src/docs/Documentation.md)**: Overview of the entire system
- **[Settings System](src/docs/SettingsSystem.md)**: Documentation for the settings module
- **[Modal System](src/docs/ModalSystem.md)**: Details about the modal implementation
- **[Mobile Layout](src/docs/MobileLayout.md)**: Information about the mobile layout components
- **[Tutorial System](src/docs/TutorialSystem.md)**: Documentation for the tutorial features
- **[Data Flow](src/docs/DataFlow.md)**: Explanation of application data flow
- **[File Structure](src/docs/FileStructure.md)**: Project file organization

### In-App Documentation

The application includes built-in documentation accessible through the Settings menu:

1. Navigate to the Settings page
2. Find the Documentation section
3. Choose from:
   - User Guide
   - FAQs
   - Tutorials & Guides
   - Full Documentation

### Troubleshooting

Common issues and their solutions:

#### Storage Access Issues
- Check browser storage permissions
- Clear browser cache and refresh
- Verify localStorage availability

#### UI Display Issues
- Check device orientation and screen size
- Verify CSS styles for responsive design
- Test on different devices or screen sizes

#### Keyboard Overlay Issues
- The application implements special handling for virtual keyboards
- If issues persist, check the `visualViewport` listeners in ModalContainer.tsx

## Deployment

#### Web Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` folder can be deployed to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Firebase Hosting

#### Mobile App Store Deployment

##### iOS App Store

1. In Xcode:
   - Select "Any iOS Device" as the build target
   - Select Product > Archive
   - Follow the upload process in the Organizer window
   - Submit for review in App Store Connect

##### Google Play Store

1. In Android Studio:
   - Generate a signed release bundle/APK
   - Create a release in the Google Play Console
   - Upload the AAB/APK file
   - Fill in store listing details
   - Submit for review

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add appropriate documentation for new features
- Ensure all tests pass before submitting PRs

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # Business logic and services
├── types/         # TypeScript type definitions
├── hooks/         # Custom React hooks
├── docs/          # Documentation files
└── utils/         # Utility functions
```

## Built With

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)
- [Recharts](https://recharts.org/)
- [Capacitor](https://capacitorjs.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
