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
exports.create = series => {
    return setSeries(series);
};

/**
 * Update Series
 * 
 * @param {Object} series
 * @return {Promise}
*/
exports.update = series => {
    return updateSeries(series);
};

/**
 * Get a Series by ID
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.get = id => {
    return getSeriesById(id);
};

/**
 * Get all Series
 *
 * @return {Promise}
*/
exports.all = () => {
    return getSeries();
};

/**
 * Delete Series
 * 
 * @param {String} id
 * @return {Promise}
*/
exports.delete = id => {
    return deleteSeries(id);
};
