// React Imports
import {useContext, useEffect, useRef, type FC} from 'react'

import {StyleSheet} from 'react-native'

import {RottUiContext} from '../../../../../contexts'
import {useDisplay} from '../../../../../hooks'
import {formatMessage} from '../../../../../libs'
import {ModalIdEnum, ThemeConfig} from '../../../../../models'
import {Button} from '../../../../Button'
import {Icon} from '../../../../Icon'
import {Item} from '../../../../Item'
import {Label} from '../../../../Label'
import {List} from '../../../../List'
import {Modal, useModal} from '../../../../Modal'
import {Pressable} from '../../../../Pressable'
import {Separator} from '../../../../Separator'
import {DateInputStyles, useInputStyles} from '../../../styles'
import {formatByDateMode, useInputStyleNormalizer} from '../../../utils'
import type {DataModel, DateInputProps} from '../models'

import {startOfDay} from 'date-fns'

import DatePicker from 'react-native-date-picker'

/**
 *
 * DateInput'un kullanımı diğer inputlara göre biraz daha farklı.
 * Yapısı gereği diğer inputlarda kullandığımız "onChangeText" event'i ile değişen değeri almamız mümkün olmadığı için
 * formik'in içinde yer alan "setFieldValue" metodunu kullanmamız gerek.
 *
 * ### **Örnek**:
 *   <Input
      label='Date Deneme'
      name='order-date'
      onDateChange={(date) => setFieldValue('orderDate', date)}
      type='date'
      mode='modal-date'
      value={orderDate}
      data={[
        {
          label: 'Bugün',
          value: new Date(),
        },
        {
          label: 'Yarın',
          value: add(new Date(), {days: 1}),
        },
      ]}
    />
 *
 * @property {(date: Date) => void)} onDateChange: seçilen tarih değerini almak içim bu property'nin kullanılması gerekmektedir.
 * @property {'date' | 'time' | 'datetime'} mode: İstenilen mod neyse ona göre belirtilmelidir. Default değer datetime olarak ayarlanmıştır.
 * @property {boolean} dontAllowClearing: Eğer date input'un değerinin temizlenmesine izin verilmemesi gerekiyorsa bu propert kullanılmalıdır.
 * dontAllowClearing={true} yerine sadece downAllowClearing olarak verirseniz değer otomatik olarak true kabul edilir. False olmadığı durumlarda
 * lütfen ={true} şeklinde tanımlama yapmayınız.
 */
