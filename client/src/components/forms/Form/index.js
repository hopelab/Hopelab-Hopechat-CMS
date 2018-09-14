import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import TagsInput from 'react-tagsinput';

import 'react-tagsinput/react-tagsinput.css';

import ConversationItemContainer from '../ConversationItemContainer';
import FirstItemSelect from '../FirstItemSelect';
import NextMessage from '../NextMessage';

import { autocompleteRenderInput } from '../../AutoSuggest';

import { createInitialFormState } from '../../../utils/data';

import {
  TYPE_BLOCK,
  TYPE_CONVERSATION,
} from '../../../utils/config';

const propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.array,
    type: PropTypes.string,
    isLive: PropTypes.bool,
    children: PropTypes.array,
  }),
  config: PropTypes.object,
  childEntities: PropTypes.array.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  updateStartEntity: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  handleChildEntityAddition: PropTypes.func,
  conversations: PropTypes.array,
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

  // handleTagsInput = e => {
  //   // this.props.handleUpdateItem({
  //   //   target: {
  //   //     name: 'tags',
  //   //     value: e
  //   //   }
  //   // });
  //   //
  //   // this.props.handleAddTag({ name: last(e) });
  // };

  // handleChildSelection = e => this.setState({ entityToAdd: e.target.value });

  render() {
    if (!this.props.childEntities.length) {
      return (<NextMessage
        parentItemType={this.props.item.type}
        childEntities={this.props.childEntities}
        onNewItem={type => {
          this.props.handleChildEntityAddition(type, newItem => {
            this.props.handleSaveItem({
              ...this.props.item,
              next: { id: newItem.id, type: newItem.type },
            });
          });
        }}
      />);
    }
    return (
      <div className="d-flex flex-column align-items-start">
        {/* inputProps=
          tags: this.props.tags,
          handleAddTag: this.props.handleAddTag
        */}
        <div className="Row">
          {formHasField('tags', this.props.config.fields) ? (
            <div className="TagsContainer">
              <FormGroup className="Tags">
                <h5>TAGS</h5>
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
        </div>

        { ((this.props.item.type === TYPE_CONVERSATION ||
          this.props.item.type === TYPE_BLOCK) && this.props.childEntities.length)
          ? <FirstItemSelect
            childEntities={this.props.childEntities}
            onSelectStart={this.props.updateStartEntity}
          /> : null
        }

        {formHasField('children', this.props.config.fields) ? (
          this.props.childEntities.sort((a, b) => ((a.created < b.created) ? -1 : 1)).map((e, i) => (
            <ConversationItemContainer
              key={e.id}
              item={e}
              index={i}
              childEntities={this.props.childEntities}
              handleSaveItem={this.props.handleSaveItem}
              handleChildEntityAddition={this.props.handleChildEntityAddition}
              handleDeleteItem={this.props.handleDeleteItem}
              images={this.props.images}
              videos={this.props.videos}
              parentItemType={this.props.item.type}
              conversations={this.props.conversations}
            />
          ))
        ) : null}
      </div>
    );
  }
}

Form.propTypes = propTypes;

export default Form;
