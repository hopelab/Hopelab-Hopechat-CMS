import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from '../forms/Form';
import DashboardHeader from './DashboardHeader';
import StudyIdView from '../StudyIdView';
import './style.css';

const propTypes = {
  handleSaveItem: PropTypes.func,
  handleNewChildEntity: PropTypes.func.isRequired,
  itemEditing: PropTypes.object,
  childEntities: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    created: PropTypes.int,
    parent: PropTypes.object,
  })),
};

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
    const { childEntities, itemEditing } = this.props;
    const setNameRelToParent = ({ parent, newInt }) =>
      (`${parent.name.substr(0, 5).toUpperCase()}-${newInt}`);
    this.props.handleNewChildEntity({
      type: selectedOption,
      name: setNameRelToParent({ parent: itemEditing, newInt: childEntities.length + 1 }),
      parent: {
        type: itemEditing.type,
        id: itemEditing.id,
      },
    }, callback);
  }

  handleItemNameChange(name) {
    this.props.handleSaveItem({
      ...this.props.itemEditing,
      name,
    });
  }

  handleToggleLiveConversation() {
    this.props.handleSaveItem({
      ...this.props.itemEditing,
      isLive: !this.props.itemEditing.isLive,
    });
  }

  handleToggleStudy() {
    this.props.handleSaveItem({
      ...this.props.itemEditing,
      isStudy: !this.props.itemEditing.isStudy,
    });
  }

  handleRuleChanged(rule) {
    this.props.handleSaveItem({
      ...this.props.itemEditing,
      rule,
    });
  }

  render() {
    const { props } = this;
    const { showStudyIdView, studyIds } = props;
    if (showStudyIdView) return <StudyIdView studyIds={studyIds} />;
    return (
      <div className="Dashboard mt-1">
        {props.itemEditing !== null && (
          <div className="Inner card" style={{ borderColor: 'white' }}>
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
              readOnly={props.readOnly}
              toggleReadOnly={props.toggleReadOnly}
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
              readOnly={props.readOnly}
            />
          </div>
        )}
        <div style={{ height: '85vh' }} />
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;

export default Dashboard;
