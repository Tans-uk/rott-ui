/**
 * Rott UI React Native CLI Example
 * Simple working version to test setup
 *
 * @format
 */

import React from 'react'
import {Container, Label, RottProvider} from '@tansuk/rott-ui'

function App(): React.JSX.Element {
  return (
    <RottProvider>
      <Container>
        <Label>Cindoruk</Label>
      </Container>
    </RottProvider>
  )
}

export default App
