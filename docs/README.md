# Rott UI Documentation

This directory contains the Docusaurus documentation site for Rott UI.

## 🚀 Quick Start

### Development

```bash
npm install
npm start
```

Visit `http://localhost:3000` to view the documentation site.

### Build

```bash
npm run build
```

The static files will be generated in the `build` directory.

### Serve Built Site

```bash
npm run serve
```

## 📁 Structure

```
docs/
├── docs/                    # Documentation content
│   ├── intro.md
│   ├── getting-started/     # Getting started guides
│   ├── theming/             # Theming documentation
│   ├── components/          # Component documentation
│   ├── guides/              # How-to guides
│   └── examples/            # Complete examples
├── src/
│   ├── components/          # Custom React components
│   │   ├── PropsTable.tsx   # Props table component
│   │   ├── ExpoSnack.tsx    # Expo Snack embed
│   │   └── ComponentDemo.tsx # Demo component
│   ├── css/                 # Custom styling
│   └── pages/               # Custom pages
├── static/                  # Static assets
├── i18n/                    # Translations
│   └── tr/                  # Turkish translations
├── docusaurus.config.ts     # Main configuration
└── sidebars.ts              # Sidebar navigation
```

## 🌍 Internationalization

### Add Turkish Translations

1. Run the translation command:
```bash
npm run write-translations -- --locale tr
```

2. Translate the content in `i18n/tr/docusaurus-plugin-content-docs/current/`

3. Build with Turkish locale:
```bash
npm run build -- --locale tr
```

### View Turkish Docs

```bash
npm start -- --locale tr
```

## 📝 Adding Documentation

### New Component Page

1. Create a new markdown file in `docs/components/[category]/component-name.md`
2. Add frontmatter:
```markdown
---
sidebar_position: 1
title: Component Name
description: Brief description
---
```
3. Add the page to `sidebars.ts`

### New Guide

1. Create a new markdown file in `docs/guides/guide-name.md`
2. Add to the guides section in `sidebars.ts`

## 🔧 Configuration

### docusaurus.config.ts

Main configuration file containing:
- Site metadata
- i18n configuration
- Theme configuration
- Plugin configuration
- Navbar and footer

### sidebars.ts

Defines the sidebar navigation structure.

## 🎨 Custom Components

### PropsTable

Displays component props in a formatted table:

```tsx
import PropsTable from '@site/src/components/PropsTable';

<PropsTable component="Button" />
```

### ExpoSnack

Embeds interactive Expo Snack examples:

```tsx
import ExpoSnack from '@site/src/components/ExpoSnack';

<ExpoSnack snackId="button-example" platform="ios" />
```

### ComponentDemo

Shows code examples with TypeScript/JavaScript tabs:

```tsx
import ComponentDemo from '@site/src/components/ComponentDemo';

<ComponentDemo
  title="Basic Button"
  tsCode={`<Button variant="primary">Click Me</Button>`}
/>
```

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

### GitHub Pages

1. Update `docusaurus.config.ts`:
```ts
url: 'https://tans-uk.github.io',
baseUrl: '/rott-ui/',
organizationName: 'Tans-uk',
projectName: 'rott-ui',
```

2. Deploy:
```bash
npm run deploy
```

### Netlify

1. Build command: `npm run build`
2. Publish directory: `build`
3. Deploy via Netlify CLI or connect GitHub repo

## 📊 Documentation Coverage

### Completed ✅

- Introduction and Getting Started
- All 29 component pages
- Theming documentation (colors, typography, spacing, rott.config.ts)
- 6 comprehensive guides
- 3 complete example apps
- Custom components (PropsTable, ExpoSnack, ComponentDemo)
- i18n structure

### Pending 📝

- Turkish translations
- Expo Snack examples
- Screenshots and videos
- Search configuration (Algolia)

## 🤝 Contributing

To contribute to the documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes in the `docs/` directory
4. Test locally with `npm start`
5. Submit a pull request

## 📄 License

MIT © Doğukan Tansuk
