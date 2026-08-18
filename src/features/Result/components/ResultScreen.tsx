import React, {type FC} from 'react'

import {ButtonGroup} from '../../Button'
import {Container} from '../../Container'
import {Content} from '../../Content'
import {EmptyState} from '../../EmptyState'
import {Header} from '../../Header'
import {Item} from '../../Item'
import type {ResultScreenParamModel} from '../models'

/**
 * Result - Islem Sonucu Ekrani
 *
 * @param title Heading text
 * @param screensToRemove Screens to close when the result screen opens
 * @param subTitle Subheading text
 * @param actions Data list in ResultDataProps[] form
 * @param isShow The caller's show state for the Result component
 * @param onClose Called when the modal closes; use it to update the caller's state
 * @param header Custom Header Content
 * @param headerTitle Sayfa Basligi
 * @param headerLogo Sayfa Basliginda Yer Alacak Logo Name
 * @returns The rendered result screen
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
