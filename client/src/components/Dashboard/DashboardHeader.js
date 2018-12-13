import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form as ReactStrapForm,
  Button,
} from 'reactstrap';

import EditableText from '../forms/EditableText';
import RulesDropdown from '../forms/RulesDropdown';
import CopyButton from '../forms/CopyButton';
import Toggle from '../common/Toggle';

import { entityCanBeCopied } from '../../utils/data';
import { forms } from '../../utils/config';
import { INTRO_CONVERSATION_ID } from '../../utils/constants';


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
    readOnly: PropTypes.bool.isRequired,
    toggleReadOnly: PropTypes.func.isRequired,
    special: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
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
      readOnly,
      toggleReadOnly,
      special,
      children,
    } = this.props;
    const introOrNotSpecial = special === INTRO_CONVERSATION_ID || !special;
    return (
      [
        <div
          key="header"
          className="card-header d-flex flex-row justify-content-start DashboardHeader
            align-items-center top-bar-height bg-primary-override"
        >
          <Button
            color={!introOrNotSpecial ? 'transparent' : 'default'}
            size="lg"
            style={{ cursor: !introOrNotSpecial ? 'default' : 'text' }}
            className="text-left header-btn"
          >
            <EditableText
              text={!introOrNotSpecial ? itemName.toUpperCase() : itemName}
              onEditWillFinish={onNameChanged}
              disabled={readOnly || !introOrNotSpecial}
              alwaysEdit={introOrNotSpecial}
            />
          </Button>
          <ReactStrapForm
            className="d-flex flex-row align-items-center flex-nowrap"
            onSubmit={e => {
              e.preventDefault();
              onDelete({ id: itemId, type: itemType, name: itemName });
            }}
          >
            {children && children}
            {itemType === 'conversation' && !special &&
              (<CopyButton onCopy={onCopy} disabled={readOnly} key="copy" />)}
            {entityCanBeCopied(itemType) &&
              !special &&
              <CopyButton
                copyToItems={copyToItems}
                onCopy={onCopy}
                disabled={readOnly}
              />

            }
            {!special &&
            <Button
              className="mr-3"
              color="danger"
              disabled={readOnly}
              type="submit"
            >
              Delete
            </Button>
            }
            {this.hasStudy(itemType) && !special && (
              [
                <Toggle
                  key="study-toggle"
                  className="mr-1"
                  checked={!!(isStudy)}
                  disabled={readOnly}
                  onChange={onToggleStudy}
                />,
                <label key="study-label">Study</label>,
              ]
            )}
            {this.hasLive(itemType) && !special && (
              [
                <Toggle
                  key="default-toggle"
                  className="mr-1"
                  checked={!!(isLive)}
                  disabled={readOnly}
                  onChange={onToggleLive}
                />,
                <label key="default-label">Default</label>,
              ]
            )}
            {this.hasRules(itemType) && (
              <div>
                <RulesDropdown
                  rules={this.getRules(itemType)}
                  selected={rule}
                  onSelection={onRuleChanged}
                  disabled={readOnly}
                />
              </div>
            )}
            <Toggle
              key="readonly-toggle"
              checked={readOnly}
              onChange={toggleReadOnly}
            />
            <label key="readonly-label">Read-Only</label>
          </ReactStrapForm>
        </div>,
      ]
    );
  }
}

export default DashboardHeader;
