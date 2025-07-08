import {StyleSheet, Text, View} from 'react-native'

import {multiply} from '@tansuk/rott-ui'

const result = multiply(3, 7)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
