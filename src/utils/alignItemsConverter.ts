import type {FlexAlignType} from 'react-native'

interface AlignItemsConverterProps {
  alignItemsBaseline?: boolean
  alignItemsCenter?: boolean
  alignItemsFlexEnd?: boolean
  alignItemsFlexStart?: boolean
  alignItemsStretch?: boolean
}

export const alignItemsConvert = ({
  alignItemsBaseline,
  alignItemsCenter,
  alignItemsFlexEnd,
  alignItemsFlexStart,
  alignItemsStretch,
}: AlignItemsConverterProps) => {
  if (alignItemsCenter) return 'center' as FlexAlignType
  else if (alignItemsBaseline) return 'baseline' as FlexAlignType
  else if (alignItemsFlexEnd) return 'flex-end' as FlexAlignType
  else if (alignItemsFlexStart) return 'flex-start' as FlexAlignType
  else if (alignItemsStretch) return 'stretch' as FlexAlignType
  else return undefined
}
