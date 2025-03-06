
# Modal System Documentation

## Overview
The modal system provides a consistent way to display overlays throughout Finance Footprint. It's used for settings, tutorials, note creation/editing, and transaction management.

## Key Modal Components

### ModalContainer
A generic container used for settings modals:

```tsx
<ModalContainer
  activeModal="appearance"
  setActiveModal={setActiveModal}
  theme={theme}
  handleThemeChange={handleThemeChange}
/>
```

### NoteModal
Specialized modal for creating and editing notes:

```tsx
<NoteModal
  show={showModal}
  onClose={() => setShowModal(false)}
  noteType={noteType}
  onTypeChange={setNoteType}
  title={title}
  onTitleChange={setTitle}
  content={content}
  onContentChange={setContent}
  checklist={checklist}
  onChecklistItemAdd={handleAddChecklistItem}
  onChecklistItemChange={handleChecklistItemChange}
  onChecklistItemToggle={handleChecklistItemToggle}
  onChecklistKeyDown={handleChecklistKeyDown}
  onSave={handleSaveNote}
  autoSave={true}
  modalRef={modalRef}
/>
```

## Modal Architecture

### Layers
1. **Backdrop**: Semi-transparent overlay that covers the entire screen
2. **Modal Container**: Positioned container with animation
3. **Modal Header**: Title and close button
4. **Modal Content**: Specific to each modal type
5. **Modal Actions**: Buttons or other interactive elements

### State Management
- Modal visibility controlled via state (show/hide)
- Modal content determined by active modal type
- Data flow managed through props and callbacks

## Modal Features

### Accessibility
- Keyboard navigation (tab order)
- Escape key closes modal
- Focus trap within modal

### Mobile Optimization
- Full-screen on small devices
- Slide-up animation
- Safe area insets respected
- Keyboard handling

### Touch Interaction
- Click outside to dismiss
- Swipe gestures (where applicable)
- Haptic feedback (on supported devices)

## Custom Modal Types

The application uses several specialized modal types:

1. **Settings Modals**: Configuration options
2. **Tutorial Modals**: Learning content
3. **Note Modals**: Text or checklist editing
4. **Transaction Modals**: Financial data entry

## Best Practices

- Keep modals focused on a single task
- Provide clear exit paths (close button, cancel option)
- Ensure mobile compatibility
- Handle keyboard appearance/disappearance
- Use consistent animation patterns
- Prevent interaction with background content
