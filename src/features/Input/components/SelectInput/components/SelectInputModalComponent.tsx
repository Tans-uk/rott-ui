import {useState, type FC} from 'react'

import {ActivityIndicator} from 'react-native'

import {formatMessage} from '../../../../../libs'
import {themeConfig} from '../../../../../providers'
import {display, searchTextNormalizer} from '../../../../../utils'
import {CommonItem} from '../../../../Common'
import {Icon} from '../../../../Icon'
import {Item} from '../../../../Item'
import {List} from '../../../../List'
import {Pressable} from '../../../../Pressable'
import {DefaultInput} from '../../DefaultInput'
import {ITEM_HEIGHT, LIST_MAX_ITEM_COUNT} from '../constants'
import {type SelectInputModalComponentProps, type SelectProps} from '../models'
import {SelectInputStyles} from '../styles'
import {listHeightNormalizer, sortListBySearchPriority} from '../utils'

import {ListRenderItem} from '@shopify/flash-list'
import React from 'react'

export const SelectInputModalComponent: FC<SelectInputModalComponentProps> = ({
  searchable,
  placeholder,
  label,
  showDescription = false,
  showSelected,
  selectedItemValue,
  handleConfirmPress,
  list,
  emptyState = {
    name: 'EMPTY_LIST_ERROR',
  },
  sortByName,
  listRef,
  onViewableItemsChanged,
  name,
}) => {
  const [searchText, setSearchText] = useState<string>('')
  const normalizedSearchText = searchTextNormalizer(searchText)
  const multiSelection = selectedItemValue && typeof selectedItemValue !== 'string'

  let filteredListData = list?.filter((data) => {
    const normalizedLabel = searchTextNormalizer(data?.label || '')

    return (
      (normalizedLabel && normalizedLabel.replace(/[\s-]+/g, '-').includes(normalizedSearchText)) ||
      searchText === ''
    )
  })

  if (sortByName && filteredListData)
    filteredListData = sortListBySearchPriority(filteredListData, searchText)

  const handleClearSearch = () => setSearchText('')

  const renderItem: ListRenderItem<SelectProps> = ({item}) => {
    if (item.isLoading) {
      return (
        <ActivityIndicator
          size='small'
          color={themeConfig.colors.white}
          style={SelectInputStyles().activityIndicator}
        />
      )
    }

    return (
      <CommonItem
        testID={`select-input-item-${item.value.toSeoFriendly()}-test-id`}
        backgroundColor='grey-900'
        value={item.value}
        title={{
          text: item.label,
          variant: item.disabled ? 'grey-200' : 'white',
          numberOfLines: 1,
        }}
        subTitle={
          showDescription
            ? {
                text: item.description,
                variant: item.disabled ? 'grey-200' : 'white',
                fontSize: 'sm',
                fontFamily: 'Markpro-Medium',
                marginTop: 4,
              }
            : undefined
        }
        showSelected={showSelected}
        selectionDisabled={item.disabled}
        leftIcon={
          item.disabled ? (
            <Icon name='LOCK' height={24} width={24} variant='grey-200' strokeWidth={1.5} />
          ) : null
        }
        selectedPosition='right'
        selectedIconType={multiSelection ? 'check' : 'radio'}
        selected={
          multiSelection
            ? selectedItemValue?.includes(item.value)
            : item.value === selectedItemValue
        }
        onPress={handleConfirmPress}
      />
    )
  }

  return (
    <Item flex={1}>
      {searchable && (
        <Item row marginTop={24} marginBottom={24} paddingHorizontal={24} alignItemsCenter>
          <DefaultInput
            size='sm'
            name={name}
            testID='select-search-input-test-id'
            label={formatMessage('INPUT.DROPDOWN.SEARCH', {
              name: placeholder || label,
            })}
            paddingHorizontal={8}
            value={searchText}
            onChangeText={setSearchText}
            backgroundColor={themeConfig.colors['grey-800']}
            borderRadius={8}
            placeholderTextColor={themeConfig.colors.white}
          />

          {!searchText.isEmpty() && (
            <Pressable
              width={40}
              height={40}
              absolute
              right={24}
              testID='select-search-clear-test-id'
              justifyContentCenter
              alignItemsCenter
              onPress={handleClearSearch}>
              <Icon name='REMOVE_CIRCLE' height={24} width={24} mode='fill' variant='grey-200' />
            </Pressable>
          )}
        </Item>
      )}

      <Item flex={1}>
        <List
          flex={1}
          ref={listRef}
          testID='select-list-test-id'
          renderSeparator
          footerSeparator
          headerSeparator
          estimatedItemSize={ITEM_HEIGHT(showDescription, 72)}
          height={
            !filteredListData || filteredListData?.length === 0
              ? 355
              : listHeightNormalizer(filteredListData?.length ?? 0, showDescription, 72) +
                display.px(1)
          }
          separatorVariant='neutral-grey-alpha-200'
          data={filteredListData}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item) => item.value}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          scrollEnabled={(filteredListData?.length ?? 0) > LIST_MAX_ITEM_COUNT ? true : false}
          emptyState={{
            name: emptyState?.name ?? 'EMPTY_LIST_ERROR',
            background: emptyState?.background ?? themeConfig.colors.transparent,
            title: emptyState?.title,
            description: emptyState?.title,
          }}
        />
      </Item>
    </Item>
  )
}
