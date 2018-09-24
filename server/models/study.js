const {
  getStudyIds,
  createStudyId,
} = require('../db')(require('../utils/store'));

exports.create = createStudyId;

exports.all = getStudyIds;
