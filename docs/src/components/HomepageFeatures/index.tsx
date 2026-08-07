import React, { type ReactNode } from 'react'

import styles from './styles.module.css'

import Heading from '@theme/Heading'
import clsx from 'clsx'

type FeatureItem = {
  title: string
  icon: string
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: '29 Production-Ready Components',
    icon: '/img/icon-components.svg',
    description: (
      <>
        Buttons, modals, inputs, lists, alerts and more — every component is battle-tested,
        fully typed, and ready for production.
      </>
    ),
  },
  {
    title: 'Type-Safe Theming',
    icon: '/img/icon-theming.svg',
    description: (
      <>
        Define your brand colors in <code>rott.config.ts</code> and get full TypeScript
        autocomplete across every component in your app.
      </>
    ),
  },
  {
    title: 'React Native First',
    icon: '/img/icon-mobile.svg',
    description: (
      <>
        Optimized for mobile with platform-specific adaptations, safe area handling, and
        performance-focused rendering.
      </>
    ),
  },
  {
    title: 'Highly Customizable',
    icon: '/img/icon-customize.svg',
    description: (
      <>
        Every component accepts extensive styling and behavior props. Customize without
        touching source code.
      </>
    ),
  },
  {
    title: 'Internationalization Ready',
    icon: '/img/icon-i18n.svg',
    description: (
      <>
        Built-in i18n with React Intl. Turkish and English included. Add any locale without
        rebuilding your components.
      </>
    ),
  },
  {
    title: 'Performance Optimized',
    icon: '/img/icon-performance.svg',
    description: (
      <>
        Powered by FlashList, Reanimated, and Worklets. Smooth animations and efficient list
        rendering out of the box.
      </>
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
          <p className={styles.featuresEyebrow}>Everything you need</p>
          <Heading as='h2' className={styles.featuresTitle}>
            Built for production from day one
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
