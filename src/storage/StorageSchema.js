const mongoose = require('mongoose');
const Joi = require('joi');
const storageSchema = new mongoose.Schema({
    storageId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        require:true
    },
    isActive:{
        type:Number
    }
},
{
    timestamps:true
})

const storageValidate = Joi.object({
    name:Joi.string().required(),
    isActive:Joi.number()
})

module.exports = {
    storageSchema,
    storageValidate
}