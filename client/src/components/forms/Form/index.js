import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import ConversationItemContainer from '../ConversationItemContainer';
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
  handleUpdateItem: PropTypes.func.isRequired,
  handleSaveItem2: PropTypes.func.isRequired,
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
      <div className="d-flex flex-column align-items-start">
        {/*inputProps=
          tags: this.props.tags,
          handleAddTag: this.props.handleAddTag
        */}
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
        </div>

        {formHasField('children', this.props.config.fields) ? (
            this.props.childEntities.map((e, i) => (
              <ConversationItemContainer
                key={e.id}
                item={e}
                index={i}
                childEntities={this.props.childEntities}
                onUpdate={this.props.handleUpdateChildEntity}
                onEditEntity={this.props.onEditEntity}
                handleSaveItem={this.props.handleSaveItem2}
                handleUpdateMessageOptions={
                  this.props.handleUpdateMessageOptions
                }
                images={this.props.images}
              />
            ))
        ) : null}
      </div>
    );
  }
}

Form.propTypes = propTypes;

export default Form;
