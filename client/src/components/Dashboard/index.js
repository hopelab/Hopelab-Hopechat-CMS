import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import './style.css';


import Form from '../forms/Form';
import DropDownWithPlus from '../forms/DropDownWithPlus';
import EditableText from '../forms/EditableText';
import { Button, ButtonGroup, SplitButton, MenuItem } from 'react-bootstrap';

import { entityCanBeCopied } from '../../utils/data';

const propTypes = {
  formConfig: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleSaveItem2: PropTypes.func,
  handleDeleteItem: PropTypes.func.isRequired,
  handleNewChildEntity: PropTypes.func.isRequired,
  handleUpdateChildEntity: PropTypes.func.isRequired,
  handleEditingChildEntity: PropTypes.func.isRequired,
  handleUpdateMessageOptions: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  itemEditing: PropTypes.object,
  itemHasBeenEdited: PropTypes.bool.isRequired,
  childEntities: PropTypes.array.isRequired,
  entitiesCanCopyTo: PropTypes.array.isRequired,
  handleCopyEntity: PropTypes.func.isRequired,
  handleCopyToEntity: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  tags: PropTypes.array
};

class DashboardHeader extends Component {
  static propTypes = {
    itemName: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    onNewChildEntity: PropTypes.func.isRequired,
    onNameChanged: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        className="card-header d-flex flex-row justify-content-between"
        style={{flexWrap: "wrap"}}>
        <div
          className="d-flex flex-row justify-content-between"
          style={{flex: "1 1", whiteSpace: 'nowrap'}}
        >
          <EditableText
            text={this.props.itemName}
            onEditWillFinish={this.props.onNameChanged}
          />
          <input type="text" placeholder="tags" />
          <DropDownWithPlus
            itemType={this.props.itemType}
            onClickPlus={this.props.onNewChildEntity}
          />
        </div>
        <form
          className="d-flex justify-content-end"
          style={{flex: "1 0",  whiteSpace: 'nowrap'}}
        >
          <label>
            <input className="mr-1" type="checkbox" />Live
          </label>
        </form>
      </div>
    );
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleChildEntityAddition = this.handleChildEntityAddition.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
  }

  handleChildEntityAddition(selectedOption) {
    this.props.handleNewChildEntity({
      type: selectedOption,
      parent: {
        type: this.props.itemEditing.type,
        id: this.props.itemEditing.id
      }
    });
  }

  handleItemNameChange(name) {
    this.props.handleSaveItem2({
      ...this.props.itemEditing,
      name
    })
  }

  render() {
    const {props} = this;
    return (
      <div className="Dashboard col-md-8 mt-1">
        {props.itemEditing !== null && (
          <div className="Inner card">
            <DashboardHeader
              itemName={props.itemEditing.name}
              itemType={props.itemEditing.type}
              onNewChildEntity={this.handleChildEntityAddition}
              onNameChanged={this.handleItemNameChange}
            />
            <div className="FormContainer">
              <div className="FormActionsContainer">
                {props.itemEditing.type === 'conversation' ? (
                  <Button bsStyle="primary" onClick={props.handleCopyEntity}>
                    Copy
                  </Button>
                ) : null}

                {entityCanBeCopied(props.itemEditing.type) && (
                  <ButtonGroup>
                    <SplitButton
                      bsStyle="primary"
                      title="Copy To"
                      id="bg-nested-dropdown"
                      onSelect={props.handleCopyToEntity}
                    >
                      {props.entitiesCanCopyTo.map((e, i) => (
                        <MenuItem key={i} eventKey={e}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </SplitButton>
                  </ButtonGroup>
                )}
                <Button bsStyle="default" onClick={props.handleClose}>
                  Close
                </Button>

                <Button
                  bsStyle="danger"
                  onClick={() =>
                    props.handleDeleteItem({
                      type: props.itemEditing.type,
                      id: props.itemEditing.id
                    })}
                  disabled={props.itemEditing.id === 'intro-conversation'}
                >
                  Delete
                </Button>

                <Button
                  bsStyle="success"
                  onClick={() => props.handleSaveItem({ item: props.itemEditing })}
                  disabled={!props.itemHasBeenEdited}
                >
                  Save
                </Button>
              </div>
              <Form
                item={props.itemEditing}
                config={props.formConfig[props.itemEditing.type]}
                handleUpdateItem={props.handleUpdateItem}
                handleSaveItem2={props.handleSaveItem2}
                handleUpdateMessageOptions={props.handleUpdateMessageOptions}
                handleUpdateChildEntity={props.handleUpdateChildEntity}
                onEditEntity={props.handleEditingChildEntity}
                childEntities={props.childEntities}
                handleSaveItem={props.handleSaveItem}
                handleAddTag={props.handleAddTag}
                images={props.images}
                tags={props.tags}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

export default Dashboard;
