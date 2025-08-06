import {useContext, type FC} from 'react'

import {RottUiContext} from '../../../contexts'
import {formatMessage} from '../../../libs'
import {Icon} from '../../Icon'
import {Item} from '../../Item'
import {Label} from '../../Label'
import {Pressable} from '../../Pressable'

interface FavoriteSwipeComponentProps {
  index: number
  favorite: boolean
  handleFavoriteChange: (itemIndex: number, itemFavorite: boolean) => void | undefined
}

export const FavoriteSwipeComponent: FC<FavoriteSwipeComponentProps> = ({
  index,
  favorite,
  handleFavoriteChange,
}) => {
  const {colors} = useContext(RottUiContext)

  return (
    <Item row width={48}>
      <Pressable
        alignItemsCenter
        justifyContentCenter
        backgroundColor={favorite ? colors.danger : colors.secondary}
        onPress={() => handleFavoriteChange && handleFavoriteChange!(index, !favorite)}>
        <Icon
          width={16}
          height={16}
          name={favorite ? 'STAR_FILL' : 'STAR'}
          variant={favorite ? 'secondary' : 'info'}
        />

        <Label
          textCenter
          color={favorite ? colors.white : colors.black}
          fontSize={'8'}
          marginTop={4}>
          {formatMessage(favorite ? 'LIST.ITEM.FAVORITE.REMOVE' : 'LIST.ITEM.FAVORITE.ADD')}
        </Label>
      </Pressable>
    </Item>
  )
}
