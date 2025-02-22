
# Finance Footprint - Personal Finance Tracker

A beautiful, intuitive mobile-first web application for tracking personal finances. Built with React, TypeScript, and modern web technologies.

## Features

- 📱 Mobile-first design with native-like experience
- 💰 Track income and expenses
- 📊 Visual analytics and insights
- 🎯 Budget management and tracking
- 📱 Cross-platform compatibility (iOS & Android)
- 🔒 Local data storage for privacy
- ⚡ Lightning-fast performance
- 🎨 Beautiful, intuitive interface

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Vite for blazing fast development
- Capacitor for native mobile functionality
- Recharts for beautiful data visualization
- Local Storage for data persistence
- React Router for navigation
- Lucide Icons for beautiful iconography

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- iOS/Android development environment (for mobile deployment)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd finance-footprint
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Building for Production

1. Build the web application:
```bash
npm run build
```

2. Add mobile platforms:
```bash
npx cap add ios
npx cap add android
```

3. Update native dependencies:
```bash
npx cap sync
```

4. Open native IDEs:
```bash
npx cap open ios     # For iOS
npx cap open android # For Android
```

## Project Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Page components
├── services/       # Service layer (localStorage)
├── types/          # TypeScript type definitions
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow functional component patterns
- Use hooks for state management
- Keep components small and focused
- Use meaningful variable and function names
- Add comments for complex logic

### State Management

The application uses local storage for data persistence with a simple service layer:

- `localStorage.ts` handles all data operations
- Data is stored in the browser's localStorage
- Automatic data persistence
- Type-safe operations

### Mobile Development

The application is built with Capacitor for native mobile functionality:

1. Build the web application
2. Sync with Capacitor
3. Open in Xcode/Android Studio
4. Build and run on device/simulator

## Debugging

### Common Issues

1. Storage Issues:
   - Clear localStorage if data becomes corrupted
   - Check browser storage limits

2. Mobile Development:
   - Ensure Capacitor is properly synchronized
   - Check platform-specific logs
   - Use browser dev tools for web debugging

### Development Tools

- Browser DevTools for web debugging
- Xcode/Android Studio for native debugging
- React DevTools for component inspection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

### Web Deployment

1. Build the production bundle:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

### Mobile Deployment

#### iOS
1. Open Xcode project
2. Configure signing
3. Build and archive
4. Submit to App Store

#### Android
1. Open Android Studio project
2. Configure signing
3. Build release APK/Bundle
4. Submit to Play Store

## Support

For support, please open an issue in the repository or contact the maintainers.

