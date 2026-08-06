import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Rott UI',
  tagline: '29 production-ready React Native components with type-safe theming.',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.rott-ui.tansuk.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Tansuk', // Usually your GitHub org/user name.
  projectName: 'Rott-UI', // Usually your repo name.
  
  // GitHub Pages adds a trailing slash by default
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Typeface stack. Bricolage Grotesque carries the display voice, Public Sans does
  // the reading, JetBrains Mono handles code. Loaded with display=swap so text is
  // never invisible while the fonts fetch.
  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
    },
  ],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Public+Sans:ital,wght@0,300..700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap',
      type: 'text/css',
    },
  ],

  // Internationalization configuration
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      tr: {
        label: 'Türkçe',
        direction: 'ltr',
        htmlLang: 'tr-TR',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Tans-uk/rott-ui/tree/main/docs/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/rott-ui-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Rott UI',
      logo: {
        alt: 'Rott UI Logo',
        src: 'img/logo-badge.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          to: '/docs/release-notes',
          label: 'Release Notes',
          position: 'left',
        },
        {
          href: 'https://github.com/Tans-uk/rott-ui',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@tansuk/rott-ui',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'Rott UI',
        src: 'img/logo.svg',
        href: '/',
        width: 80,
      },
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Components',
              to: '/docs/components/overview',
            },
            {
              label: 'Theming',
              to: '/docs/theming/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Tans-uk/rott-ui',
            },
            {
              label: 'Issues',
              href: 'https://github.com/Tans-uk/rott-ui/issues',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/Tans-uk/rott-ui/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/@tansuk/rott-ui',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/Tans-uk/rott-ui/releases',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Doğukan Tansuk — MIT License`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'typescript', 'tsx', 'jsx'],
    },
    algolia: {
      // Will be configured later when we have the site deployed
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'rott-ui',
      contextualSearch: true,
      searchParameters: {},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
