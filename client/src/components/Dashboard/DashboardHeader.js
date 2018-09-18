import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form as ReactStrapForm,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';

import EditableText from '../forms/EditableText';
import RulesDropdown from '../forms/RulesDropdown';
import CopyButton from '../forms/CopyButton';


import { entityCanBeCopied } from '../../utils/data';
import { forms } from '../../utils/config';


export class DashboardHeader extends Component {
  static propTypes = {
    itemName: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    isLive: PropTypes.bool,
    isStudy: PropTypes.bool,
    rule: PropTypes.string,
    onToggleLive: PropTypes.func,
    onToggleStudy: PropTypes.func,
    onNameChanged: PropTypes.func.isRequired,
    onRuleChanged: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    copyToItems: PropTypes.arrayOf(PropTypes.shape),
  }

  hasLive(type) {
    return forms[type].fields.includes('live');
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
        style={{ flexWrap: 'wrap' }}
      >
        <div
          className="d-flex flex-row justify-content-between"
          style={{ flex: '1 1', whiteSpace: 'nowrap' }}
        >
          <EditableText
            text={itemName}
            onEditWillFinish={onNameChanged}
          />
          <input type="text" placeholder="tags" />
        </div>
        <ReactStrapForm
          className="d-flex justify-content-end"
          style={{ flex: '1 0', whiteSpace: 'nowrap' }}
          onSubmit={e => {
            e.preventDefault();
            onDelete({ id: itemId, type: itemType, name: itemName });
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
          <Button className="mr-3" color="danger" type="submit">Delete</Button>
          {this.hasStudy(itemType) && (
            <FormGroup check className="mr-1">
              <Label check>
                <Input
                  onChange={onToggleStudy}
                  className="mr-1"
                  type="checkbox"
                  checked={!!(isStudy)}
                />
                  Study
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

export default DashboardHeader;
