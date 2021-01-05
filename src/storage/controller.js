const Storage = require("./model");
const { storageValidate } = require("./storageSchema");
const errorCreate = require("http-errors");
const {generateStorageId} = require('./utility');
const moment = require('moment');

const addStorage = async (req, res, next) => {
  try {
    const result = await storageValidate.validateAsync(req.body);
    const isExist = await Storage.findOne({name:result.name});
    if (isExist)
     throw errorCreate.BadRequest(`${result.name} is already exist`);
     const count = await Storage.find({isActive:1}).count();
     console.log(count);
     if(count >= 10)
     throw errorCreate.BadRequest(`You can not add more than 10 devices in stores`);
     result.storageId = await generateStorageId();
     result.isActive = 1;
    const storage = new Storage(result);
    const storageAdd = await storage.save();    
    res.send(storageAdd);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getAllStorage = async (req, res, next) => {
  try {
    const storage = await Storage.find({isActive:1}).sort({createdAt:-1});
    res.send(storage);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
      const storage = await Storage.findOne({storageId:req.params.id,isActive:1});
      if(!storage) throw errorCreate.Unauthorized();
      res.send(storage);
  } catch (error) {
      
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const updateStorage = async (req, res, next) => {
  try {
    const storage = await Storage.findOne({storageId:req.params.id});
    if(!storage) throw errorCreate.Unauthorized();
    for (let data in req.query) {
      storage[data] = req.query[data];
    }
    await storage.save();
        res.send(storage);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const deleteStorage = async (req, res, next) => {
  try {
    const storage = await Storage.findOne({storageId:req.params.id});
    if(!storage) throw errorCreate.Unauthorized();
    storage.isActive = 0;
    await storage.save();
    
    res.send(storage);
  } catch (error) {
    if (error.isJoi == true) error.status = 422;
    next(error);
  }
};

const checkoutStorage = async(req,res,next) => {
    var format = 'hh:mm:ss'

// var time = moment() gives you current time. no format required.
var time = moment('09:34:00',format),
  beforeTime = moment('09:00:00', format),
  afterTime = moment('17:00:00', format);

if (time.isBetween(beforeTime, afterTime)) {

  console.log('is between')

} else {

  console.log('is not between')

}
}

module.exports = {
  addStorage,
  getAllStorage,
  getById,
  updateStorage,
  deleteStorage,
  checkoutStorage
};