let externalDate = new Date()
export const DateInput: FC<DateInputProps<ThemeConfig>> = ({
  placeholder = 'Lütfen bir tarih seçiniz',
  onDateChange,
  mode = 'date',
  allowClear = false,
  minimumDate,
  maximumDate,
  value,
  testID,
  theme,
  data,
  disabled,
  size,
  viewType = 'input',
  ...props
}) => {
  const {colors} = useContext(RottUiContext)
  const selectedItem = useRef<DataModel>(undefined)
  const {defaultTextInputStyle} = useInputStyles({theme, size, includeBorderRadius: true, ...props})
  const {setHeight} = useDisplay()
  const handleConfirmPress = (date?: Date | DataModel) => {
    let validDate: Date

    const isDataModel = date && 'label' in date
    const selectedDate = isDataModel ? date.value : date

    if (
      minimumDate &&
      (selectedDate ? selectedDate.getTime() : externalDate.getTime()) < minimumDate?.getTime()
    )
      validDate = minimumDate
    else if (
      maximumDate &&
      (selectedDate ? selectedDate.getTime() : externalDate.getTime()) > maximumDate?.getTime()
    )
      validDate = maximumDate
    else validDate = selectedDate ?? externalDate

    validDate = mode.includes('time') ? validDate : startOfDay(validDate)

    onDateChange!(validDate)
    selectedItem.current = isDataModel ? {...date, value: validDate} : {label: '', value: validDate}
    Modal.hideModal(ModalIdEnum.NativeDatePicker)
  }

  const handleClearPress = () => {
    Modal.hideModal()
    externalDate = new Date()
    onDateChange!(null as any)
  }

  const isSameDay = (date1: Date, date2: Date) =>
    date1?.getDate() === date2?.getDate() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getFullYear() === date2?.getFullYear()

  const isSelected = (item: DataModel) => {
    if (!item.value || !value) return
    const valueAsDate = new Date(value)

    if (!selectedItem.current) return isSameDay(item.value, valueAsDate)

    return isSameDay(item.value, valueAsDate) && selectedItem.current.label === item.label
  }

  const modalHeightCalculator = (dataCount?: number) => {
    if (dataCount === 0 || !dataCount) return 30

    const headerHeightInPercentage = 12.1 // 102 / 8.44
    const dataHeight = (dataCount + 2) * 52 // +1 for the default date picker item
    const calculatedModalHeightPercentage = dataHeight / 8.44 + headerHeightInPercentage

    return calculatedModalHeightPercentage >= 100 ? 100 : calculatedModalHeightPercentage
  }
  const {showModal: showNativeDatePicker, hideModal} = useModal(
    {
      id: ModalIdEnum.NativeDatePicker,
      testID: 'date-input-modal',
      visible: true,
      height: modalHeightCalculator(),
      onClose: () => {
        hideModal(ModalIdEnum.NativeDatePicker)
      },
      disableOutsideClick: false,
      backgroundColor: colors.white,
      header: (
        <Item
          justifyContentCenter
          backgroundColor={colors['grey-900']}
          height={50}
          style={DateInputStyles().dateInputHeaderStyle}>
          <Pressable
            testID='date-input-confirm-button'
            onPress={() => handleConfirmPress()}
            text={formatMessage('COMMON.OK')}
            textVariant='white'
            textSize='xl'
            textWeight={'700'}
            style={DateInputStyles().confirmButtonStyle}
          />

          {allowClear && value && (
            <Pressable
              testID='date-input-clear-button'
              onPress={handleClearPress}
              text={formatMessage('COMMON.CLEAR')}
              textVariant='white'
              textSize='xl'
              textWeight={'700'}
              style={DateInputStyles().cancelButtonStyle}
            />
          )}
        </Item>
      ),
      children: (
        <Item size='full' alignItemsCenter justifyContentCenter backgroundColor='white'>
          <DatePicker
            testID={testID ?? 'date-input-test-id'}
            mode={mode?.replace('modal-', '') as any}
            date={value ? new Date(value) : new Date()}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            theme='light'
            onDateChange={(date) => (externalDate = date)}
            {...props}
          />
        </Item>
      ),
    },
    []
  )
  const {showModal} = useModal()

  const showModalDatePicker = () =>
    showModal({
      id: ModalIdEnum.DatePickerModal,
      testID: 'date-input-modal-picker-test-id',
      visible: true,
      height: modalHeightCalculator(data?.length),
      slideToClose: true,
      closeButton: false,
      onClose: () => hideModal(ModalIdEnum.DatePickerModal),
      headerBackgroundColor: 'grey-900',
      panResponderBackgroundColor: 'grey-900',
      backgroundColor: colors['grey-900'],
      header: {
        height: 40,
        leftIcon: {
          testID: 'cancel-button-test-id',
          name: 'CHEVRON_LEFT',
          mode: 'stroke',
          width: 24,
          height: 24,
          strokeWidth: 2,
          backgroundColor: colors['grey-800'],
          borderColor: colors.primary,
          borderRadius: 24,
          alignItemsCenter: true,
          onPress: () => hideModal(ModalIdEnum.DatePickerModal),
        },
        title: formatMessage('COMMON.TRANSACTION.DATE'),
      },
      children: (
        <Item paddingTop={16} flex={1} backgroundColor={colors['grey-900']}>
          <Separator width='full' height={1} backgroundColor={colors['neutral-grey-alpha-200']} />
          <List
            height={setHeight(modalHeightCalculator(data?.length))}
            data={
              data
                ? [
                    ...data,
                    {
                      hideRightIcon: true,
                      label: formatMessage('COMMON.SELECT.DATE'),
                      action: () => {
                        hideModal(ModalIdEnum.DatePickerModal)
                        showNativeDatePicker()
                      },
                    },
                  ]
                : []
            }
            renderItem={({item}) => {
              const selected = isSelected(item)

              return (
                <>
                  <Pressable
                    testID='date-input-modal-picker-item-test-id'
                    onPress={() => {
                      if (item.value) {
                        externalDate = item.value
                        handleConfirmPress(item)
                        Modal.hideModal()
                      } else item.action()
                    }}
                    height={52}
                    justifyContentCenter
                    paddingHorizontal={24}>
                    <Item row size='full' relative alignItemsCenter>
                      <Label variant='white' fontSize='lg' fontFamily='Markpro-Medium'>
                        {item.label}
                      </Label>

                      {!item.hideRightIcon && (
                        <Item
                          width={24}
                          height={24}
                          borderRadius={24}
                          borderWidth={2}
                          borderColor={selected ? colors.primary : colors['grey-200']}
                          justifyContentCenter
                          alignItemsCenter
                          absolute
                          right={0}>
                          {selected && (
                            <Item
                              width={16}
                              height={16}
                              borderRadius={16}
                              backgroundColor={colors.primary}
                              // eslint-disable-next-line react-native/no-inline-styles
                              style={{
                                shadowColor: colors['neutral-blue-soft'],
                                shadowOffset: {
                                  width: 0,
                                  height: 0,
                                },
                                shadowOpacity: 1,
                                shadowRadius: 1,
                                borderWidth: 2,
                                borderColor: colors['neutral-blue-soft'],
                              }}
                            />
                          )}
                        </Item>
                      )}
                    </Item>
                  </Pressable>
                  <Separator
                    width='full'
                    height={1}
                    backgroundColor={colors['neutral-grey-alpha-200']}
                  />
                </>
              )
            }}
          />
        </Item>
      ),
    })

  useEffect(() => {
    externalDate = new Date(value ? new Date(value) : new Date())

    if (value) handleConfirmPress(externalDate)

    return () => {
      externalDate = new Date()
    }
  }, [])

  return (
    <>
      {viewType === 'input' && (
        <Item row>
          <Pressable
            size='full'
            height={useInputStyleNormalizer({size}).height}
            testID={testID ?? 'date-input-value-container'}
            flex={0}
            justifyContentCenter
            textSize='lg'
            text={
              data && value
                ? (data.find((item) => {
                    return isSelected(item)
                  })?.label ??
                  formatByDateMode(
                    mode.replace('modal-', '') as 'date' | 'time' | 'datetime',
                    value
                  ))
                : value
                  ? formatByDateMode(mode, value)
                  : placeholder
            }
            textStyle={DateInputStyles().pressableTextStyle}
            style={StyleSheet.flatten([defaultTextInputStyle])}
            textVariant={theme === 'dark' ? 'white' : value ? 'grey-900' : 'grey-200'}
            onPress={() => {
              if (disabled) return

              mode.includes('modal') ? showModalDatePicker() : showNativeDatePicker()
            }}
          />

          <Pressable
            onPress={() => {
              if (disabled) return

              mode.includes('modal') ? showModalDatePicker() : showNativeDatePicker()
            }}>
            <Item absolute right={0} bottom={useInputStyleNormalizer({size}).icon.paddingBottom}>
              <Icon
                name='CALENDAR'
                width={useInputStyleNormalizer({size}).icon.width}
                height={useInputStyleNormalizer({size}).icon.height}
                color={colors['grey-200']}
                mode='stroke'
                strokeWidth={2}
              />
            </Item>
          </Pressable>
        </Item>
      )}

      {viewType === 'button' && (
        <Button
          testID={testID ?? 'date-input-test-id'}
          size={{height: props?.height ?? 'md'}}
          leftIcon={{
            name: props.icon?.name ?? 'CALENDAR',
            width: 20,
            height: 20,
            strokeWidth: 1.5,
          }}
          onPress={() => {
            !disabled && mode.includes('modal') ? showModalDatePicker() : showNativeDatePicker()
          }}>
          {data && value
            ? (data.find((item) => {
                return isSelected(item)
              })?.label ??
              formatByDateMode(mode.replace('modal-', '') as 'date' | 'time' | 'datetime', value))
            : value
              ? formatByDateMode(mode, value)
              : placeholder}
        </Button>
      )}
    </>
  )
}
