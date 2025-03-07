
# Mobile Layout Component Documentation

## Overview
The `MobileLayout` component serves as the foundation for all mobile views in the Finance Footprint application. It provides a consistent layout structure including headers, content areas, and a navigation bar.

## Key Features

### Responsive Design
- Adapts to different screen sizes and device orientations
- Handles safe areas for modern mobile devices (notches, rounded corners, home indicators)
- Manages keyboard appearance and disappearance
- Automatically adjusts UI when virtual keyboard appears and disappears

### Hardware Integration
- Handles hardware back button for Android devices
- Manages gesture navigation areas on modern phones
- Provides smooth transitions between screens
- Detects and adjusts for device-specific features like navigation bars and gestures

### Navigation
- Bottom navigation bar with icon and label for each main section
- Active state indication for current route
- Animation effects for better user experience
- Automatically hides when keyboard is visible

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
4. **Keyboard Management** - Adjusts layout when keyboard appears/disappears by:
   - Detecting keyboard visibility using Visual Viewport API
   - Adding relevant CSS classes to the body element
   - Adjusting content padding and positioning
   - Scrolling focused elements into view
   - Hiding bottom navigation when keyboard is visible
5. **Animation Effects** - Provides subtle animations for better UX
6. **Gesture Area Detection** - Identifies and adapts to devices with gesture navigation

## Keyboard Handling

Special handling is implemented for virtual keyboards:

1. **Detection**: The layout detects keyboard appearance through Visual Viewport API by measuring height differences
2. **Adjustments**: When keyboard appears:
   - Navigation bar is hidden
   - Content padding is adjusted
   - The focused input is scrolled into view
   - Appropriate CSS classes are applied to shift content above keyboard
3. **Restoration**: When keyboard disappears, all adjustments are reversed

## Best Practices

- Always wrap page content in the MobileLayout component
- Use the title prop for clear page identification
- Ensure content has appropriate padding inside the layout
- Use the custom back button handler for custom navigation logic
- For modals with input fields, use the custom number pad component on mobile
- Add extra bottom margin to scrollable content to ensure it's not hidden by keyboard
- Use refs to provide smooth scrolling for focused elements

## Cross-Platform Considerations

The component handles various platform-specific behaviors:

- **iOS Safe Areas**: Respects the dynamic island, notch, and home indicator
- **Android Gesture Navigation**: Detects and adapts to gesture navigation space
- **Hardware Back Button**: Custom handling for Android hardware back button
- **Keyboard Behavior**: Adapts differently based on iOS or Android keyboard appearance
- **Device-Specific Features**: Accommodates different screen sizes and aspect ratios
