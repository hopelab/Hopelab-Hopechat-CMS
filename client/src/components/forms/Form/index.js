import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ConversationItemContainer from '../ConversationItemContainer';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

import { autocompleteRenderInput } from '../../AutoSuggest';

import { FormGroup } from 'reactstrap';

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
  handleSaveItem: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
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
    // this.props.handleUpdateItem({
    //   target: {
    //     name: 'tags',
    //     value: e
    //   }
    // });
    //
    // this.props.handleAddTag({ name: last(e) });
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

        {formHasField('children', this.props.config.fields) ? (
            this.props.childEntities.map((e, i) => (
              <ConversationItemContainer
                key={e.id}
                item={e}
                index={i}
                childEntities={this.props.childEntities}
                handleSaveItem={this.props.handleSaveItem}
                handleChildEntityAddition={this.props.handleChildEntityAddition}
                handleDeleteItem={this.props.handleDeleteItem}
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
