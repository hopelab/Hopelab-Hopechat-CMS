import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Form from '../forms/Form';
import DropDownWithPlus from '../forms/DropDownWithPlus';
import EditableText from '../forms/EditableText';
import RulesDropdown from '../forms/RulesDropdown';
import CopyButton from '../forms/CopyButton';
import {
  Form as ReactStrapForm,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import { entityCanBeCopied } from '../../utils/data';
import {forms} from '../../utils/config';

const propTypes = {
  formConfig: PropTypes.object.isRequired,
  handleSaveItem: PropTypes.func,
  handleDeleteItem: PropTypes.func.isRequired,
  handleNewChildEntity: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
  itemEditing: PropTypes.object,
  childEntities: PropTypes.array.isRequired,
  entitiesCanCopyTo: PropTypes.array.isRequired,
  handleCopyEntity: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  tags: PropTypes.array
};

class DashboardHeader extends Component {
  static propTypes = {
    itemName: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    isLive: PropTypes.bool,
    isStudy: PropTypes.bool,
    rule: PropTypes.string,
    onToggleLive: PropTypes.func,
    onToggleStudy: PropTypes.func,
    onNewChildEntity: PropTypes.func.isRequired,
    onNameChanged: PropTypes.func.isRequired,
    onRuleChanged: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    copyToItems: PropTypes.arrayOf(PropTypes.shape),
  }

  hasLive(type) {
    return forms[type].fields.includes('live')
  }

  hasStudy(type) {
    return forms[type].fields.includes('study');
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
      onToggleStudy,
      isLive,
      isStudy,
      rule,
      onCopy,
      copyToItems,
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
          {itemType === 'conversation' &&
            (<CopyButton onCopy={onCopy} />)}
          {entityCanBeCopied(itemType) && (
            <CopyButton
              copyToItems={copyToItems}
              onCopy={onCopy}
            />
          )}
          <Button className="mr-3" color="danger" type='submit'>X</Button>
          {this.hasStudy(itemType) && (
            <FormGroup check className="mr-1">
              <Label check>
                <Input
                  onChange={onToggleStudy}
                  className="mr-1"
                  type="checkbox"
                  checked={!!(isStudy)}/>Study
              </Label>
            </FormGroup>
          )}
          {this.hasLive(itemType) && (
            <FormGroup check className="mr-1">
              <Label check>
                <Input
                  onChange={onToggleLive}
                  className="mr-1"
                  type="checkbox"
                  checked={!!(isLive)}
                />Live
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
    this.handleToggleStudy =
      this.handleToggleStudy.bind(this);
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
    this.props.handleSaveItem({
      ...this.props.itemEditing,
      name
    })
  }

  handleToggleLiveConversation() {
    this.props.handleSaveItem({
      ...this.props.itemEditing,
      isLive: !this.props.itemEditing.isLive
    })
  }

  handleToggleStudy() {
    this.props.handleSaveItem({
      ...this.props.itemEditing,
      isStudy: !this.props.itemEditing.isStudy
    })
  }

  handleRuleChanged(rule) {
    this.props.handleSaveItem({
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
              isStudy={props.itemEditing.isStudy}
              rule={props.itemEditing.rule}
              onToggleLive={this.handleToggleLiveConversation}
              onToggleStudy={this.handleToggleStudy}
              onNewChildEntity={this.handleChildEntityAddition}
              onNameChanged={this.handleItemNameChange}
              onRuleChanged={this.handleRuleChanged}
              onDelete={props.handleDeleteItem}
              onCopy={props.handleCopyEntity}
              copyToItems={props.entitiesCanCopyTo}
            />
            <Form
              item={props.itemEditing}
              config={props.formConfig[props.itemEditing.type]}
              handleSaveItem={props.handleSaveItem}
              handleDeleteItem={props.handleDeleteItem}
              handleChildEntityAddition={this.handleChildEntityAddition}
              childEntities={props.childEntities}
              handleAddTag={props.handleAddTag}
              images={props.images}
              conversations={props.conversations}
              videos={props.videos}
              tags={props.tags}
              updateStartEntity={props.updateStartEntity}
            />
          </div>
        )}
        <div style={{height: '85vh'}} />
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

export default Dashboard;
