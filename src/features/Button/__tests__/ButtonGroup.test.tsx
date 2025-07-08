import {ButtonGroup} from '../components'

import {render} from '@utils'

describe('ButtonGroup -> Custom Component', () => {
  const testIDs = {
    logoImageTestId: 'image-test-id',
  }

  it('buton grubunun snapshotı ile eşleşmeli', () => {
    const rendered = render(
      <ButtonGroup
        sticky
        buttons={[
          {text: 'Button 1', variant: 'primary'},
          {text: 'Button 2', variant: 'secondary-outline'},
        ]}
        image={{
          name: 'FAST_LOGO',
          width: 60,
          height: 40,
        }}
      />
    )

    expect(rendered).toMatchSnapshot()
  })

  it('isFastTransfer true ise ekranda fast görseli görünür', () => {
    const {logoImageTestId} = testIDs
    const {getByTestId} = render(
      <ButtonGroup
        isFastTransfer
        buttons={[
          {text: 'Button 1', variant: 'primary'},
          {text: 'Button 2', variant: 'secondary-outline'},
        ]}
      />
    )

    const logoImage = getByTestId(logoImageTestId)

    expect(logoImage).toBeOnTheScreen()
  })
})
