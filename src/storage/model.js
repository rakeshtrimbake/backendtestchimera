const {storageSchema} = require('./StorageSchema');
const mongoose = require('mongoose');

module.exports = mongoose.model('storages',storageSchema);