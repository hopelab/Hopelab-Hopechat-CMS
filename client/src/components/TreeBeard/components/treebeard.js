import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import Loader from '../../common/Loader';

class TreeBeard extends React.Component {
  render() {
    const {
      animations,
      decorators,
      data: propsData,
      onToggle,
      style,
    } = this.props;
    let data = propsData;
    if (!(data && data.children) || data.children.length === 0) return <Loader />;

    // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
    if (!Array.isArray(data)) {
      if (data.name === 'hopelab') {
        data = data.children;
      } else {
        data = [data];
      }
    }
    return (
      <ul style={style.tree.base} ref={ref => { this.treeBaseRef = ref; }}>
        {data.map((node, index) => (
          <TreeNode
            animations={animations}
            decorators={decorators}
            key={node.id || index}
            node={node}
            onToggle={onToggle}
            style={style.tree.node}
          />
        ))}
      </ul>
    );
  }
}

TreeBeard.propTypes = {
  style: PropTypes.object,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onToggle: PropTypes.func,
  decorators: PropTypes.object,
};

TreeBeard.defaultProps = {
  style: defaultTheme,
  animations: defaultAnimations,
  decorators: defaultDecorators,
};

export default TreeBeard;
