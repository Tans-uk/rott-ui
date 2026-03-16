import React, { type ReactNode } from 'react'

import HomepageFeatures from '../components/HomepageFeatures'
import styles from './index.module.css'

import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'

function HomepageHero() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={styles.hero}>
      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroEyebrow}>React Native UI Kit</div>
        <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
        <p className={styles.heroSubtitle}>
          29 production-ready components. Type-safe theming. Built for React Native.
        </p>

        <div className={styles.heroActions}>
          <Link
            className={clsx(styles.btnPrimary, 'button button--lg')}
            to='/docs/getting-started/installation'>
            Get Started
          </Link>
          <Link
            className={clsx(styles.btnSecondary, 'button button--lg')}
            to='/docs/components/overview'>
            View Components
          </Link>
        </div>

        <div className={styles.heroBadges}>
          <a
            href='https://www.npmjs.com/package/@tansuk/rott-ui'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.badgeLink}>
            <img src='https://img.shields.io/npm/v/@tansuk/rott-ui.svg?style=flat-square&labelColor=1a1a1a&color=92400e' alt='npm version' />
          </a>
          <a
            href='https://github.com/Tans-uk/rott-ui'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.badgeLink}>
            <img src='https://img.shields.io/github/stars/Tans-uk/rott-ui.svg?style=flat-square&labelColor=1a1a1a&color=92400e' alt='GitHub stars' />
          </a>
          <a
            href='https://github.com/Tans-uk/rott-ui/blob/main/LICENSE'
            target='_blank'
            rel='noopener noreferrer'
            className={styles.badgeLink}>
            <img src='https://img.shields.io/badge/license-MIT-flat-square?style=flat-square&labelColor=1a1a1a&color=92400e' alt='MIT License' />
          </a>
        </div>
      </div>
    </header>
  )
}

function HomepageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className='container'>
        <div className={styles.ctaInner}>
          <p className={styles.ctaLabel}>Ready to build?</p>
          <h2 className={styles.ctaTitle}>Start in under 5 minutes</h2>
          <p className={styles.ctaDescription}>
            Install Rott UI, wrap your app with <code>RottProvider</code>, and start using
            components immediately.
          </p>
          <Link
            className={clsx(styles.btnPrimary, 'button button--lg')}
            to='/docs/getting-started/installation'>
            Installation Guide
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} — React Native UI Kit`}
      description='29 production-ready React Native components with type-safe theming. Build beautiful mobile apps faster.'>
      <HomepageHero />
      <main>
        <HomepageFeatures />
        <HomepageCTA />
      </main>
    </Layout>
  )
}
