# Deployment Guide

This guide explains how to deploy the Rott UI documentation site.

## Prerequisites

- Node.js 20.0 or higher
- npm or yarn
- Vercel account (recommended) or Netlify account

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the best experience for Docusaurus sites with automatic deployments.

#### Initial Setup

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Link Project**:
```bash
cd docs
vercel link
```

Follow the prompts to link your project.

#### Deploy to Production

```bash
cd docs
npm run build
vercel --prod
```

#### Automatic Deployments

The GitHub Actions workflow (`.github/workflows/docs.yml`) automatically deploys:
- **Production**: On push to `main` branch
- **Preview**: On pull requests

#### Required Secrets

Add these secrets to your GitHub repository:
- `VERCEL_TOKEN`: Your Vercel token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID

Get these values from:
1. Token: https://vercel.com/account/tokens
2. Org ID & Project ID: Run `vercel link` and check `.vercel/project.json`

### Option 2: Netlify

#### Via Netlify CLI

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Login**:
```bash
netlify login
```

3. **Deploy**:
```bash
cd docs
npm run build
netlify deploy --prod --dir=build
```

#### Via GitHub Integration

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Base directory**: `docs`
   - **Build command**: `npm run build`
   - **Publish directory**: `docs/build`

### Option 3: GitHub Pages

#### Configure

Update `docusaurus.config.ts`:

```ts
url: 'https://tans-uk.github.io',
baseUrl: '/rott-ui/',
organizationName: 'Tans-uk',
projectName: 'rott-ui',
```

#### Deploy

```bash
cd docs
GIT_USER=<your-github-username> npm run deploy
```

This will build the site and push to the `gh-pages` branch.

## Environment Variables

### Algolia Search (Optional)

If using Algolia DocSearch, add these to your deployment:

```env
ALGOLIA_APP_ID=your_app_id
ALGOLIA_API_KEY=your_api_key
ALGOLIA_INDEX_NAME=rott-ui
```

## Build Optimization

### Production Build

```bash
cd docs
npm run build
```

### Test Production Build Locally

```bash
npm run serve
```

Visit `http://localhost:3000` to test the production build.

### Build Performance

- Average build time: 30-60 seconds
- Build size: ~5-10 MB
- Supports incremental builds

## Custom Domain

### Vercel

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain (e.g., `docs.rott-ui.com`)
4. Update DNS records as instructed

### Netlify

1. Go to "Domain settings" in Netlify
2. Add custom domain
3. Configure DNS records

### Update Configuration

Update `docusaurus.config.ts`:

```ts
url: 'https://docs.rott-ui.com',
baseUrl: '/',
```

## Monitoring

### Analytics

Add Google Analytics in `docusaurus.config.ts`:

```ts
themeConfig: {
  // ...
  gtag: {
    trackingID: 'G-XXXXXXXXXX',
    anonymizeIP: true,
  },
}
```

### Error Tracking

Add Sentry or similar error tracking service.

## Troubleshooting

### Build Fails

1. Clear cache:
```bash
npm run clear
npm run build
```

2. Check Node version:
```bash
node --version  # Should be 20.0+
```

3. Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Deployment Fails

1. Check build logs in Vercel/Netlify dashboard
2. Verify environment variables
3. Ensure all dependencies are in `package.json`

### Broken Links

Run the broken links checker:

```bash
npm run build
```

Docusaurus will report any broken links during build.

## Performance

### Optimization Tips

1. **Optimize images**: Use WebP format, compress images
2. **Code splitting**: Docusaurus handles this automatically
3. **Lazy loading**: Images and components load on demand
4. **CDN**: Vercel/Netlify provide global CDN automatically

### Lighthouse Scores

Target scores:
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## Maintenance

### Update Docusaurus

```bash
cd docs
npm update @docusaurus/core @docusaurus/preset-classic
```

### Update Dependencies

```bash
npm update
```

### Check for Vulnerabilities

```bash
npm audit
npm audit fix
```

## Support

For deployment issues:
- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support
- GitHub Pages: https://docs.github.com/en/pages

For Docusaurus issues:
- Docs: https://docusaurus.io/docs
- Discord: https://discord.gg/docusaurus
