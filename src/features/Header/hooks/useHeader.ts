export const useHeader = ({
  goBackFunction,
  preventGoBack,
}: {
  goBackFunction?: () => void
  preventGoBack?: boolean
}) => {
  return {
    goBackFunction,
    preventGoBack,
  }
}
