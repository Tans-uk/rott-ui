const {plugins} = require('pretty-format')

// pretty-format 29 recognizes React elements through react-is 18, which does not know the
// React 19 element symbol. An element passed as a prop (List's ListHeaderComponent ends up
// in the scroll view's props under FlashList 1.x) is then printed as a plain object, owner
// fiber included, which overflows the snapshot string. Print it as an element instead.
const REACT_19_ELEMENT = Symbol.for('react.transitional.element')
const REACT_ELEMENT = Symbol.for('react.element')

module.exports = {
  test: (value) => value != null && value.$$typeof === REACT_19_ELEMENT,
  serialize: (value, config, indentation, depth, refs, printer) =>
    plugins.ReactElement.serialize(
      {$$typeof: REACT_ELEMENT, type: value.type, key: value.key, props: value.props},
      config,
      indentation,
      depth,
      refs,
      printer
    ),
}
