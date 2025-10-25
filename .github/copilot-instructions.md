# Repo-specific Copilot Instructions

This Next.js birthday website project uses the App Router and Tailwind CSS. Follow these patterns and conventions:

## Project Structure
- `src/app/`: App Router pages and layouts
- `src/components/`: React components (e.g., `Hero.tsx`)
- `public/songs/`: Audio files for birthday songs
- `public/`: Other static assets (images, etc.)

## Developer Workflow
1. Development:
   ```bash
   npm install  # Install dependencies
   npm run dev  # Start dev server at http://localhost:3000
   ```

2. Production:
   ```bash
   npm run build  # Build for production
   npm start      # Start production server
   ```

## Key Patterns & Conventions
1. Components
   - Use TypeScript and 'use client' directive for interactive components
   - Follow Hero.tsx pattern for animations/interactivity
   - Place shared components in src/components/
   - Use semantic HTML and ARIA attributes

2. Styling
   - Use Tailwind CSS utility classes
   - Group related utilities with @apply in globals.css when reused
   - Follow mobile-first responsive design

3. Assets & Media
   - Place audio files in public/songs/
   - Use relative paths from public/ (e.g., '/songs/birthday-song.mp3')
   - Handle audio playback errors gracefully

4. Performance
   - Use Next.js Image component for images
   - Lazy load non-critical resources
   - Optimize animation performance (useCallback, proper cleanup)

## Integration Points
- Add new songs in public/songs/
- Extend animations in Hero.tsx
- Customize styles in tailwind.config.js

## Testing & Quality
1. Before committing:
   ```bash
   npm run lint  # Check for linting errors
   npm run build # Verify build succeeds
   ```

2. Browser testing:
   - Check animations on different devices
   - Verify audio playback works
   - Test responsive design breakpoints

Reference the Hero.tsx component for examples of animations, event handling, and TypeScript usage.