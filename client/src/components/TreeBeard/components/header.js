import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';
import Container from './Container';

class NodeHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const nextPropKeys = Object.keys(nextProps);

    for (let i = 0; i < nextPropKeys.length; i++) {
      const key = nextPropKeys[i];
      if (key === 'animations') {
        continue; // eslint-disable-line no-continue
      }

      const isEqual = shallowEqual(props[key], nextProps[key]);
      if (!isEqual) {
        return true;
      }
    }

    return !deepEqual(props.animations, nextProps.animations, { strict: true });
  }

  render() {
    const { animations, node, onClick, onExpand, expanded, level, selectedItem } = this.props;
    const { children, id } = node;
    const terminal = !children || !children.length;
    return (
      <Container
        animations={animations}
        node={node}
        onClick={onClick}
        terminal={terminal}
        onExpand={() => onExpand()}
        expanded={expanded}
        level={level}
        selected={selectedItem === id}
      />
    );
  }
}

NodeHeader.propTypes = {
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  node: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  selectedItem: PropTypes.string,
};

export default NodeHeader;
