/* eslint-disable react/no-unstable-nested-components */

import React, {forwardRef, isValidElement, useState, type FC, type ReactNode, type Ref} from 'react'

import {StyleSheet} from 'react-native'

import {formatMessage} from '../../../libs'
import type {CommonUiProps, Variant} from '../../../models'
import {display} from '../../../utils'
import {EmptyState, type EmptyStateProps} from '../../EmptyState'
import {Item} from '../../Item'
import {Separator} from '../../Separator'
import {ListStyles} from '../styles'
import {ListSkeletonItem} from './ListSkeletonItem'

import {FlashList, type FlashListProps} from '@shopify/flash-list'

interface ListProps<T> extends CommonUiProps, FlashListProps<T> {
  renderSeparator?: boolean
  separatorWidth?: number
  separatorHeight?: number
  separatorVariant?: Variant
  headerSeparator?: boolean
  footerSeparator?: boolean
  ref?: Ref<T> | undefined

  emptyStateContainerProps?: CommonUiProps
  emptyState?: EmptyStateProps | ReactNode | 'no-empty-state'
  isLoading?: boolean
  listSkeletonItem?: React.JSX.Element

  itemsToShow?: number
}

export const List: FC<ListProps<any>> = forwardRef(
  (
    {
      renderSeparator,
      data,
      width = '100%',
      estimatedItemSize,
      style,
      horizontal = false,
      separatorVariant = 'neutral-alpha-200',
      headerSeparator = false,
      footerSeparator = false,
      isLoading,
      emptyState,
      emptyStateContainerProps,
      renderItem,
      listSkeletonItem,
      height,
      itemsToShow,
      scrollEnabled,
      flex,
      ...props
    },
    ref
  ) => {
    const minContainerHeight = 283
    const [containerHeight, setContainerHeight] = useState(0)

    const customRenderSeparator = () => {
      return (
        <Separator
          size='full'
          orientation={!horizontal ? 'horizontal' : 'vertical'}
          variant={separatorVariant}
          width={props.separatorWidth}
          height={props.separatorHeight}
        />
      )
    }
    const defaultItemSize = 50
    const calculatedEstimatedItemSize = estimatedItemSize
      ? Math.round(estimatedItemSize)
      : defaultItemSize

    const dataType = isLoading ? Array.from(Array(estimatedItemSize).keys()) : data

    return (
      <Item
        flex={flex}
        overflowHidden
        onLayout={(e) =>
          containerHeight === 0 &&
          setContainerHeight(Math.max(minContainerHeight, e.nativeEvent.layout.height))
        }
        style={StyleSheet.flatten([
          ListStyles({
            width,
            height: itemsToShow
              ? itemsToShow * calculatedEstimatedItemSize + (renderSeparator ? itemsToShow * 1 : 0)
              : height,
            includeBorderRadius: true,
            ...props,
          }).defaultListContainerStyle,
          style,
        ])}>
        <FlashList
          data={dataType}
          ref={ref}
          ListEmptyComponent={() => (
            <>
              {!isValidElement(emptyState) && emptyState !== 'no-empty-state' && (
                <Item
                  width='full'
                  maxWidth={display.setWidth(100)} // horizontal list empty state durumda gereklidir
                  paddingVertical={16}
                  paddingHorizontal={24}
                  borderTopEndRadius={8}
                  borderTopStartRadius={8}
                  borderBottomStartRadius={8}
                  borderBottomEndRadius={8}
                  backgroundColor={
                    (emptyState as EmptyStateProps)?.backgroundColor ?? 'transparent'
                  }
                  alignItemsCenter
                  justifyContentCenter
                  style={ListStyles({containerHeight}).emptyStateContainer} // containerHeight onLayout ile okunduğu için display util'leri kullanılmadan direkt stil ile verilmiştir
                  /** TODO: opacity yerine containerHeight belirlenene kadar display: 'none' kullanılmalı.
                   * Testlerde sorun çıkardığı için şimdilik bu şekilde bırakıldı.
                   */
                  opacity={containerHeight ? 1 : 0}
                  {...emptyStateContainerProps}>
                  <EmptyState
                    width={(emptyState as EmptyStateProps)?.width ?? 182}
                    height={(emptyState as EmptyStateProps)?.height ?? 182}
                    name={(emptyState as EmptyStateProps)?.name ?? 'EMPTY_TRANSACTIONS_LIGHT'}
                    testID={(emptyState as EmptyStateProps)?.testID ?? 'list-empty-test-id'}
                    title={
                      (emptyState as EmptyStateProps)?.title ?? formatMessage('LIST.EMPTY.WARN')
                    }
                    description={(emptyState as EmptyStateProps)?.description}
                  />
                </Item>
              )}

              {isValidElement(emptyState) && emptyState}
            </>
          )}
          scrollEnabled={!isLoading && dataType?.length === 0 ? false : scrollEnabled}
          estimatedItemSize={calculatedEstimatedItemSize}
          ItemSeparatorComponent={renderSeparator ? () => customRenderSeparator() : undefined}
          ListHeaderComponent={headerSeparator ? () => customRenderSeparator() : undefined}
          ListFooterComponent={footerSeparator ? () => customRenderSeparator() : undefined}
          horizontal={horizontal}
          renderItem={
            isLoading
              ? () => {
                  return listSkeletonItem ?? <ListSkeletonItem />
                }
              : renderItem
          }
          {...props}
        />
      </Item>
    )
  }
)
