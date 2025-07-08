interface JustifyContentConverterProps {
  justifyContentCenter?: boolean
  justifyContentFlexEnd?: boolean
  justifyContentFlexStart?: boolean
  justifyContentSpaceAround?: boolean
  justifyContentSpaceBetween?: boolean
  justifyContentSpaceEvenly?: boolean
}

export const justifyContentConvert = ({
  justifyContentCenter,
  justifyContentFlexEnd,
  justifyContentFlexStart,
  justifyContentSpaceAround,
  justifyContentSpaceBetween,
  justifyContentSpaceEvenly,
}: JustifyContentConverterProps) => {
  if (justifyContentCenter) return 'center'
  else if (justifyContentFlexEnd) return 'flex-end'
  else if (justifyContentFlexStart) return 'flex-start'
  else if (justifyContentSpaceAround) return 'space-around'
  else if (justifyContentSpaceBetween) return 'space-between'
  else if (justifyContentSpaceEvenly) return 'space-evenly'
  else return undefined
}
