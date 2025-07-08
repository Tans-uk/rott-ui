import {type FC} from 'react'

import {Icon} from '@features/Icon'
import {Item} from '@features/Item'
import {Label} from '@features/Label'
import {Pressable} from '@features/Pressable'
import {formatMessage} from '@libs'
import {themeConfig} from '@providers'

interface FavoriteSwipeComponentProps {
  index: number
  favorite: boolean
  handleFavoriteChange: (itemIndex: number, itemFavorite: boolean) => void | undefined
}

export const FavoriteSwipeComponent: FC<FavoriteSwipeComponentProps> = ({
  index,
  favorite,
  handleFavoriteChange,
}) => (
  <Item row width={48}>
    <Pressable
      alignItemsCenter
      justifyContentCenter
      backgroundColor={favorite ? themeConfig.colors.danger : themeConfig.colors.secondary}
      onPress={() => handleFavoriteChange && handleFavoriteChange!(index, !favorite)}>
      <Icon
        width={16}
        height={16}
        name={favorite ? 'STAR_FILL' : 'STAR'}
        variant={favorite ? 'secondary' : 'info'}
      />

      <Label
        textCenter
        color={favorite ? themeConfig.colors.white : themeConfig.colors.black}
        fontSize={8}
        marginTop={4}>
        {formatMessage(favorite ? 'LIST.ITEM.FAVORITE.REMOVE' : 'LIST.ITEM.FAVORITE.ADD')}
      </Label>
    </Pressable>
  </Item>
)
