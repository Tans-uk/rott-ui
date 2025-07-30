import {render} from '../../../__tests__/utils/testUtils'
import {formatMessage} from '../../../libs'
import {AlertDialogComponent} from '../components/AlertDialogComponent'
import type {AlertDialogProps} from '../models'

const mockLessThanOrEqualTwoButtons: AlertDialogProps = {
  title: formatMessage('TEST.WITH.PARAM', {testText: 'Test Title'}),
  text: formatMessage('TEST.WITH.PARAM', {testText: 'Test Text'}),
  icon: {
    name: 'QR_TRANSFER',
    width: 64,
    height: 64,
    variant: 'success',
  },
  buttons: {
    cancelButton: {
      text: 'COMMON.CANCEL',
      onPress: jest.fn(),
      variant: 'danger',
    },
    confirmButton: {
      text: 'COMMON.OK',
      onPress: jest.fn(),
      variant: 'primary',
    },
  },
  showActivityIndicator: true,
  visible: true,
  testID: 'alert-dialog-test-id',
}

const mockMoreThanTwoButtons: AlertDialogProps = {
  title: formatMessage('TEST.WITH.PARAM', {testText: 'Test Title'}),
  text: formatMessage('TEST.WITH.PARAM', {testText: 'Test Text'}),
  icon: {
    name: 'QR_TRANSFER',
    width: 64,
    height: 64,
    variant: 'success',
  },
  buttons: [
    {
      text: 'COMMON.CANCEL',
      onPress: jest.fn(),
      variant: 'danger',
    },
    {
      text: 'COMMON.OK',
      onPress: jest.fn(),
      variant: 'primary',
    },
    {
      text: 'COMMON.BACK',
      onPress: jest.fn(),
      variant: 'primary',
    },
  ],
  showActivityIndicator: true,
  visible: true,
  testID: 'alert-dialog-test-id',
}

describe('AlertDialogComponent', () => {
  const testId = {
    alertDialogTestId: 'alert-dialog-test-id',
  }

  it('should match snapshot on first render', () => {
    const {alertDialogTestId} = testId

    const renderedAlertDialog = render(
      <AlertDialogComponent visible testID={alertDialogTestId} {...mockLessThanOrEqualTwoButtons} />
    )

    expect(renderedAlertDialog.toJSON()).toMatchSnapshot()
  })

  it('title ve text ekranda düzgün şekilde renderlanmalı', () => {
    const {alertDialogTestId} = testId
    const {getByText} = render(
      <AlertDialogComponent visible testID={alertDialogTestId} {...mockLessThanOrEqualTwoButtons} />
    )

    const title = getByText(formatMessage('TEST.WITH.PARAM', {testText: 'Test Title'}), {
      exact: true,
    })
    const text = getByText(formatMessage('TEST.WITH.PARAM', {testText: 'Test Text'}), {
      exact: true,
    })

    expect(title).toBeOnTheScreen()
    expect(text).toBeOnTheScreen()
  })

  it('iki button tanımlı ise alert dialog doğru renderlanmalı', () => {
    const {alertDialogTestId} = testId
    const {getByText} = render(
      <AlertDialogComponent visible testID={alertDialogTestId} {...mockLessThanOrEqualTwoButtons} />
    )

    const confirmButton = getByText(formatMessage('COMMON.OK'))
    const cancelButton = getByText(formatMessage('COMMON.CANCEL'))

    expect(confirmButton).toBeOnTheScreen()
    expect(cancelButton).toBeOnTheScreen()
  })

  it('iki veya daha fazla button tanımlı ise alert dialog doğru renderlanmalı', () => {
    const {alertDialogTestId} = testId
    const {getByText} = render(
      <AlertDialogComponent visible testID={alertDialogTestId} {...mockMoreThanTwoButtons} />
    )

    const confirmButton = getByText(formatMessage('COMMON.OK'))
    const cancelButton = getByText(formatMessage('COMMON.CANCEL'))
    const backButton = getByText(formatMessage('COMMON.BACK'))

    expect(confirmButton).toBeOnTheScreen()
    expect(cancelButton).toBeOnTheScreen()
    expect(backButton).toBeOnTheScreen()
  })
})
