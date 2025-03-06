
# Tutorial System Documentation

## Overview
The tutorial system provides users with comprehensive guidance on using Finance Footprint. It includes written tutorials and video content that helps users learn about the application's features.

## Components

### TutorialPage
Displays detailed written tutorials with step-by-step instructions.

```
/tutorial/:id → TutorialPage → TutorialContent → TutorialContentRenderer
```

### VideoTutorialPage
Plays video tutorials with supporting text content.

```
/video/:id → VideoTutorialPage → VideoEmbed → VideoContent
```

### TutorialsModal
Lists all available tutorials organized by category in the settings.

```
Settings → TutorialsModal → TutorialCard/VideoCard/ResourceCard
```

## Data Structure

Tutorials are defined in the config directory:

```
src/config/tutorials/
├── index.ts            # Exports all tutorial data
├── gettingStarted.ts   # Beginner tutorials
├── advancedTutorials.ts # Advanced user tutorials
├── videoTutorials.ts   # Video-based tutorials
└── resources.ts        # Downloadable resources
```

### Tutorial Data Model

```typescript
interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  time: string;
  category?: string;
  author?: string;
}
```

## Content Rendering

Tutorial content is rendered conditionally based on the tutorial ID. This allows for custom content formatting and structure for each tutorial while maintaining a consistent interface.

## Navigation Flow

1. User accesses tutorials from Settings
2. TutorialsModal displays available tutorials
3. User selects a tutorial
4. System routes to TutorialPage or VideoTutorialPage with the appropriate ID
5. Content specific to that tutorial ID is rendered

## Best Practices

- Keep tutorial content focused on specific tasks
- Include images or videos for complex procedures
- Use consistent terminology throughout tutorials
- Provide difficulty levels to help users choose appropriate content
- Link related tutorials to create learning paths
