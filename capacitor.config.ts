
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.5e0d366b0b0347e39f1823e461d553f8',
  appName: 'finance-footprint',
  webDir: 'dist',
  server: {
    url: 'https://5e0d366b-0b03-47e3-9f18-23e461d553f8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    contentInset: 'always',
    scheme: 'finance-footprint',
    backgroundColor: '#ffffff',
    preferredContentMode: 'mobile'
  },
  android: {
    backgroundColor: '#ffffff',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#22C55E"
    }
  }
};

export default config;
