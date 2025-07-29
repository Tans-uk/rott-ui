/**
 * Rott UI React Native CLI Example
 * Simple working version to test setup
 *
 * @format
 */

import React from 'react'
import {StatusBar, StyleSheet, View, Text} from 'react-native'
import {Button, Container, Header, Label, RottProvider} from '@tansuk/rott-ui'

console.log('DEBUG - Component types:')
console.log('Button:', typeof Button)
console.log('Container:', typeof Container)
console.log('Header:', typeof Header)
console.log('Label:', typeof Label)
console.log('RottProvider:', typeof RottProvider)

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor='#ffffff' />
      <Text>Testing Component Imports</Text>
      <Text>Button: {typeof Button}</Text>
      <Text>Container: {typeof Container}</Text>
      <Text>Header: {typeof Header}</Text>
      <Text>Label: {typeof Label}</Text>
      <Text>RottProvider: {typeof RottProvider}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
})

export default App
