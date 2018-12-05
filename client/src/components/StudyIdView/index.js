import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/Loader';
import './style.css';

export const StudyIdView = ({ studyIds }) => {
  if (!studyIds) return <Loader />;
  return (
    <div className="col-8 StudyIdView">
      <div
        className="card-header d-flex flex-column justify-content-end col-12 top-bar-height"
      >
        <h4>Total # of used Study Ids (used/original): <strong>({studyIds.length}</strong> / 200)</h4>
      </div>
      <div className="container-fluid">
        {studyIds.map(id => <ul key={id}>{id}</ul>)}
      </div>
    </div>
  );
};

StudyIdView.propTypes = {
  studyIds: PropTypes.arrayOf(PropTypes.string),
};

export default StudyIdView;
