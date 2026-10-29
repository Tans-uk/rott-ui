import {colorFromVariant} from '../colorFromVariant'
import {commonUiStyleProperties} from '../commonUiStyleProperties'

describe('commonUiStyleProperties -> border', () => {
  it('applies borderWidth and resolves a theme color name in borderColor', () => {
    expect(commonUiStyleProperties({borderWidth: 2, borderColor: 'primary'})).toMatchObject({
      borderWidth: 2,
      borderColor: colorFromVariant('primary'),
    })
  })

  it('keeps a literal borderColor', () => {
    expect(commonUiStyleProperties({borderColor: '#747775'})).toMatchObject({
      borderColor: '#747775',
    })
  })

  it('adds no border keys when no border props are given', () => {
    const styles = commonUiStyleProperties({})

    expect(styles).not.toHaveProperty('borderWidth')
    expect(styles).not.toHaveProperty('borderColor')
  })
})
