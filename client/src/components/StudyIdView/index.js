import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';
import './style.css';

export const StudyIdView = ({ studyIds }) => {
  if (!studyIds) return <Loader />;
  return (
    <div className="col-8 StudyIdView">
      <div
        className="card-header d-flex flex-row justify-content-between col-12"
        style={{}}
      >
        <div
          className="d-flex flex-row justify-content-between"
          style={{ }}
        >
          <h4>Total # of used Study Ids (used/original): <strong>({studyIds.length}</strong> / 200)</h4>
        </div>
      </div>
      <div>
        {studyIds.map(id => <ul key={id}>{id}</ul>)}
      </div>
    </div>
  );
};

StudyIdView.propTypes = {
  studyIds: PropTypes.arrayOf(PropTypes.string),
};

export default StudyIdView;
