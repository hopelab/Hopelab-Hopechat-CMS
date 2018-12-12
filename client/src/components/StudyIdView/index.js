import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';
import * as config from '../../utils/config';
import DashboardHeader from '../Dashboard/DashboardHeader';

import './style.css';

export const StudyIdView = ({ studyIds, readOnly, toggleReadOnly }) => {
  if (!studyIds) return <Loader />;
  return (
    <div className="offset-3 bg-primary-override StudyIdView Dashboard">
      <DashboardHeader
        itemName="Study Ids"
        special="Asset Library"
        itemId="na"
        itemType={config.TYPE_BLOCK}
        onNameChanged={Function.prototype}
        onRuleChanged={Function.prototype}
        onDelete={Function.prototype}
        onCopy={Function.prototype}
        readOnly={readOnly}
        toggleReadOnly={toggleReadOnly}
      >
        <h4>Used Study Ids (used/original): <strong>({studyIds.length}</strong> / 200)</h4>
      </DashboardHeader>
      <div className="container-fluid work-space bg-secondary-override">
        {studyIds.map(id => <ul key={id}>{id}</ul>)}
      </div>
    </div>
  );
};

StudyIdView.propTypes = {
  studyIds: PropTypes.arrayOf(PropTypes.string),
  readOnly: PropTypes.bool,
  toggleReadOnly: PropTypes.func,
};

export default StudyIdView;
