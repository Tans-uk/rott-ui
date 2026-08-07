import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Main sidebar
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Theming',
      collapsed: false,
      items: [
        'theming/overview',
        'theming/colors',
        'theming/typography',
        'theming/rott-config',
        'theming/spacing',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      collapsed: false,
      items: [
        'components/overview',
        'components/action-menu',
        'components/alert',
        'components/alert-dialog',
        'components/bottom-menu',
        'components/button',
        'components/common',
        'components/container',
        'components/content',
        'components/empty-state',
        'components/footer',
        'components/form-container',
        'components/header',
        'components/icon',
        'components/image',
        'components/image-background',
        'components/input',
        'components/input-amount',
        'components/input-checkbox',
        'components/input-credit-card',
        'components/input-cvc',
        'components/input-date',
        'components/input-email',
        'components/input-expire-date',
        'components/input-iban',
        'components/input-numeric',
        'components/input-password',
        'components/input-phone',
        'components/input-pin',
        'components/input-search',
        'components/input-select',
        'components/item',
        'components/label',
        'components/list',
        'components/modal',
        'components/notification',
        'components/pressable',
        'components/result',
        'components/separator',
        'components/skeleton',
        'components/tab',
        'components/tab-widget',
        'components/timer',
        'components/toggle',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/forms',
        'guides/modals-dialogs',
        'guides/navigation-patterns',
        'guides/internationalization',
        'guides/testing',
        'guides/accessibility',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/login-form',
        'examples/settings-screen',
        'examples/product-list',
      ],
    },
  ],

  /**
   * Release notes deliberately sit outside tutorialSidebar. Inside it, visiting
   * the page marks the navbar's "Docs" item active as well as "Release Notes",
   * so two destinations highlight at once. It is also not part of the docs
   * hierarchy — it reads better full width.
   */
};

export default sidebars;
