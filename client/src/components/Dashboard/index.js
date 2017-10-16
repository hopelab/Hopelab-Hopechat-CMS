import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Form from '../forms/Form';
import Button from '../forms/Button';

const propTypes = {
  formConfig: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleNewChildEntity: PropTypes.func.isRequired,
  handleUpdateChildEntityName: PropTypes.func.isRequired,
  handleEditingChildEntity: PropTypes.func.isRequired,
  itemEditing: PropTypes.object,
  entitiesToAdd: PropTypes.array.isRequired
};

const Dashboard = props => (
  <div className="Dashboard">
    <div className="Inner">
      {props.itemEditing !== null ? (
        <div className="FormContainer">
          <span className="CloseButton" onClick={props.handleClose}>
            X
          </span>

          <Form
            item={props.itemEditing}
            config={props.formConfig[props.itemEditing.type]}
            onUpdate={props.handleUpdateItem}
            onEntityAddition={props.handleNewChildEntity}
            onEntityNameUpdate={props.handleUpdateChildEntityName}
            onEditEntity={props.handleEditingChildEntity}
            entitiesToAdd={props.entitiesToAdd}
            handleSaveItem={props.handleSaveItem}
          />

          <div className="FormActionsContainer">
            <Button
              className="Button"
              handleClick={() => props.handleDeleteItem(props.itemEditing)}
              text="Delete"
            />

            <Button
              className="Button"
              handleClick={() => props.handleSaveItem(props.itemEditing)}
              text="Save"
            />
          </div>
        </div>
      ) : null}
    </div>
  </div>
);

Dashboard.propTypes = propTypes;

export default Dashboard;
