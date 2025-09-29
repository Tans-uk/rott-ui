import {useTranslator} from '../../../libs'
import {AlertDialog} from '../../AlertDialog'
import {InputLabelProps} from '../models'

export const cvcInputLabelNormalizer = (label: InputLabelProps | string) => {
  const {translator} = useTranslator()
  const isLabelObject = typeof label === 'object'
  const isLabelText = typeof label === 'string'
  let labelText = label

  if (!!label) {
    const descriptionObject: Partial<InputLabelProps> = {
      theme: 'dark',
      description: 'CVC.LABEL.DESCRIPTION',
      icon: {
        testID: 'info-icon-test-id',
        name: 'CHECK_CIRCLE',
        width: 18,
        height: 18,
        variant: 'grey-900',
        noStroke: true,
        onPress: () => {
          AlertDialog.show({
            title: translator('CVC.INFO.TITLE'),
            text: translator('CVC.INFO.DESCRIPTION'),
            buttons: {
              cancelButton: {
                text: 'COMMON.OK',
                variant: 'primary',
                onPress: () => AlertDialog.hide(),
              },
            },
          })
        },
      },
    }

    if (isLabelObject) {
      labelText = {
        ...descriptionObject,
        ...label,
      }
    }
    if (isLabelText) {
      labelText = {
        ...descriptionObject,
        text: label,
      }
    }
  }

  return labelText as InputLabelProps
}
