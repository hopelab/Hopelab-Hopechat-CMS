const {
  getSeries,
  getSeriesById,
  setSeries,
  updateSeries,
  deleteSeries
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

/**
 * Delete Series
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = deleteSeries;
