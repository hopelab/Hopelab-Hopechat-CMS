import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import deepEqual from 'deep-equal';

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
    const { animations, decorators, node, onClick, style, onExpand, expanded } = this.props;
    const { active, children } = node;
    const terminal = !children || !children.length;
    const container = [style.link, active ? style.activeLink : null];
    const headerStyles = Object.assign({ container }, style);
    return (
      <decorators.Container
        animations={animations}
        decorators={decorators}
        node={node}
        onClick={onClick}
        style={headerStyles}
        terminal={terminal}
        onExpand={() => onExpand()}
        expanded={expanded}
      />
    );
  }
}

NodeHeader.propTypes = {
  style: PropTypes.object.isRequired,
  decorators: PropTypes.object.isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  node: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  onExpand: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default NodeHeader;
