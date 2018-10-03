const { getUserData } = require('../db')(require('../utils/store'));

exports.all = getUserData;
