// import mongoose from "mongoose";

// const itemSchema = new mongoose.Schema(
//   {
//     name: String,
//     surname: String,
//     email: String,
//     dateOfBirth: String,
//     age: Number,
//     description: String,
//   },
//   { timestamps: true }
// );

// const Item = mongoose.model('Item',itemSchema);
// module.exports = Item;



// ../models/item.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    name:{type:String,trim:true} ,
    surname: {type:String,trim:true} ,
    email: {type:String,trim:true} ,
    dateOfBirth: {type:String,trim:true} ,
    age: Number,
    description: {type:String,trim:true} ,
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;

