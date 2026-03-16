import React, {type ReactNode} from 'react'

import HomepageFeatures from '../components/HomepageFeatures'
import styles from './index.module.css'

import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <Heading as='h1' className='hero__title'>
          {siteConfig.title}
        </Heading>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className='button button--secondary button--lg'
            to='/docs/getting-started/installation'
            style={{marginRight: '1rem'}}>
            Get Started 🚀
          </Link>
          <Link
            className='button button--outline button--secondary button--lg'
            to='/docs/components/overview'>
            View Components
          </Link>
        </div>
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          <a
            href='https://www.npmjs.com/package/@tansuk/rott-ui'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'white',
              textDecoration: 'none',
            }}>
            <img src='https://img.shields.io/npm/v/@tansuk/rott-ui.svg' alt='npm version' />
          </a>
          <a
            href='https://github.com/Tans-uk/rott-ui'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'white',
              textDecoration: 'none',
            }}>
            <img src='https://img.shields.io/github/stars/Tans-uk/rott-ui.svg' alt='GitHub stars' />
          </a>
          <a
            href='https://github.com/Tans-uk/rott-ui/blob/main/LICENSE'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'white',
              textDecoration: 'none',
            }}>
            <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='MIT License' />
          </a>
        </div>
      </div>
    </header>
  )
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} - React Native UI Kit`}
      description='A comprehensive, property-based React Native UI Kit for rapid development with type-safe theming and extensive customization options.'>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
