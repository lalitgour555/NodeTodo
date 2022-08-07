const  mongoose = require("mongoose");

const productSchema = new  mongoose.Schema({
    name:String ,
     price:Number,
     brand:String ,
     catgory:String
  });
  
  module.exports = mongoose.model('Adminsir',productSchema);