import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'react-tagsinput/react-tagsinput.css';

import ConversationItemContainer from '../ConversationItemContainer';
import FirstItemSelect from '../FirstItemSelect';
import NextMessage from '../NextMessage';


import { createInitialFormState } from '../../../utils/data';

import './style.css';

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
  handleChildEntityAddition: PropTypes.func,
  conversations: PropTypes.array,
  readOnly: PropTypes.bool.isRequired,
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

  render() {
    const { readOnly, childEntities = [] } = this.props;
    if (!childEntities.length && !readOnly) {
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
        {readOnly && <div className="read-only" /> }
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
