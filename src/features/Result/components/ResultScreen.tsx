import {type FC} from 'react'

import {ThemeConfig} from '../../../models'
import {ButtonGroup, type ButtonProps} from '../../Button'
import {Container} from '../../Container'
import {Content} from '../../Content'
import {EmptyState} from '../../EmptyState'
import {Header} from '../../Header'
import {Item} from '../../Item'
import type {ResultScreenParamModel} from '../models'

/**
 * Result - Islem Sonucu Ekrani
 *
 * @param title Başlık alanı
 * @param screensToRemove Sonuç ekranı açıldığında kapatılacak ekranlar
 * @param subTitle Alt başlık alanı
 * @param actions ResultDataProps[] formatında veri listesi
 * @param isShow Result komponentin bulunduğu yerdeki Show state i
 * @param onClose Modal kapatıldığında tetiklenen fonksiyondur. Komponentin kullanıldığu yerdeki state ini bu fonksiyon ile güncelleyebilirsiniz
 * @param header Custom Header Content
 * @param headerTitle Sayfa Basligi
 * @param headerLogo Sayfa Basliginda Yer Alacak Logo Name
 * @returns Sonuc Ekrani Renderlanır
 *
 */

interface ResultScreenProps<TTheme extends ThemeConfig> {
  route: {
    [key: string]: any
    params: ResultScreenParamModel<TTheme>
  }
}

export const ResultScreen: FC<ResultScreenProps<ThemeConfig>> = ({route: {params}}) => {
  const {header, state, title, description, actions, isFastTransfer} = params

  return (
    <Container noPadding testID='result-container-test-id'>
      <Header defaultBackgroundColor title={header} />

      <Content flex={1} defaultBackgroundColor>
        <Item flex={1} alignItemsCenter justifyContentCenter>
          <EmptyState
            name={state}
            description={
              description && typeof description === 'string' ? (
                description
              ) : (
                <Item alignItemsCenter marginBottom={30}>
                  {description && typeof description !== 'string' && <>{description}</>}
                </Item>
              )
            }
            title={
              title && typeof title === 'string' ? (
                title
              ) : (
                <Item>{title && typeof title !== 'string' && <>{title}</>}</Item>
              )
            }
          />
        </Item>
      </Content>

      <ButtonGroup
        defaultBackgroundColor
        buttons={
          actions?.map(({testID, title: actionButtonText, action, variant}) => {
            return {
              testID,
              variant,
              fontWeight: 600,
              onPress: () => action && action(),
              fontSize: 'xl',
              size: 'full',
              text: actionButtonText,
            } as unknown as ButtonProps<ThemeConfig>
          }) ?? []
        }
        isFastTransfer={isFastTransfer}
      />
    </Container>
  )
}
