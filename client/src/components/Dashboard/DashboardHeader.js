import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form as ReactStrapForm,
  Button,
} from 'reactstrap';

import EditableText from '../forms/EditableText';
import RulesDropdown from '../forms/RulesDropdown';
import CopyButton from '../forms/CopyButton';
import CheckBox from '../common/CheckBox';

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
    return (
      [
        <div className={readOnly ? 'read-only' : 'hidden'} key="read-only-div" />,
        <div
          key="header"
          className="card-header d-flex flex-row justify-content-start
            align-items-center top-bar-height bg-primary-override"
        >
          <Button
            color="secondary"
            size="lg"
            style={{ cursor: special ? 'default' : 'text' }}
            className="header-btn"
          >
            <EditableText
              text={special ? itemName.toUpperCase() : itemName}
              onEditWillFinish={onNameChanged}
              disabled={readOnly || !!special}
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
            {this.hasStudy(itemType) && (
              <CheckBox
                onChange={onToggleStudy}
                className="mr-1"
                checked={!!(isStudy)}
                label="Study"
                disabled={readOnly}
              />
            )}
            {this.hasLive(itemType) && (
              <CheckBox
                onChange={onToggleLive}
                className="mr-1"
                checked={!!(isLive)}
                label="Default"
                disabled={readOnly}
              />
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
            <CheckBox
              checked={readOnly}
              onChange={toggleReadOnly}
              label="Read-Only"
            />
          </ReactStrapForm>
        </div>,
      ]
    );
  }
}

export default DashboardHeader;
