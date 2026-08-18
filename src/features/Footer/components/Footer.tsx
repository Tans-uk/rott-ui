import React, {type FC} from 'react'

import {Content} from '../../Content'
import {type FooterProps} from '../models'

/**
 * Bottom-anchored container for screen-level actions.
 *
 * Wraps {@link Content} with footer layout defaults and respects the device's
 * bottom safe-area inset. Every default is overridable — pass any Content prop,
 * including `backgroundColor`, which is unset by default so the footer inherits
 * the surface behind it.
 */
export const Footer: FC<FooterProps> = ({
  children,
  testID = 'footer-test-id',
  minHeight = 128,
  paddingTop = 24,
  gap = 16,
  useBottomInset = true,
  ...props
}) => {
  return (
    <Content
      testID={testID}
      useBottomInset={useBottomInset}
      minHeight={minHeight}
      paddingTop={paddingTop}
      gap={gap}
      {...props}>
      {children}
    </Content>
  )
}
