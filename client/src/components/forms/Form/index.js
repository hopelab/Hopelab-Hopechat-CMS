import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Input from '../Input';
import Card from '../Card';

import { createInitialFormState } from '../../../utils/data';

const propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.array,
    isLive: PropTypes.bool,
    children: PropTypes.array
  }),
  config: PropTypes.object,
  childEntities: PropTypes.array.isRequired,
  onEntityAddition: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onEntityNameUpdate: PropTypes.func.isRequired,
  onEditEntity: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired
};

/**
 * Check if Form has given field
*/
function formHasField(field, fields = []) {
  return fields.indexOf(field) > -1;
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = createInitialFormState(props);
  }

  handleChildEntityAddition = () => {
    this.props.onEntityAddition({
      type: this.state.entityToAdd,
      parent: {
        type: this.props.item.type,
        id: this.props.item.id
      }
    });
  };

  handleChildSelection = e => this.setState({ selectInput: e.target.value });

  render() {
    return (
      <div className="Form">
        <div className="Row">
          {formHasField('name', this.props.config.fields) ? (
            <p className="EntityName">
              <label htmlFor="name">
                {`${this.props.item.type} name`.toUpperCase()}
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                value={this.props.item.name}
                handleInput={this.props.onUpdate}
              />
            </p>
          ) : null}
        </div>

        <div className="Row">
          {formHasField('tags', this.props.config.fields) ? (
            <div className="TagsContainer">
              <p className="Tags">
                <label htmlFor="tags">TAGS</label>
                <textarea
                  id="tags"
                  name="tags"
                  type="text"
                  value={this.props.item.tags || ''}
                  onChange={this.props.onUpdate}
                />
              </p>
            </div>
          ) : null}

          {formHasField('rules', this.props.config.fields) ? (
            <div className="RulesContainer">
              <label>{`${this.props.item.type} logic/rules`.toUpperCase()}</label>
              <select
                id="rule"
                name="rule"
                value={this.props.item.rule}
                onChange={this.props.onUpdate}
              >
                {this.props.config.rules.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          ) : null}

          {formHasField('live', this.props.config.fields) ? (
            <p className="LiveContainer">
              <label>Live?</label>
              <Input
                id="isLive"
                name="isLive"
                type="checkbox"
                checked={this.props.item.isLive}
                defaultChecked={this.props.item.isLive}
                value={this.props.item.isLive}
                handleInput={this.props.onUpdate}
              />
            </p>
          ) : null}
        </div>

        <div className="ChildrenContainer">
          <div className="ChildGrid">
            {this.props.childEntities.map((e, i) => (
              <Card
                key={i}
                item={e}
                index={i}
                onNameUpdate={this.props.onEntityNameUpdate}
                onEditEntity={this.props.onEditEntity}
                handleSaveItem={this.props.handleSaveItem}
              />
            ))}
          </div>

          <div className="AddButtonWrapper">
            <span className="Add" onClick={this.handleChildEntityAddition}>
              +
            </span>
            <select
              value={this.state.entityToAdd}
              onChange={this.handleChildSelection}
            >
              {this.props.config.children.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

Form.propTypes = propTypes;

export default Form;
