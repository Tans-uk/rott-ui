import React, {type ReactNode} from 'react'

import styles from './styles.module.css'

import Heading from '@theme/Heading'
import clsx from 'clsx'

type FeatureItem = {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: '29 Production-Ready Components',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        From basic buttons to complex modals and input fields. Every component is battle-tested,
        fully typed, and ready for production use.
      </>
    ),
  },
  {
    title: 'Type-Safe Theming',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Configure colors, fonts, and styles with full TypeScript support using
        <code> rott.config.ts</code>. Get autocomplete for your custom theme everywhere.
      </>
    ),
  },
  {
    title: 'React Native First',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Optimized for mobile development with platform-specific adaptations, performance
        optimizations, and comprehensive accessibility features.
      </>
    ),
  },
  {
    title: 'Highly Customizable',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Every component accepts extensive styling and behavior props. Customize colors, sizes,
        variants, and more without touching the source code.
      </>
    ),
  },
  {
    title: 'i18n Ready',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Built-in internationalization support with React Intl integration. Turkish and English
        documentation included out of the box.
      </>
    ),
  },
  {
    title: 'Performance Optimized',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Leverages FlashList, Reanimated, and other performance libraries. Responsive scaling and
        optimized rendering for smooth experiences.
      </>
    ),
  },
]

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Svg className={styles.featureSvg} role='img' />
      </div>
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
