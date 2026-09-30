import React, { type ReactNode } from 'react'

import styles from './styles.module.css'

import Translate from '@docusaurus/Translate'
import Heading from '@theme/Heading'
import clsx from 'clsx'

type FeatureItem = {
  title: ReactNode
  icon: string
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: <Translate id='homepage.features.components.title'>29 Production-Ready Components</Translate>,
    icon: '/img/icon-components.svg',
    description: (
      <Translate id='homepage.features.components.description'>
        {'Buttons, modals, inputs, lists, alerts and more — every component is battle-tested, fully typed, and ready for production.'}
      </Translate>
    ),
  },
  {
    title: <Translate id='homepage.features.theming.title'>Type-Safe Theming</Translate>,
    icon: '/img/icon-theming.svg',
    description: (
      <Translate
        id='homepage.features.theming.description'
        values={{ config: <code>rott.config.ts</code> }}>
        {'Define your brand colors in {config} and get full TypeScript autocomplete across every component in your app.'}
      </Translate>
    ),
  },
  {
    title: <Translate id='homepage.features.reactNative.title'>React Native First</Translate>,
    icon: '/img/icon-mobile.svg',
    description: (
      <Translate id='homepage.features.reactNative.description'>
        {'Optimized for mobile with platform-specific adaptations, safe area handling, and performance-focused rendering.'}
      </Translate>
    ),
  },
  {
    title: <Translate id='homepage.features.customizable.title'>Highly Customizable</Translate>,
    icon: '/img/icon-customize.svg',
    description: (
      <Translate id='homepage.features.customizable.description'>
        {'Every component accepts extensive styling and behavior props. Customize without touching source code.'}
      </Translate>
    ),
  },
  {
    title: <Translate id='homepage.features.i18n.title'>Internationalization Ready</Translate>,
    icon: '/img/icon-i18n.svg',
    description: (
      <Translate id='homepage.features.i18n.description'>
        {'Built-in i18n with React Intl. Turkish and English included. Add any locale without rebuilding your components.'}
      </Translate>
    ),
  },
  {
    title: <Translate id='homepage.features.performance.title'>Performance Optimized</Translate>,
    icon: '/img/icon-performance.svg',
    description: (
      <Translate id='homepage.features.performance.description'>
        {'Powered by FlashList, Reanimated, and Worklets. Smooth animations and efficient list rendering out of the box.'}
      </Translate>
    ),
  },
]

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.featureCard}>
        <div className={styles.featureIconWrap}>
          {/* Masked rather than <img>+hue-rotate: the glyph is painted with the
              accent token directly, so it stays correct in both themes instead of
              relying on a filter chain hand-tuned to one specific hex. */}
          <span
            className={styles.featureIcon}
            aria-hidden='true'
            style={{
              maskImage: `url(${icon})`,
              WebkitMaskImage: `url(${icon})`,
            }}
          />
        </div>
        <Heading as='h3' className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className={styles.featuresHeader}>
          <p className={styles.featuresEyebrow}>
            <Translate id='homepage.features.eyebrow'>Everything you need</Translate>
          </p>
          <Heading as='h2' className={styles.featuresTitle}>
            <Translate id='homepage.features.title'>Built for production from day one</Translate>
          </Heading>
        </div>
        <div className={clsx('row', styles.featuresGrid)}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
