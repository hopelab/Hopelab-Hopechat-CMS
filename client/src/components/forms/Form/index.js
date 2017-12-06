import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Card from '../Card';
import ConversationItem from '../ConversationItem';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

import { autocompleteRenderInput } from '../../AutoSuggest';

import { last } from 'ramda';

import {
  FormGroup,
  ControlLabel,
  FormControl,
  Checkbox
} from 'react-bootstrap';

import MessageOptions from '../MessageOptions';

import { createInitialFormState } from '../../../utils/data';
import { entities } from '../../../utils/config';

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
  handleUpdateItem: PropTypes.func.isRequired,
  handleUpdateChildEntity: PropTypes.func.isRequired,
  onEditEntity: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  handleUpdateMessageOptions: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired
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

  componentWillReceiveProps(nextProps) {
    this.setState(createInitialFormState(nextProps));
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

  handleTagsInput = e => {
    this.props.handleUpdateItem({
      target: {
        name: 'tags',
        value: e
      }
    });

    this.props.handleAddTag({ name: last(e) });
  };

  handleChildSelection = e => this.setState({ entityToAdd: e.target.value });

  render() {
    return (
      <div className="Form">
        <div className="Row">
          {formHasField('name', this.props.config.fields) ? (
            <FormGroup className="EntityName">
              <ControlLabel>
                {`${this.props.item.type} name`.toUpperCase()}
              </ControlLabel>

              <FormControl
                type="text"
                name="name"
                id="name"
                value={this.props.item.name}
                onChange={this.props.handleUpdateItem}
              />
            </FormGroup>
          ) : null}
        </div>

        <div className="Row">
          {formHasField('tags', this.props.config.fields) ? (
            <div className="TagsContainer">
              <FormGroup className="Tags">
                <ControlLabel>TAGS</ControlLabel>
                <TagsInput
                  id="tags"
                  name="tags"
                  renderInput={autocompleteRenderInput}
                  value={this.props.item.tags || []}
                  onChange={this.handleTagsInput}
                  inputProps={{
                    tags: this.props.tags,
                    handleAddTag: this.props.handleAddTag
                  }}
                />
              </FormGroup>
            </div>
          ) : null}

          {formHasField('rules', this.props.config.fields) ? (
            <div className="RulesContainer">
              <label>
                {`${this.props.item.type} logic/rules`.toUpperCase()}
              </label>
              <FormControl
                componentClass="select"
                id="rule"
                name="rule"
                value={this.props.item.rule}
                onChange={this.props.handleUpdateItem}
              >
                {this.props.config.rules.map(c => <option key={c}>{c}</option>)}
              </FormControl>
            </div>
          ) : null}

          {formHasField('live', this.props.config.fields) ? (
            <FormGroup className="LiveContainer">
              <ControlLabel>Live?</ControlLabel>
              <Checkbox
                id="isLive"
                name="isLive"
                type="checkbox"
                checked={this.props.item.isLive}
                onChange={this.props.handleUpdateItem}
              />
            </FormGroup>
          ) : null}

          {this.props.item.type === entities.message ? (
            <MessageOptions
              item={this.props.item}
              onUpdate={this.props.handleUpdateMessageOptions}
              childEntities={this.props.childEntities}
              images={this.props.images}
            />
          ) : null}
        </div>

        {formHasField('children', this.props.config.fields) ? (
          <div className="ChildrenContainer">
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

            <div className="ChildGrid">
              {this.props.childEntities.map((e, i) => (
                <div key={e.id}>
                <Card

                  item={e}
                  index={i}
                  childEntities={this.props.childEntities}
                  onUpdate={this.props.handleUpdateChildEntity}
                  onEditEntity={this.props.onEditEntity}
                  handleSaveItem={this.props.handleSaveItem}
                  handleUpdateMessageOptions={
                    this.props.handleUpdateMessageOptions
                  }
                  images={this.props.images}
                />
                <ConversationItem

                  item={e}
                  index={i}
                  childEntities={this.props.childEntities}
                  onUpdate={this.props.handleUpdateChildEntity}
                  onEditEntity={this.props.onEditEntity}
                  handleSaveItem={this.props.handleSaveItem}
                  handleUpdateMessageOptions={
                    this.props.handleUpdateMessageOptions
                  }
                  images={this.props.images}
                /></div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

Form.propTypes = propTypes;

export default Form;
