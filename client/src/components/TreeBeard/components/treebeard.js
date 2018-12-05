import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './node';
import style from '../../../utils/treeTheme';
import defaultAnimations from '../themes/animations';
import Loader from '../../common/Loader';

class TreeBeard extends React.Component {
  render() {
    const {
      animations,
      data: propsData,
      onToggle,
      expandAll,
      selectedItem,
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
      <ul style={style.tree.base} ref={ref => { this.treeBaseRef = ref; }} className="nav-pills">
        {data.map((node, index) => (
          <TreeNode
            animations={animations}
            key={node.id || index}
            node={node}
            onToggle={onToggle}
            style={style.tree.node}
            expandAll={expandAll}
            level={1}
            selectedItem={selectedItem}
          />
        ))}
      </ul>
    );
  }
}

TreeBeard.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onToggle: PropTypes.func,
  expandAll: PropTypes.bool.isRequired,
  selectedItem: PropTypes.string,
};

TreeBeard.defaultProps = {
  animations: defaultAnimations,
  selectedItem: '',
};

export default TreeBeard;
