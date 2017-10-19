import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Form from '../forms/Form';
import { Button } from 'react-bootstrap';

const propTypes = {
  formConfig: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleNewChildEntity: PropTypes.func.isRequired,
  handleUpdateChildEntityName: PropTypes.func.isRequired,
  handleEditingChildEntity: PropTypes.func.isRequired,
  handleUpdateMessageOptions: PropTypes.func.isRequired,
  itemEditing: PropTypes.object,
  childEntities: PropTypes.array.isRequired
};

const Dashboard = props => (
  <div className="Dashboard">
    <div className="Inner">
      {props.itemEditing !== null ? (
        <div className="FormContainer">
          <Form
            item={props.itemEditing}
            config={props.formConfig[props.itemEditing.type]}
            handleUpdateItem={props.handleUpdateItem}
            handleUpdateMessageOptions={props.handleUpdateMessageOptions}
            onEntityAddition={props.handleNewChildEntity}
            onEntityNameUpdate={props.handleUpdateChildEntityName}
            onEditEntity={props.handleEditingChildEntity}
            childEntities={props.childEntities}
            handleSaveItem={props.handleSaveItem}
          />

          <div className="FormActionsContainer">
            <Button bsStyle="default" onClick={props.handleClose}>
              Close
            </Button>

            <Button
              bsStyle="danger"
              onClick={() => props.handleDeleteItem(props.itemEditing)}
            >
              Delete
            </Button>

            <Button
              bsStyle="success"
              onClick={() => props.handleSaveItem(props.itemEditing)}
            >
              Save
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  </div>
);

Dashboard.propTypes = propTypes;

export default Dashboard;
