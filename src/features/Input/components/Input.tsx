/* eslint-disable react-native/no-inline-styles */
import {memo, type FC} from 'react'

import type {InputProps} from '../models'
import {InputStyles} from '../styles'
import {InputStyleNormalizer} from '../utils'
import {AmountInput} from './AmountInput/components/AmountInput'
import {CheckBoxInput} from './CheckBoxInput'
import {CreditCardInput} from './CreditCardInput'
import {CVCInput} from './CVCInput'
import {DateInput} from './DateInput'
import {DefaultInput} from './DefaultInput'
import {EmailInput} from './EmailInput'
import {ExpireDateInput} from './ExpireDateInput'
import {IbanInput} from './IbanInput'
import {InputValidation} from './InputValidation'
import {NumericInput} from './NumericInput'
import {PasswordInput} from './PasswordInput'
import {PhoneInput} from './PhoneInput'
import {PinPasswordInput} from './PinPasswordInput'
import {PlateNumberInput} from './PlateNumberInput'
import {SelectInput} from './SelectInput'
import {StatementInput} from './StatementInput'
import {ToggleInput} from './ToggleInput'

import {Icon, Item, Label, Pressable, Separator} from '@features'
import {themeConfig} from '@providers'
import {colorFromVariant, getLanguageState, useAppSelector} from '@utils'

export const Input: FC<InputProps> = memo((props) => {
  const {
    label,
    type,
    renderSeparator = true,
    size = 'md',
    errorMessage,
    disabled,
    theme = 'light',
    border,
    touched = null,
    name,
    placeholderTextColor = theme === 'light'
      ? themeConfig.colors['grey-200']
      : themeConfig.colors.white,
  } = props
  const appLanguage = useAppSelector(getLanguageState)
  const hasError = !!props?.onBlur && !!touched && !!errorMessage

  const getInputElement = () => {
    const initializedProps = {renderSeparator, size, theme, touched, placeholderTextColor}

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

  const isLabelObject = typeof label === 'object'
  const variantCalculation = () => {
    if (isLabelObject && label?.icon?.variant) return label?.icon?.variant
    else if (
      (isLabelObject && label.theme && label.theme === 'dark') ||
      (theme && theme === 'dark')
    )
      return 'grey-900'
    else if (disabled) return 'grey-900'
    else return 'grey-200'
  }
  const variant = variantCalculation()

  return (
    <Item>
      <Item
        paddingTop={label && type !== 'toggle' ? 16 : 0}
        style={InputStyles({disabled}).textInputContainer}>
        {label && type !== 'toggle' && (
          <Item
            row
            paddingHorizontal={InputStyleNormalizer({size: size}).paddingHorizontal}
            alignItemsCenter>
            <Label
              testID='input-label-test-id'
              fontSize={isLabelObject && label.size ? label.size : 'xs'}
              fontFamily={isLabelObject && label.fontFamily ? label.fontFamily : 'Markpro-Bold'}
              style={{letterSpacing: 0.5}}
              variant={
                isLabelObject
                  ? (label.variant ?? (label.theme === 'dark' ? 'grey-900' : 'grey-200'))
                  : theme === 'dark'
                    ? 'grey-200'
                    : 'grey-900'
              }>
              {typeof label === 'string'
                ? label?.toLocaleUpperCase(appLanguage?.name)
                : label.text?.toLocaleUpperCase(appLanguage?.name)}
            </Label>

            {isLabelObject && label.description && (
              <Label
                testID='input-label-description-test-id'
                fontSize={label.descriptionSize ?? 'xs'}
                fontFamily={label.fontFamily ?? 'Markpro-Medium'}
                variant={label.descriptionVariant ?? 'grey-200'}
                marginLeft={4}>
                {`(${label.description?.toLocaleUpperCase(appLanguage?.name)})`}
              </Label>
            )}

            {((isLabelObject && label.icon) || disabled) && (
              <Pressable
                testID='input-label-description-icon-test-id'
                flex={0}
                disabled={disabled}
                width={isLabelObject ? label?.icon?.width && label.icon.width + 4 : 22}
                height={isLabelObject ? label?.icon?.height && label.icon.height + 4 : 22}
                justifyContentCenter
                alignItemsCenter
                onPress={isLabelObject ? label?.icon?.onPress : null}>
                <Icon
                  name={isLabelObject ? (label?.icon?.name as any) : ('LOCK' as any)}
                  width={isLabelObject ? label?.icon?.width : 18}
                  height={isLabelObject ? label?.icon?.height : 18}
                  variant={variant}
                  mode={isLabelObject ? label?.icon?.mode : 'stroke'}
                  strokeWidth={isLabelObject ? label?.icon?.strokeWidth : 2}
                  noStroke={isLabelObject ? label?.icon?.noStroke : false}
                />
              </Pressable>
            )}
          </Item>
        )}

        <Item
          paddingHorizontal={type !== 'toggle' ? 16 : 0}
          borderWidth={border?.width}
          borderRadius={border?.radius}
          borderColor={colorFromVariant(border?.variant)}
          backgroundColor={
            theme === 'light' ? themeConfig.colors.white : themeConfig.colors['grey-800']
          }>
          {getInputElement()}
        </Item>
      </Item>

      {hasError && !!errorMessage && <InputValidation name={name} message={errorMessage} />}

      {!hasError && renderSeparator && (
        <Separator size='full' orientation='horizontal' variant='neutral-alpha-200' />
      )}
    </Item>
  )
})
