import {type ContentProps} from '../../Content'

/**
 * Props for the Footer container.
 *
 * Footer is a thin wrapper over {@link ContentProps}, so every Content prop is
 * accepted and overrides the footer defaults. Only the layout defaults differ:
 * `minHeight`, `paddingTop`, `gap` and `useBottomInset`.
 */
export type FooterProps = ContentProps
