
# Mobile Layout Component Documentation

## Overview
The `MobileLayout` component serves as the foundation for all mobile views in the Finance Footprint application. It provides a consistent layout structure including headers, content areas, and a navigation bar.

## Key Features

### Responsive Design
- Adapts to different screen sizes and device orientations
- Handles safe areas for modern mobile devices (notches, rounded corners, home indicators)
- Manages keyboard appearance and disappearance

### Hardware Integration
- Handles hardware back button for Android devices
- Manages gesture navigation areas on modern phones
- Provides smooth transitions between screens

### Navigation
- Bottom navigation bar with icon and label for each main section
- Active state indication for current route
- Animation effects for better user experience

## Usage Example

```tsx
import MobileLayout from "../components/MobileLayout";

const HomePage = () => {
  return (
    <MobileLayout 
      title="Home" 
      showBackButton={false}
    >
      {/* Page content goes here */}
      <div className="p-4">
        <h1>Welcome to Finance Footprint</h1>
        <p>Your financial journey starts here</p>
      </div>
    </MobileLayout>
  );
};
```

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| children | React.ReactNode | Content to be rendered inside the layout | required |
| title | string | Title shown in the header | undefined |
| leftIcon | React.ReactNode | Custom icon for the left side of header | undefined |
| showBackButton | boolean | Whether to show back button in header | undefined |
| onBackClick | () => void | Custom function for back button | undefined |

## Internal Architecture

The component uses several internal mechanisms to provide a smooth mobile experience:

1. **Safe Area Handling** - Respects device-specific safe areas using CSS environment variables
2. **Navigation Management** - Tracks current route and handles navigation state
3. **Hardware Back Button** - Custom handler for Android back button
4. **Keyboard Management** - Adjusts layout when keyboard appears/disappears
5. **Animation Effects** - Provides subtle animations for better UX

## Best Practices

- Always wrap page content in the MobileLayout component
- Use the title prop for clear page identification
- Ensure content has appropriate padding inside the layout
- Use the custom back button handler for custom navigation logic
