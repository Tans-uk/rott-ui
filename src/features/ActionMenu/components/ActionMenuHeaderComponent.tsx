import {type FC} from 'react'

import {themeConfig} from '../../../providers'
import {Item} from '../../Item'
import {Label} from '../../Label'

interface ActionMenuHeaderProps {
  title?: Nullable<string>
  subTitle?: Nullable<string>
}

export const ActionMenuHeaderComponent: FC<ActionMenuHeaderProps> = ({title, subTitle}) => {
  return (
    <Item size='full' alignItemsCenter>
      <Item testID='action-menu-header-test-id' width={342}>
        {(title || subTitle) && (
          <Item
            justifyContentCenter
            alignItemsCenter
            size='full'
            backgroundColor={themeConfig.colors['grey-100']}
            borderTopStartRadius={12}
            borderTopEndRadius={12}
            height={54}>
            {title && (
              <Label
                fontSize='xl'
                variant='grey-900'
                fontWeight={700}
                marginBottom={subTitle ? 4 : undefined}>
                {title}
              </Label>
            )}

            {subTitle && (
              <Label fontSize='sm' variant='grey-900' fontWeight={500}>
                {subTitle}
              </Label>
            )}
          </Item>
        )}
      </Item>
    </Item>
  )
}
