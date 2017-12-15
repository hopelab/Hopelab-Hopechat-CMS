import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Form from '../forms/Form';
import DropDownWithPlus from '../forms/DropDownWithPlus';
import EditableText from '../forms/EditableText';
import RulesDropdown from '../forms/RulesDropdown';
import CopyButton from '../forms/CopyButton';
import { Button, ButtonGroup, SplitButton, MenuItem } from 'react-bootstrap';
import {Form as ReactStrapForm, FormGroup, Label, Input } from 'reactstrap';

import { entityCanBeCopied } from '../../utils/data';
import {forms} from '../../utils/config';

const propTypes = {
  formConfig: PropTypes.object.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleSaveItem2: PropTypes.func,
  handleDeleteItem: PropTypes.func.isRequired,
  handleNewChildEntity: PropTypes.func.isRequired,
  handleUpdateMessageOptions: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  itemEditing: PropTypes.object,
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
    itemId: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    isLive: PropTypes.bool,
    rule: PropTypes.string,
    onToggleLive: PropTypes.func,
    onNewChildEntity: PropTypes.func.isRequired,
    onNameChanged: PropTypes.func.isRequired,
    onRuleChanged: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  hasLive(type) {
    return forms[type].fields.includes('live')
  }

  hasRules(type) {
    return forms[type].fields.includes('rules');
  }

  getRules(type) {
    return forms[type].rules;
  }

  render() {
    const {
      itemName,
      itemId,
      itemType,
      onNameChanged,
      onRuleChanged,
      onNewChildEntity,
      onDelete,
      onToggleLive,
      isLive,
      rule
    } = this.props;
    return (
      <div
        className="card-header d-flex flex-row justify-content-between"
        style={{flexWrap: "wrap"}}>
        <div
          className="d-flex flex-row justify-content-between"
          style={{flex: "1 1", whiteSpace: 'nowrap'}}
        >
          <EditableText
            text={itemName}
            onEditWillFinish={onNameChanged}
          />
          <input type="text" placeholder="tags" />
          <DropDownWithPlus
            itemType={itemType}
            onClickPlus={onNewChildEntity}
          />
        </div>
        <ReactStrapForm
          className="d-flex justify-content-end"
          style={{flex: "1 0",  whiteSpace: 'nowrap'}}
          onSubmit={e => {
            e.preventDefault();
            onDelete({id: itemId, type: itemType})
          }}
        >
          <Button className="mr-3" bsStyle="danger" type='submit'>X</Button>
          {this.hasLive(itemType) && (
            <FormGroup check>
              <Label check>
                <Input
                  onChange={onToggleLive}
                  className="mr-1"
                  type="checkbox"
                  defaultChecked={!!(isLive)}/>Live
              </Label>
            </FormGroup>
          )}
          {this.hasRules(itemType) && (
            <div>
              <RulesDropdown
                rules={this.getRules(itemType)}
                selected={rule}
                onSelection={onRuleChanged}
              />
            </div>
          )}
        </ReactStrapForm>
      </div>
    );
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleChildEntityAddition = this.handleChildEntityAddition.bind(this);
    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleToggleLiveConversation =
      this.handleToggleLiveConversation.bind(this);
    this.handleRuleChanged = this.handleRuleChanged.bind(this);
  }

  handleChildEntityAddition(selectedOption, callback) {
    this.props.handleNewChildEntity({
      type: selectedOption,
      parent: {
        type: this.props.itemEditing.type,
        id: this.props.itemEditing.id
      }
    }, callback);
  }

  handleItemNameChange(name) {
    this.props.handleSaveItem2({
      ...this.props.itemEditing,
      name
    })
  }

  handleToggleLiveConversation() {
    this.props.handleSaveItem2({
      ...this.props.itemEditing,
      isLive: !this.props.itemEditing.isLive
    })
  }

  handleRuleChanged(rule) {
    this.props.handleSaveItem2({
      ...this.props.itemEditing,
      rule
    })
  }

  render() {
    const {props} = this;
    return (
      <div className="Dashboard col-md-8 mt-1">
        {props.itemEditing !== null && (
          <div className="Inner card" style={{borderColor: 'white'}}>
            <DashboardHeader
              itemName={props.itemEditing.name}
              itemType={props.itemEditing.type}
              itemId={props.itemEditing.id}
              isLive={props.itemEditing.isLive}
              rule={props.itemEditing.rule}
              onToggleLive={this.handleToggleLiveConversation}
              onNewChildEntity={this.handleChildEntityAddition}
              onNameChanged={this.handleItemNameChange}
              onRuleChanged={this.handleRuleChanged}
              onDelete={props.handleDeleteItem}
            />
            <div className="FormContainer">
              <div className="FormActionsContainer">
                {props.itemEditing.type === 'conversation' ? (
                  <Button bsStyle="primary" onClick={props.handleCopyEntity}>
                    Copy
                  </Button>
                ) : null}

                {entityCanBeCopied(props.itemEditing.type) && (
                  <CopyButton copyToItems={props.entitiesCanCopyTo}/> )}
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
              </div>
              <Form
                item={props.itemEditing}
                config={props.formConfig[props.itemEditing.type]}
                handleUpdateItem={props.handleUpdateItem}
                handleSaveItem2={props.handleSaveItem2}
                handleDeleteItem={props.handleDeleteItem}
                handleChildEntityAddition={this.handleChildEntityAddition}
                handleUpdateMessageOptions={props.handleUpdateMessageOptions}
                childEntities={props.childEntities}
                handleSaveItem={props.handleSaveItem}
                handleAddTag={props.handleAddTag}
                images={props.images}
                tags={props.tags}
              />
            </div>
          </div>
        )}
        <div style={{height: '85vh'}} />
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

export default Dashboard;
