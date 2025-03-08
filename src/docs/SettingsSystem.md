
# Finance Footprint Settings System

## Overview

The Settings module in Finance Footprint provides users with a customizable experience through various configuration options. The settings interface is designed with a mobile-first approach and offers a clean, intuitive menu system for accessing different settings categories.

## Architecture

The Settings module follows a modal-based architecture:

1. **Main Settings Page** (`Settings.tsx`): Entry point that displays the settings menu
2. **Settings Menu** (`SettingsMenu.tsx`): Menu with all available setting options
3. **Modal Container** (`ModalContainer.tsx`): Handles the display of different setting modals
4. **Individual Setting Modals**: Specific components for each setting category

## File Structure

```
src/
└── components/
    └── settings/
        ├── AboutModal.tsx          # Information about the application
        ├── AppearanceModal.tsx     # Theme settings (light/dark/system)
        ├── CategoriesModal.tsx     # Transaction category management
        ├── CurrencyModal.tsx       # Currency selection
        ├── ExportedFilesModal.tsx  # Manages exported data files
        ├── FAQModal.tsx            # Frequently asked questions
        ├── ForumModal.tsx          # Community forum links
        ├── GuideModal.tsx          # User guide documentation
        ├── HelpSupportModal.tsx    # Help and support resources
        ├── ModalContainer.tsx      # Container for all setting modals
        ├── SettingsMenu.tsx        # Main settings navigation menu
        └── TutorialsModal.tsx      # Tutorials and learning resources
```

## Key Components

### Settings Page (`Settings.tsx`)

The main settings page serves as the container for all settings functionality:

- Initializes and manages state for settings options (theme, currency, categories)
- Handles navigation between settings menu and specific setting modals
- Manages back button behavior for navigation between settings and home screen
- Integrates with application themes and toast notifications

### Settings Menu (`SettingsMenu.tsx`)

Displays all available settings options:

- Organized in categories (preferences, documentation)
- Each menu item opens a specific modal when clicked
- External links (like Community Forum, GitHub repository) open in new tabs
- Uses Lucide icons for visual representation of each setting

### Modal Container (`ModalContainer.tsx`)

Provides a consistent container for all setting modals:

- Handles modal display, positioning, and animations
- Manages modal closing through backdrop clicks and escape key
- Handles keyboard focus and viewport adjustments for mobile devices
- Renders the appropriate modal content based on the selected setting

### Individual Setting Modals

Each setting has a dedicated modal component:

1. **Appearance Modal**: 
   - Theme selection (light/dark/system)
   - Visual indicators for current selection
   - Immediate theme application

2. **Categories Modal**:
   - View and manage transaction categories
   - Add new custom categories
   - Delete existing categories (except "Other")
   - Animated interface for smooth user experience

3. **Currency Modal**:
   - Select from common world currencies
   - Visual indication of current selection
   - Currency symbol display

4. **About Modal**:
   - Application information
   - Version details
   - Copyright information

5. **Help & Support Modal**:
   - Support resources
   - Contact options
   - Troubleshooting guidance

6. **Guide Modal**:
   - Comprehensive user guide
   - Step-by-step instructions
   - Related resources links

7. **FAQ Modal**:
   - Common questions and answers
   - Usage guidance
   - Troubleshooting advice

8. **Exported Files Modal**:
   - Management of exported data files
   - Open or delete exported files
   - Display of export date

## Data Management

Settings data is persisted using the LocalStorage service:

1. **Theme Preference**: 
   - Stored and retrieved using next-themes
   - Automatically applies system preference if set to "system"

2. **Currency Selection**:
   - Stored and retrieved using storageService
   - Applied consistently across the application

3. **Transaction Categories**:
   - Managed in state and persisted in localStorage
   - Available throughout the application for transaction categorization

## User Workflows

### Changing Theme

1. Navigate to Settings
2. Tap "Appearance"
3. Select preferred theme (Light, Dark, or System)
4. Theme is applied immediately
5. Toast notification confirms the change

### Managing Categories

1. Navigate to Settings
2. Tap "Categories"
3. To add a category:
   - Enter new category name
   - Tap the plus button
4. To delete a category:
   - Tap the trash icon next to the category
   - Category is removed immediately (except "Other")

### Changing Currency

1. Navigate to Settings
2. Tap "Currency"
3. Select preferred currency from the list
4. Currency is applied throughout the application
5. Toast notification confirms the change

## Accessibility Features

The Settings module includes several accessibility enhancements:

1. **Keyboard Navigation**: 
   - Full support for tab navigation
   - Escape key to close modals
   - Enter key to select options

2. **Screen Reader Support**:
   - Proper ARIA labels
   - Semantic HTML structure
   - Descriptive text for icons

3. **Mobile Optimization**:
   - Responsive design for all screen sizes
   - Touch-friendly interactive elements
   - Adjustments for virtual keyboards

## Implementation Details

### Modal State Management

```typescript
// Setting active modal
const [activeModal, setActiveModal] = React.useState<ModalType>(() => {
  // Check if we're coming back from a tutorial page with state
  if (location.state?.openModal) {
    return location.state.openModal;
  }
  return null;
});

// Handle navigation with back button
const handleBackClick = () => {
  if (activeModal) {
    setActiveModal(null); // Go back to main settings if in a modal
    return;
  }
  
  navigate('/home'); // Go back to home if on main settings page
};
```

### Theme Handling

```typescript
const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
  setTheme(newTheme);
  toast({
    title: "Theme Updated",
    description: `Theme set to ${newTheme} mode`,
    duration: 2000,
  });
};
```

### Currency Management

```typescript
const handleCurrencyChange = (newCurrency: string) => {
  setCurrency(newCurrency);
  storageService.setCurrency(newCurrency);
  toast({
    title: "Currency Updated",
    description: `Currency set to ${newCurrency}`,
    duration: 2000,
  });
  setActiveModal(null); // Auto-close the modal
};
```

## Best Practices

1. **Toast Notifications**:
   - Used for confirming user actions
   - Short duration to avoid interrupting workflow
   - Clear, concise messaging

2. **Consistent Design**:
   - All modals follow the same design pattern
   - Animations provide visual feedback
   - Mobile-optimized interface elements

3. **Responsive Layout**:
   - Adapts to different screen sizes
   - Special handling for mobile keyboards
   - Touch-friendly interactive elements

## Troubleshooting

### Modal Not Displaying Correctly

**Issue**: Modal appears cut off or positioned incorrectly.

**Solution**:
- Check if the device keyboard is active, which can affect viewport height
- Ensure the modal's position is correctly adjusted for the current viewport
- Verify that the modal's max-height is appropriate for the screen size

### Settings Not Persisting

**Issue**: Changed settings revert after refreshing or reopening the app.

**Solution**:
- Check if localStorage is available and functioning correctly
- Verify that the correct storage service methods are being called
- Ensure there are no errors during the save operation

### Keyboard Issues

**Issue**: Virtual keyboard pushes content up and causes layout problems.

**Solution**:
- The modal container has built-in keyboard adjustment handling
- If issues persist, check the `visualViewport` listeners and adjustment logic
- Verify that the modal content has appropriate max-height and scrolling behavior
