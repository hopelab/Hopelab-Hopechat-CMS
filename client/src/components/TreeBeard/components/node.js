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

  decorators() {
    // Merge Any Node Based Decorators Into The Pack
    const { decorators, node } = this.props;
    const nodeDecorators = node.decorators || {};

    return Object.assign({}, decorators, nodeDecorators);
  }

  render() {
    const { style } = this.props;
    const decorators = this.decorators();
    const animations = this.animations();

    return (
      <li ref={ref => { this.topLevelRef = ref; }} style={style.base}>
        {this.renderHeader(decorators, animations)}

        {this.renderDrawer(decorators, animations)}
      </li>
    );
  }

  renderDrawer(decorators, animations) {
    const { node: { toggled } } = this.props;

    if (!animations && !toggled) {
      return null;
    } else if (!animations && toggled) {
      return this.renderChildren(decorators, animations);
    }

    const { animation, duration, ...restAnimationInfo } = animations.drawer;
    return (
      <VelocityTransitionGroup
        {...restAnimationInfo}
        ref={ref => { this.velocityRef = ref; }}
      >
        {toggled ? this.renderChildren(decorators, animations) : null}
      </VelocityTransitionGroup>
    );
  }

  onExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  renderHeader(decorators, animations) {
    const { node, style } = this.props;
    const { expanded } = this.state;
    return (
      <NodeHeader
        animations={animations}
        decorators={decorators}
        node={Object.assign({}, node)}
        onClick={this.onClick}
        onExpand={() => this.onExpand()}
        expanded={expanded}
        style={style}
      />
    );
  }

  renderChildren(decorators) {
    const { expanded } = this.state;
    if (!expanded) return null;
    const { animations, decorators: propDecorators, node, style, expandAll } = this.props;
    if (node.loading) {
      return this.renderLoading(decorators);
    }

    let { children } = node;
    if (!Array.isArray(children)) {
      children = children ? [children] : [];
    }
    return (
      <ul style={style.subtree} ref={ref => { this.subtreeRef = ref; }}>
        {children.map((child, index) => (
          <TreeNode
            {...this.eventBubbles()}
            animations={animations}
            decorators={propDecorators}
            key={child.id || index}
            node={child}
            style={style}
            expandAll={expandAll}
          />
        ))}
      </ul>
    );
  }

  renderLoading(decorators) {
    const { style } = this.props;

    return (
      <ul style={style.subtree}>
        <li>
          <decorators.Loading style={style.loading} />
        </li>
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
  style: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  decorators: PropTypes.object.isRequired,
  animations: PropTypes.oneOfType([PropTypes.object, PropTypes.bool])
    .isRequired,
  onToggle: PropTypes.func,
};

export default TreeNode;
