/* eslint-disable react-native/no-inline-styles */
import React, {memo, type FC} from 'react'

import {themeConfig} from '../../../providers'
import {Item} from '../../Item'
import {Separator} from '../../Separator'
import type {InputLabelProps, InputProps} from '../models'
import {cvcInputLabelNormalizer} from '../utils/cvcInputLabelNormalizer'
import {AmountInput} from './AmountInput/components/AmountInput'
import {CheckBoxInput} from './CheckBoxInput'
import {CreditCardInput} from './CreditCardInput'
import {CVCInput} from './CVCInput'
import {DateInput} from './DateInput'
import {DefaultInput} from './DefaultInput'
import {EmailInput} from './EmailInput'
import {ExpireDateInput} from './ExpireDateInput'
import {IbanInput} from './IbanInput'
import {InputLabel} from './InputLabel'
import {InputValidation} from './InputValidation'
import {NumericInput} from './NumericInput'
import {PasswordInput} from './PasswordInput'
import {PhoneInput} from './PhoneInput'
import {PinPasswordInput} from './PinPasswordInput'
import {PlateNumberInput} from './PlateNumberInput'
import {SelectInput} from './SelectInput'
import {StatementInput} from './StatementInput'
import {ToggleInput} from './ToggleInput'

export const Input: FC<InputProps> = memo((props) => {
  const {
    label,
    type,
    renderSeparator = true,
    size = 'full',
    errorMessage,
    disabled,
    theme = 'light',
    touched = null,
    name,
    placeholderTextColor = theme === 'light'
      ? themeConfig.colors['grey-200']
      : themeConfig.colors.white,
    maxFontSizeMultiplier = 1.2,
    leftIcon,
    rightIcon,
    gap,
  } = props
  const hasError = !!props?.onBlur && !!touched && !!errorMessage

  const getInputElement = () => {
    const initializedProps = {
      renderSeparator,
      size,
      theme,
      touched,
      placeholderTextColor,
      maxFontSizeMultiplier,
      leftIcon,
      rightIcon,
    }

    switch (type) {
      case 'default':
        return <DefaultInput {...initializedProps} {...props} />

      case 'cvc':
        return <CVCInput {...initializedProps} {...props} />

      case 'expireDate':
        return <ExpireDateInput {...initializedProps} {...props} />

      case 'numeric':
        return <NumericInput {...initializedProps} {...props} />

      case 'password':
        return <PasswordInput {...initializedProps} {...props} />

      case 'iban':
        return <IbanInput {...initializedProps} {...props} />

      case 'phone':
        return <PhoneInput {...initializedProps} {...props} />

      case 'email':
        return <EmailInput {...initializedProps} {...props} />

      case 'creditCard':
        return <CreditCardInput {...initializedProps} {...props} />

      case 'pinPassword':
        return <PinPasswordInput {...initializedProps} {...props} />

      case 'plateNumber':
        return <PlateNumberInput {...initializedProps} {...props} />

      case 'amount':
        return <AmountInput {...initializedProps} {...props} />

      case 'date':
        return <DateInput {...initializedProps} {...props} />

      case 'checkbox':
        return <CheckBoxInput {...initializedProps} {...props} />

      case 'select':
      case 'multiSelect':
        return <SelectInput {...initializedProps} {...props} />

      case 'toggle':
        return <ToggleInput {...initializedProps} {...props} />

      case 'statement':
        return <StatementInput {...initializedProps} {...props} />

      default:
        return
    }
  }

  let labelProps: Partial<InputLabelProps> = {}
  if (typeof label === 'string') {
    labelProps = {text: label}
  } else if (!!label) {
    if (type === 'cvc') {
      console.info('label - 1', label)
      labelProps = cvcInputLabelNormalizer(label)
    } else {
      labelProps = label
    }
  }

  return (
    <Item>
      <Item paddingTop={label && type !== 'toggle' ? 16 : 0} opacity={disabled ? 0.3 : 1} gap={gap}>
        {label && type !== 'toggle' && <InputLabel {...(labelProps as InputLabelProps)} />}

        {getInputElement()}
      </Item>

      {hasError && !!errorMessage && <InputValidation name={name} message={errorMessage} />}

      {!hasError && renderSeparator && (
        <Separator size='full' orientation='horizontal' variant='neutral-alpha-200' />
      )}
    </Item>
  )
})
