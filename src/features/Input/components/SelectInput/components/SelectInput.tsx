import React, {useEffect, useState, type FC} from 'react'

import {formatMessage, useTranslator} from '../../../../../libs'
import {ModalIdEnum} from '../../../../../models'
import {themeConfig} from '../../../../../providers'
import {Item} from '../../../../Item'
import {Label} from '../../../../Label'
import {Modal, useModal} from '../../../../Modal'
import {Pressable} from '../../../../Pressable'
import {InputStyleNormalizer} from '../../../utils'
import {InputField} from '../../InputField'
import type {SelectInputProps, SelectProps} from '../models'
import {SelectInputStyles} from '../styles'
import {modalHeightPercentageNormalizer} from '../utils'
import {SelectInputModalComponent} from './SelectInputModalComponent'

/**
 *
 * @typedef {Object} SelectProps - Secenek tipi
 * @property {string} label - Label shown on screen. REQUIRED
 * @property {string} value - Option value. REQUIRED
 *
 *
 * @param {SelectProps[]} selectListExample - An example option list.

 *
 * Input prop lari
 * @param {string} defaultValue - Value selected by default.
 * @param {function} onSelectChange - Called when the selected value changes.
 * @param {SelectProps[]} list - The list of options.
 * @param {SelectProps[]} extraDisplayData - Items absent from `list` but still assignable as a value from above, for cases such as infinite scroll.

 * @param {LegacyRef<any>} listRef - Ref for the option list
 * @param {FlashListProps<any>["onViewableItemsChanged"] | undefined} onViewableItemsChanged - Called when the set of visible list items changes

 * @param {boolean} searchable - Enables or disables search.
 * @returns {object} Secilebilir liste renderlanir
 */
