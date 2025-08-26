import {useEffect, useState, type FC} from 'react'

import {translator} from '../../../../../libs'
import {ModalIdEnum} from '../../../../../models'
import {themeConfig} from '../../../../../providers'
import {Icon} from '../../../../Icon'
import {Item} from '../../../../Item'
import {Label} from '../../../../Label'
import {Modal, useModal} from '../../../../Modal'
import {Pressable} from '../../../../Pressable'
import {InputStyleNormalizer} from '../../../utils'
import type {SelectInputProps, SelectProps} from '../models'
import {SelectInputStyles} from '../styles'
import {modalHeightPercentageNormalizer} from '../utils'
import {SelectInputModalComponent} from './SelectInputModalComponent'
import React from 'react'

/**
 *
 * @typedef {Object} SelectProps - Secenek tipi
 * @property {string} label - Ekranda görünen etiket. ZORUNLU
 * @property {string} value - Değer. ZORUNLU
 *
 *
 * @param {SelectProps[]} selectListExample - Örnek bir seçenek listesi.

 *
 * Input prop lari
 * @param {string} defaultValue - Varsayılan olarak seçilen değerin değeri.
 * @param {function} onSelectChange - Değer değiştiğinde çağrılacak işlev.
 * @param {SelectProps[]} list - Seçenekler listesi.
 * @param {SelectProps[]} extraDisplayData - Seçeneklerde olmayan ancak yukarıdan value olarak dikte edilebilen itemlar. (Infinite scroll gibi durumlarda kullanılır)

 * @param {LegacyRef<any>} listRef - Seçenekler listesi için ref
 * @param {FlashListProps<any>["onViewableItemsChanged"] | undefined} onViewableItemsChanged - Listedeki görünür elemanlar değiştiğinde çağırılan callback

 * @param {boolean} searchable - Arama özelliğini etkinleştirme/engelleme ayarı.
 * @returns {object} Secilebilir liste renderlanir
 */
export const SelectInput: FC<SelectInputProps> = ({
  label,
  placeholder = translator('INPUT.DROPDOWN'),
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
    name: 'EMPTY_LIST_ERROR',
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
}) => {
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

  const handleItem = (selectedValue: Nullable<string>) => {
    const predicate = ({value: filterValue}: SelectProps) => filterValue === selectedValue
    const filteredItem = list?.find(predicate) ?? extraDisplayData?.find(predicate)

    // Seçilen item disabled ise çık
    if (filteredItem?.disabled) return

    if (!multiSelection) setSelectItem(filteredItem ?? null)
    else if (filteredItem) {
      if (
        selectItems?.isEmpty() ||
        selectItems?.findIndex((item) => item.value === selectedValue) === -1
      )
        setSelectItems([...selectItems, filteredItem])
      else setSelectItems(selectItems.filter((item) => item.value !== selectedValue))
    }
  }

  const handleConfirmPress = (item: Nullable<string>) => {
    if (!item) return

    if (!multiSelection) {
      onSelectChange!(item as any)
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
      onSelectChange!(tempSelectedList.map((selectedItem) => selectedItem.value) as any)
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
          name: 'CHEVRON_LEFT',
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
    else if (value && value !== selectItem?.value && !multiSelection && typeof value === 'string')
      handleItem(value)
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
        <Item
          row
          alignItemsCenter
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

          {!readOnly && <Icon name='CHEVRON_RIGHT' height={25} width={25} variant={textVariant} />}

          {readOnly && (
            <Icon
              name='ID_CARD'
              height={25}
              width={25}
              variant={theme === 'dark' ? 'white' : 'grey-200'}
            />
          )}
        </Item>

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
