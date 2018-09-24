import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ style }) => <div style={style}>loading...</div>;
Loading.propTypes = {
  style: PropTypes.object,
};

const Toggle = ({ style }) => {
  const { height, width } = style;
  const midHeight = height * 0.5;
  const points = `0,0 0,${height} ${width},${midHeight}`;

  return (
    <div style={style.base}>
      <div style={style.wrapper}>
        <svg height={height} width={width}>
          <polygon points={points} style={style.arrow} />
        </svg>
      </div>
    </div>
  );
};
Toggle.propTypes = {
  style: PropTypes.object,
};

const Header = ({ node, style }) => (
  <div style={style.base} >
    <div style={style.title}>{node.name}</div>
  </div>
);


Header.propTypes = {
  style: PropTypes.object,
  node: PropTypes.object.isRequired,
};

export default {
  Loading,
  Toggle,
  Header,
};