export const SelectInput: FC<SelectInputProps> = ({
  label,
  placeholder = formatMessage('INPUT.DROPDOWN'),
  onSelectChange,
  searchable = false,
  value,
  defaultValue,
  testID,
  list,
  listRef,
  size,
  theme,
  disabled,
  description = false,
  fontSize,
  descriptionFontSize,
  showSelected = false,
  showDescription = false,
  emptyState = {
    name: 'list-error-empty-state',
  },
  readOnly,
  onTouched,
  sortByName,
  onViewableItemsChanged,
  extraDisplayData,
  modalId,
  isLoading,
  name,
  type = 'select',
  leftIcon,
  rightIcon,
}) => {
  const {translator} = useTranslator()

  const isArray = Array.isArray(defaultValue)
  const [selectItem, setSelectItem] = useState<Nullable<SelectProps>>(null)
  const [selectItems, setSelectItems] = useState<SelectProps[]>([])
  const multiSelection = type === 'multiSelect'

  const textVariant =
    theme === 'dark'
      ? 'white'
      : (!multiSelection && selectItem) || (multiSelection && selectItems.length > 0)
        ? 'grey-900'
        : 'grey-200'

  const trailingIcon = readOnly
    ? {
        name: 'id-card' as any,
        height: 25,
        width: 25,
        variant: (theme === 'dark' ? 'white' : 'grey-200') as any,
        ...rightIcon,
      }
    : {
        name: 'chevron-right' as any,
        height: 25,
        width: 25,
        variant: textVariant as any,
        ...rightIcon,
      }

  const handleItem = (selectedValue: Nullable<string>) => {
    const predicate = ({value: filterValue}: SelectProps) => filterValue === selectedValue
    const filteredItem = list?.find(predicate) ?? extraDisplayData?.find(predicate)

    // Bail out if the selected item is disabled
    if (filteredItem?.disabled) return

    if (!multiSelection) setSelectItem(filteredItem ?? null)
    else if (filteredItem) {
      if (
        selectItems?.isEmpty() ||
        selectItems?.findIndex((item) => item.value === selectedValue) === -1
      ) {
        setSelectItems([...selectItems, filteredItem])
      } else setSelectItems(selectItems.filter((item) => item.value !== selectedValue))
    }
  }

  const handleConfirmPress = (item: Nullable<string>) => {
    if (!item) return

    if (!multiSelection) {
      onSelectChange?.(item as any)
      handleItem(item)
      Modal.hideModal(modalId ?? ModalIdEnum.SelectInput)
    } else {
      let tempSelectedList: SelectProps[] = [...selectItems]
      const index = tempSelectedList.findIndex((i) => i.value === item)
      if (index === -1) {
        tempSelectedList.push({
          value: item,
          label: item,
          description: '',
          isLoading: false,
        })
      } else tempSelectedList.splice(index, 1)
      onSelectChange?.(tempSelectedList.map((selectedItem) => selectedItem.value) as any)
      setSelectItems(tempSelectedList)
    }
  }

  const handleSelectInputModal = () => {
    if (disabled || readOnly || isLoading) return
    !!onTouched && onTouched()
    showModal()
  }

  const {showModal} = useModal(
    {
      id: modalId ?? ModalIdEnum.SelectInput,
      backgroundColor: themeConfig.colors['grey-900'],
      testID: 'select-modal-test-id',
      visible: true,
      slideToClose: true,
      sticksToKeyboard: searchable,
      height:
        list?.length === 0
          ? 55
          : modalHeightPercentageNormalizer(list?.length ?? 50, searchable, showDescription, 72),
      closeButton: false,
      headerBackgroundColor: 'grey-900',
      panResponderBackgroundColor: 'grey-900',
      header: {
        height: 40,
        title: placeholder,
        marginBottom: searchable ? 0 : 16,
        leftIcon: {
          name: 'chevron-left',
          mode: 'stroke',
          width: 24,
          height: 24,
          strokeWidth: 2,
          rounded: true,
          backgroundColor: themeConfig.colors['grey-800'],
          borderColor: themeConfig.colors.primary,
          alignItemsCenter: true,
          onPress: () => {
            Modal.hideModal(modalId ?? ModalIdEnum.SelectInput)
          },
        },
      },
      children: (
        <SelectInputModalComponent
          name={name}
          list={list}
          listRef={listRef}
          label={label}
          placeholder={placeholder}
          searchable={searchable}
          showDescription={showDescription}
          showSelected={showSelected}
          selectedItemValue={
            multiSelection
              ? selectItems.map((item) => {
                  return item.value
                })
              : selectItem?.value
          }
          handleConfirmPress={handleConfirmPress}
          emptyState={emptyState}
          sortByName={sortByName}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      ),
      onClose: () => {
        Modal.hideModal(modalId ?? ModalIdEnum.SelectInput)
      },
    },
    [list, selectItem, selectItems]
  )

  useEffect(() => {
    if (defaultValue && !multiSelection) handleItem(defaultValue as string)
    else if (defaultValue && multiSelection && isArray) {
      const selectedItemsToSet = defaultValue.map((item) => ({
        value: item,
        label: item,
        description: '',
        isLoading: false,
      }))

      setSelectItems(selectedItemsToSet)
    } else handleItem(null)
  }, [extraDisplayData])

  useEffect(() => {
    if (!value) handleItem(null)
    else if (value && value !== selectItem?.value && !multiSelection && typeof value === 'string') {
      handleItem(value)
    }
  }, [value, extraDisplayData])

  return (
    <Item testID={testID}>
      <Pressable
        testID='select-input-selection-test-id'
        size='full'
        flex={0}
        alignItemsCenter
        justifyContentCenter
        marginBottom={description || selectItem?.description ? 8 : undefined}
        onPress={handleSelectInputModal}>
        <InputField size={size} leftIcon={leftIcon} rightIcon={trailingIcon}>
          <Item
            row
            alignItemsCenter
            size='full'
            height={
              InputStyleNormalizer({size}).height - (selectItem?.description || description ? 8 : 0)
            }>
            <Label
              testID='select-input-selected-item-test-id'
              fontSize={fontSize ?? InputStyleNormalizer({size}).placeholderSize}
              fontFamily='Markpro-Medium'
              variant={textVariant}
              style={SelectInputStyles().pressableTextStyle}
              numberOfLines={1}>
              {!multiSelection && (selectItem ? selectItem?.label : (placeholder ?? label))}
              {multiSelection &&
                (selectItems.length > 0
                  ? translator('COMMON.SELECTED.ITEMS', {
                      count: selectItems.length,
                    })
                  : (placeholder ?? label))}
            </Label>
          </Item>
        </InputField>

        {(description || selectItem?.description) && (
          <Item size='full' justifyContentFlexStart>
            <Label
              testID='selected-description-test-id'
              fontSize={
                descriptionFontSize ?? fontSize ?? InputStyleNormalizer({size}).placeholderSize
              }
              fontFamily='Markpro-Medium'
              variant={textVariant}>
              {selectItem?.description ?? description}
            </Label>
          </Item>
        )}
      </Pressable>
    </Item>
  )
}
