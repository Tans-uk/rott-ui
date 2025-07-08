import {type FC} from 'react'

import type {ResultScreenParamModel} from '../models'

import {ButtonGroup} from '@features/Button'
import {Container} from '@features/Container'
import {Content} from '@features/Content'
import {EmptyState} from '@features/EmptyState'
import {Header} from '@features/Header'
import {Item} from '@features/Item'

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

interface ResultScreenProps {
  route: {
    [key: string]: any
    params: ResultScreenParamModel
  }
}

export const ResultScreen: FC<ResultScreenProps> = ({route: {params}}) => {
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
            }
          }) ?? []
        }
        isFastTransfer={isFastTransfer}
      />
    </Container>
  )
}
