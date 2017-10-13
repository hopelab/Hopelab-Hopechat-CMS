import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Input from '../Input';

/**
 * Check if Form has given field
*/
function formHasField(field, fields = []) {
  return fields.indexOf(field) > -1;
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.entityData
    };
  }

  handleNameChange = e => {};

  handleLiveChange = e => {};

  getOptionsForSelect() {}

  render() {
    return (
      <div className="Form">
        {/* name field */}
        {formHasField('name', this.props.config.fields) ? (
          <p className="EntityName">
            <label htmlFor="name">
              {`${this.props.entity} name`.toUpperCase()}
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              handleInput={this.handleNameChange}
            />
          </p>
        ) : null}

        <div className="TagsContainer">
          <p className="Tags">
            <label htmlFor="tags">TAGS</label>
            <textarea />
          </p>

          {formHasField('live', this.props.config.fields) ? (
            <p>
              <label>Live?</label>
              <Input
                id="isLive"
                name="isLive"
                type="checkbox"
                checked={this.state.data.isLive}
                handleInput={this.handleLiveChange}
              />
            </p>
          ) : null}
        </div>

        <div className="AddContainer">
          <div className="AddButtonWrapper">
            <span className="Add">+</span>
            <select>
              {this.props.config.children.map(c => (
                <option key={c}>{c.toUpperCase()}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  entity: PropTypes.string.isRequired,
  entityData: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.array,
    isLive: PropTypes.bool,
    children: PropTypes.array
  }),
  config: PropTypes.object
};

export default Form;
