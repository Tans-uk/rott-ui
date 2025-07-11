import {StyleSheet, View} from 'react-native'

import {Button, Container, Header, Label, RottProvider} from '@tansuk/rott-ui'

export default function App() {
  return (
    <RottProvider>
      <Container style={styles.container}>
        <Header title='Rott UI Example' />

        <View style={styles.content}>
          <Label variant='black' fontSize='xl' fontWeight={700} marginBottom={20}>
            Welcome to Rott UI
          </Label>

          <Label variant='grey-600' fontSize='md' marginBottom={30} textCenter>
            This is an example app showcasing the UI components
          </Label>

          <Button
            variant='primary'
            text='Primary Button'
            onPress={() => console.log('Primary button pressed')}
            marginBottom={10}
          />

          <Button
            variant='secondary'
            text='Secondary Button'
            onPress={() => console.log('Secondary button pressed')}
            marginBottom={10}
          />

          <Button
            variant='outline'
            text='Outline Button'
            onPress={() => console.log('Outline button pressed')}
          />
        </View>
      </Container>
    </RottProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})
