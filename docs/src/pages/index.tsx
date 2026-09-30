import React, { type ReactNode } from 'react'

import HomepageFeatures from '../components/HomepageFeatures'
import styles from './index.module.css'

import Link from '@docusaurus/Link'
import Translate, { translate } from '@docusaurus/Translate'
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
        <div className={styles.demoLabel}>
          <Translate id='homepage.showcase.buttons'>Buttons</Translate>
        </div>

        <div className={clsx(styles.demoButton, styles.demoPrimary)}>
          <Translate id='homepage.showcase.continue'>Continue</Translate>
        </div>
        <div className={clsx(styles.demoButton, styles.demoOutline)}>
          <Translate id='homepage.showcase.learnMore'>Learn more</Translate>
        </div>
        <div className={clsx(styles.demoButton, styles.demoBordered)}>
          <Translate id='homepage.showcase.signInWithGoogle'>Sign in with Google</Translate>
        </div>

        <div className={styles.demoLabel}>
          <Translate id='homepage.showcase.sizes'>Sizes</Translate>
        </div>

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
            <Translate id='homepage.hero.titleLead'>Components that</Translate>
            <br />
            <span className={styles.heroTitleAccent}>
              <Translate id='homepage.hero.titleAccent'>hold their shape.</Translate>
            </span>
          </h1>

          <p className={styles.heroSubtitle}>
            <Translate
              id='homepage.hero.subtitle'
              values={{ config: <code>rott.config.ts</code> }}>
              {
                '29 production-ready React Native components with type-safe theming. Declare your brand once in {config} — every component follows.'
              }
            </Translate>
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.btnPrimary} to='/docs/getting-started/installation'>
              <Translate id='homepage.hero.getStarted'>Get started</Translate>
            </Link>
            <Link className={styles.btnSecondary} to='/docs/components/overview'>
              <Translate id='homepage.hero.browseComponents'>Browse components</Translate>
            </Link>
          </div>

          <dl className={styles.heroStats}>
            <div className={styles.heroStat}>
              <dt>
                <Translate id='homepage.stats.components'>Components</Translate>
              </dt>
              <dd>29</dd>
            </div>
            <div className={styles.heroStat}>
              <dt>
                <Translate id='homepage.stats.runtimeDeps'>Runtime deps</Translate>
              </dt>
              <dd>0</dd>
            </div>
            <div className={styles.heroStat}>
              <dt>
                <Translate id='homepage.stats.typed'>Typed</Translate>
              </dt>
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
        <span className={styles.installLabel}>
          <Translate id='homepage.install.label'>Install</Translate>
        </span>
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
          <p className={styles.ctaLabel}>
            <Translate id='homepage.cta.label'>Ready to build?</Translate>
          </p>
          <h2 className={styles.ctaTitle}>
            <Translate id='homepage.cta.title'>Start in under five minutes</Translate>
          </h2>
          <p className={styles.ctaDescription}>
            <Translate
              id='homepage.cta.description'
              values={{ provider: <code>RottProvider</code> }}>
              {
                'Install Rott UI, wrap your app with {provider}, and start using components immediately.'
              }
            </Translate>
          </p>
          <Link className={styles.btnPrimary} to='/docs/getting-started/installation'>
            <Translate id='homepage.cta.installationGuide'>Installation guide</Translate>
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
      description={translate({
        id: 'homepage.meta.description',
        message:
          '29 production-ready React Native components with type-safe theming. Build beautiful mobile apps faster.',
      })}>
      <HomepageHero />
      <main>
        <InstallStrip />
        <HomepageFeatures />
        <HomepageCTA />
      </main>
    </Layout>
  )
}
