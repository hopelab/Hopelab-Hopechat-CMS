const {
  getSeries,
  getSeriesById,
  setSeries,
  updateSeries,
} = require('../db')(require('../utils/store'));

/**
 * Create Series
 *
 * @param {Object} series
 * @return {Promise}
*/
exports.create = setSeries;

/**
 * Update Series
 *
 * @param {Object} series
 * @return {Promise}
*/
exports.update = updateSeries;

/**
 * Get a Series by ID
 *
 * @param {String} id
 * @return {Promise}
*/
exports.get = getSeriesById;

/**
 * Get all Series
 *
 * @return {Promise}
*/
exports.all = getSeries;
