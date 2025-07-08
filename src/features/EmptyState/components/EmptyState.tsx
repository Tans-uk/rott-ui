import {type FC} from 'react'

import type {EmptyStateProps} from '../models'

import {Image} from '@features/Image'
import {Item} from '@features/Item'
import {Label} from '@features/Label'

/**
 * Result - Islem Sonucu Ekrani
 *
 * @param name Image alanı
 * @param description Açıklama  alanı
 * @param title Başlık alanı

 * @returns Sonuc Ekrani Renderlanır
 *
 */

export const EmptyState: FC<EmptyStateProps> = ({
  name,
  description,
  title,
  testID,
  backgroundColor,
  width,
  height,
  imageProps,
  ...props
}) => {
  return (
    <Item
      testID={testID}
      justifyContentCenter
      alignItemsCenter
      backgroundColor={backgroundColor}
      {...props}>
      <Image
        {...imageProps}
        name={name}
        resizeMode='contain'
        width={width ?? 220}
        height={height ?? 220}
        testID='empty-state-image-test-id'
        overflowHidden
      />

      {title && (
        <Item>
          {(typeof title === 'string' || typeof title === 'object') && (
            <Label
              variant={(title as any)?.variant ?? 'white'}
              fontSize={(title as any)?.fontSize ?? 'xl'}
              fontFamily={(title as any)?.fontFamily ?? 'Markpro-Bold'}
              fontWeight={(title as any)?.fontWeight ?? 400}
              testID={(description as any)?.testID ?? 'empty-state-title-test-id'}
              textCenter
              marginBottom={8}>
              {(title as any)?.text ?? title}
            </Label>
          )}
          {title && typeof title !== 'string' && typeof title !== 'object' && <>{title}</>}
        </Item>
      )}

      {description && (
        <Item alignItemsCenter>
          {(typeof description === 'string' || typeof description === 'object') && (
            <Label
              marginBottom={8}
              variant={(description as any)?.variant ?? 'white'}
              fontSize={(description as any)?.fontSize ?? 'lg'}
              fontFamily={(description as any)?.fontFamily ?? 'Markpro-Medium'}
              fontWeight={(description as any)?.fontWeight ?? 400}
              textCenter
              testID={(description as any)?.testID ?? 'empty-state-desc-test-id'}>
              {(description as any)?.text ?? description}
            </Label>
          )}

          {description && typeof description !== 'string' && typeof description !== 'object' && (
            <>{description}</>
          )}
        </Item>
      )}
    </Item>
  )
}
