import React, {memo} from 'react'

import {render} from '../../../__tests__/utils/testUtils'
import en from '../../../libs/i18n/en-US.json'
import tr from '../../../libs/i18n/tr-TR.json'
import {setActiveLanguage} from '../../../libs/i18n/utils/activeLanguage'
import {RottProvider} from '../../../providers/RottProvider'
import {FavoriteSwipeComponent} from '../components/FavoriteSwipeComponent'

// Memoized, so only a context subscription can re-render the label, as in a memoized screen.
const MemoizedFavoriteSwipe = memo(() => (
  <FavoriteSwipeComponent index={0} favorite={false} handleFavoriteChange={() => undefined} />
))

const app = (language: string) => (
  <RottProvider config={{options: {language: {name: language}}}}>
    <MemoizedFavoriteSwipe />
  </RottProvider>
)

describe('FavoriteSwipeComponent', () => {
  afterEach(() => {
    setActiveLanguage('en-US')
  })

  it('follows a runtime language change', async () => {
    const {getByText, rerenderAsync} = await render(app('en-US'))
    expect(getByText(en['LIST.ITEM.FAVORITE.ADD'])).toBeOnTheScreen()

    await rerenderAsync(app('tr-TR'))

    expect(getByText(tr['LIST.ITEM.FAVORITE.ADD'])).toBeOnTheScreen()
  })
})
