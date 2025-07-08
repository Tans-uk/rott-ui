/* eslint-disable react-native/no-inline-styles */
import {memo} from 'react'

import {Item} from '@features/Item'

export const ListSkeletonItem = memo(() => {
  return (
    <Item row paddingHorizontal={8} paddingVertical={8} backgroundColor='white'>
      <Item
        skeletonShow
        skeletonStyle={{
          width: 55,
          height: 71,
        }}
      />

      <Item marginLeft={8} gap={8}>
        <Item
          width={223}
          skeletonShow
          skeletonStyle={{
            width: 223,
            height: 16,
          }}
        />

        <Item
          width={223}
          skeletonShow
          skeletonStyle={{
            width: 160,
            height: 16,
          }}
        />

        <Item
          width={223}
          skeletonShow
          skeletonStyle={{
            width: 80,
            height: 16,
          }}
        />
      </Item>
    </Item>
  )
})
