import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Form from '../forms/Form';
import Button from '../forms/Button';

class Dashboard extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.view !== this.props.view) {
      this.setState({
        formConfig: this.props.formConfig[newProps.view]
      });
    }
  }

  getFormForView = () => {};

  render() {
    return (
      <div className="Dashboard">
        <div className="Inner">
          {this.props.itemEditing !== null ? (
            <div className="FormContainer">
              <span className="CloseButton" onClick={this.props.handleClose}>
                X
              </span>

              <Form
                entity={this.props.itemEditing.type}
                entityData={{}}
                config={this.props.formConfig[this.props.itemEditing.type]}
              />

              <Button
                className="SaveButton"
                handleClick={this.props.handleUpdateItem}
                text="Save"
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  formConfig: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  itemEditing: PropTypes.object
};

export default Dashboard;
