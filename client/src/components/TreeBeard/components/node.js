import React from 'react';
import PropTypes from 'prop-types';
import { VelocityTransitionGroup } from 'velocity-react';
import './styles.css';
import NodeHeader from './header';

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { expanded: props.expandAll };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.expandAll !== nextProps.expandAll) {
      this.setState({ expanded: nextProps.expandAll });
    }
  }

  onClick(props) {
    const { node, onToggle } = this.props;

    if (onToggle) {
      onToggle({ node, ...props });
    }
  }

  animations() {
    const { animations, node } = this.props;

    if (animations === false) {
      return false;
    }

    const anim = Object.assign({}, animations, node.animations);
    return {
      toggle: anim.toggle(this.props),
      drawer: anim.drawer(this.props),
    };
  }

  render() {
    const animations = this.animations();

    return (
      <li ref={ref => { this.topLevelRef = ref; }} >
        {this.renderHeader(animations)}

        {this.renderDrawer(animations)}
      </li>
    );
  }

  renderDrawer(animations) {
    const { node: { toggled } } = this.props;

    if (!animations && !toggled) {
      return null;
    } else if (!animations && toggled) {
      return this.renderChildren();
    }

    const { animation, duration, ...restAnimationInfo } = animations.drawer;
    return (
      <VelocityTransitionGroup
        {...restAnimationInfo}
        ref={ref => { this.velocityRef = ref; }}
      >
        {toggled ? this.renderChildren() : null}
      </VelocityTransitionGroup>
    );
  }

  onExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  renderHeader(animations) {
    const { node, level, selectedItem } = this.props;
    const { expanded } = this.state;
    return (
      <NodeHeader
        animations={animations}
        node={Object.assign({}, node)}
        onClick={this.onClick}
        onExpand={() => this.onExpand()}
        expanded={expanded}
        level={level}
        selectedItem={selectedItem}
      />
    );
  }

  renderChildren() {
    const { expanded } = this.state;
    if (!expanded) return null;
    const { animations, node, expandAll, level, selectedItem } = this.props;

    let { children } = node;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    return (
      <ul ref={ref => { this.subtreeRef = ref; }} className="nav nav-pills">
        {children.map((child, index) => (
          <TreeNode
            {...this.eventBubbles()}
            animations={animations}
            key={child.id || index}
            node={child}
            expandAll={expandAll}
            level={level + 1}
            selectedItem={selectedItem}
          />
        ))}
      </ul>
    );
  }

  eventBubbles() {
    const { onToggle } = this.props;

    return {
      onToggle,
    };
  }
}

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  onToggle: PropTypes.func,
  level: PropTypes.number,
};

TreeNode.defaultProps = {
  level: 1,
};

export default TreeNode;
