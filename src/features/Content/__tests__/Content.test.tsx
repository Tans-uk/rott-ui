import {Content} from '@features'
import {render} from '@utils'

describe('Content -> Custom Component', () => {
  const testId = {
    keyboardAvoidingViewTestId: 'keyboard-avoiding-view-test-id',
  }

  it('ilk render anında snapshot ile eşleşmeli', () => {
    const rendered = render(<Content />)

    expect(rendered).toMatchSnapshot()
  })

  it('keyboard avoiding view varsayilan ekranda olmamali', () => {
    const {keyboardAvoidingViewTestId} = testId
    const {queryByTestId} = render(<Content />)

    const keyboardAvoidingViewElement = queryByTestId(keyboardAvoidingViewTestId)

    expect(keyboardAvoidingViewElement).not.toBeTruthy()
  })

  it('keyboardAvoidingView verildiginde renderlanmali', () => {
    const {keyboardAvoidingViewTestId} = testId
    const {getByTestId} = render(<Content keyboardAvoidingView />)

    const keyboardAvoidingViewElement = getByTestId(keyboardAvoidingViewTestId)

    expect(keyboardAvoidingViewElement).toBeTruthy()
  })
})
