import React, { type ReactNode } from 'react'

import HomepageFeatures from '../components/HomepageFeatures'
import styles from './index.module.css'

import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import clsx from 'clsx'

/**
 * A static reproduction of what Rott UI actually renders — the library's own
 * primary (rgba(0, 169, 206, 1)), its 8px radius, its size ladder. A component
 * library's homepage should show components; this is the cheapest honest way to
 * do that without booting a React Native runtime in the browser.
 */
function DeviceShowcase() {
  return (
    <div className={styles.device} aria-hidden='true'>
      <div className={styles.deviceNotch} />
      <div className={styles.deviceScreen}>
        <div className={styles.demoLabel}>Buttons</div>

        <div className={clsx(styles.demoButton, styles.demoPrimary)}>Continue</div>
        <div className={clsx(styles.demoButton, styles.demoOutline)}>Learn more</div>
        <div className={clsx(styles.demoButton, styles.demoBordered)}>Sign in with Google</div>

        <div className={styles.demoLabel}>Sizes</div>

        {/* The percentages are close by design, so each chip states its own value —
            otherwise three near-identical boxes read as a rendering mistake. */}
        <div className={styles.demoSizes}>
          <div className={styles.demoChip} style={{ width: '85%' }}>
            xl <span className={styles.demoChipValue}>85%</span>
          </div>
          <div className={styles.demoChip} style={{ width: '92.5%' }}>
            xxl <span className={styles.demoChipValue}>92.5%</span>
          </div>
          <div className={styles.demoChip} style={{ width: '100%' }}>
            full <span className={styles.demoChipValue}>100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function HomepageHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroGlow} aria-hidden='true' />

      <div className={clsx('container', styles.heroInner)}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            <span className={styles.heroDot} aria-hidden='true' />
            React Native UI Kit
          </p>

          <h1 className={styles.heroTitle}>
            Components that
            <br />
            <span className={styles.heroTitleAccent}>hold their shape.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            29 production-ready React Native components with type-safe theming. Declare your
            brand once in <code>rott.config.ts</code> — every component follows.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} to='/docs/getting-started/installation'>
              Get started
            </Link>
            <Link className={styles.btnSecondary} to='/docs/components/overview'>
              Browse components
            </Link>
          </div>

          <dl className={styles.heroStats}>
            <div className={styles.heroStat}>
              <dt>Components</dt>
              <dd>29</dd>
            </div>
            <div className={styles.heroStat}>
              <dt>Runtime deps</dt>
              <dd>0</dd>
            </div>
            <div className={styles.heroStat}>
              <dt>Typed</dt>
              <dd>100%</dd>
            </div>
          </dl>
        </div>

        <div className={styles.heroVisual}>
          <DeviceShowcase />
        </div>
      </div>
    </header>
  )
}

function InstallStrip() {
  return (
    <section className={styles.installStrip}>
      <div className={clsx('container', styles.installInner)}>
        <span className={styles.installLabel}>Install</span>
        <code className={styles.installCommand}>yarn add @tansuk/rott-ui</code>
      </div>
    </section>
  )
}

function HomepageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className='container'>
        <div className={styles.ctaInner}>
          <p className={styles.ctaLabel}>Ready to build?</p>
          <h2 className={styles.ctaTitle}>Start in under five minutes</h2>
          <p className={styles.ctaDescription}>
            Install Rott UI, wrap your app with <code>RottProvider</code>, and start using
            components immediately.
          </p>
          <Link className={styles.btnPrimary} to='/docs/getting-started/installation'>
            Installation guide
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
        <InstallStrip />
        <HomepageFeatures />
        <HomepageCTA />
      </main>
    </Layout>
  )
}
