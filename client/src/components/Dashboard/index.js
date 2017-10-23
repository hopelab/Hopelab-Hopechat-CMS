import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Form from '../forms/Form';
import { Button, ButtonGroup, SplitButton, MenuItem } from 'react-bootstrap';

import { entityCanBeCopied } from '../../utils/data';

const propTypes = {
  formConfig: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  handleSaveItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleNewChildEntity: PropTypes.func.isRequired,
  handleUpdateChildEntity: PropTypes.func.isRequired,
  handleEditingChildEntity: PropTypes.func.isRequired,
  handleUpdateMessageOptions: PropTypes.func.isRequired,
  itemEditing: PropTypes.object,
  itemHasBeenEdited: PropTypes.bool.isRequired,
  childEntities: PropTypes.array.isRequired,
  entitiesCanCopyTo: PropTypes.array.isRequired,
  handleCopyEntity: PropTypes.func.isRequired
};

const Dashboard = props => (
  <div className="Dashboard">
    {props.itemEditing !== null ? (
      <div className="Inner">
        <div className="FormContainer">
          <div className="FormActionsContainer">
            {entityCanBeCopied(props.itemEditing.type) ? (
              <ButtonGroup>
                <SplitButton
                  bsStyle="primary"
                  title="Copy To"
                  id="bg-nested-dropdown"
                  onSelect={props.handleCopyEntity}
                >
                  {props.entitiesCanCopyTo.map((e, i) => (
                    <MenuItem key={i} eventKey={e}>
                      {e.name}
                    </MenuItem>
                  ))}
                </SplitButton>
              </ButtonGroup>
            ) : null}
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
            handleUpdateMessageOptions={props.handleUpdateMessageOptions}
            onEntityAddition={props.handleNewChildEntity}
            handleUpdateChildEntity={props.handleUpdateChildEntity}
            onEditEntity={props.handleEditingChildEntity}
            childEntities={props.childEntities}
            handleSaveItem={props.handleSaveItem}
          />
        </div>
      </div>
    ) : null}
  </div>
);

Dashboard.propTypes = propTypes;

export default Dashboard;
