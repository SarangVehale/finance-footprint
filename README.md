
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

### Deployment

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

## Troubleshooting

### Android Build Issues

1. Gradle sync fails:
   - Update Android Studio
   - Clean and rebuild project
   - Delete `android/build` folder and sync again

2. APK signing issues:
   - Verify keystore details
   - Regenerate keystore if needed

### iOS Build Issues

1. Signing issues:
   - Verify Apple Developer account
   - Update provisioning profiles
   - Check bundle identifier

2. Simulator issues:
   - Update Xcode
   - Reset simulator
   - Clean build folder

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
