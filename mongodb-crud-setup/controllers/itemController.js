import { isValidObjectId } from "mongoose";
import ItemModel from "../models/item.js";
import mongoose from "mongoose";

// import { Types } from 'mongoose';
// const { ObjectId } = Types;

export const createItem = async (req, res) => {
  try {
    let { name, surname, email, dateOfBirth, age, description } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Bad Request the Request body is not empty provide key value",
      });
    }
    if (!name) {
      return res
        .status(400)
        .json({ status: false, message: "name is required field" });
    }
    if (!surname) {
      return res
        .status(400)
        .json({ status: false, message: "surname  is required field" });
    }
    // if(!email){
    //   return res.status(400).json("email is required field" );
    // }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return res
        .status(400)
        .json({ status: false, message: "email is required field" });
    }
    if (!emailRegex.test(email.trim())) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email format." });
    }
    if (!dateOfBirth) {
      return res
        .status(400)
        .json({ status: false, message: "dateOfBirth is required field" });
    }
    if (!age) {
      return res
        .status(400)
        .json({ status: false, message: "age is required field" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ status: false, message: "description is required field" });
    }

    let bodyData = { name, surname, email, dateOfBirth, age, description };

    const newItem = await ItemModel.create(bodyData);
    res.status(201).json({
      success: true,
      message: "successfully created Item",
      data: newItem,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: "Item can't create successfully",
      error: error.message,
    });
  }
};

export const getItem = async (req, res) => {
  try {
    const fetchItem = await ItemModel.find();
    let countOfItems = fetchItem.length;
    res
      .status(200)
      .json({ success: true, "countItemAll:": countOfItems, data: fetchItem });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "An error occurred while trying to getItem",
    });
  }
};

// export const getItemById = async (req, res) => {
//   try {
//     // imp to .id here because i am mention in route passing {id} in endpoint
//     // router.get('/itemById/:id',getItemById)
//     let itemId = req.params.id;
//     // if(!itemId||itemId.length==0){
//     //   return res.status(400).json({status:false,message:"Invalid objectId from params"})

//     // }
//     // console.log(isValidObjectId(itemId));
//     // if (Object.keys(itemId).length===0){
//     //   return res
//     //   .status(400)
//     //   .json({ status: false, message: "give the id in param it should not empty" });
//     // }
//     console.log(isValidObjectId)

//     // if (!mongoose.Types.ObjectId.isValid(itemId)) {
//     //   return res.status(400).json({ error: 'Invalid ID format' });
//     // }

//     // if (!ObjectId.isValid(itemId)||itemId.trim() === ""&&itemId===undefined&&itemId.length===0) {
//     //   return res.status(400).json({ error: 'Invalid ID format' });
//     // }
//     console.log(itemId,"---hh---")

//     if (!itemId) {
//       throw new Error('ID parameter is empty');
//     }

//     if(!itemId===undefined&&null){
//        return res.status(400).json({ error: ' bad request give the id in params' });
//     }

//      console.log(itemId, "-----hh-----")
//     if ( !mongoose.Types.ObjectId.isValid(itemId)) {
//       return res.status(400).json({ error: 'Invalid or missing ID' });
//     }

//       if (!isValidObjectId(itemId) || itemId.trim() === ""&&itemId===undefined&&itemId.length===0) {
//         return res
//           .status(400)
//           .json({ status: false, message: "Invalid objectId from params" });
//       }
//     const item = await ItemModel.findById(itemId);

//     if (!item) {
//       return res
//         .status(404)
//         .json({ status: false, message: "Item not found " });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Item getById successfully get data",
//       data: item,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: false,
//       message: "An error occurred while trying to getItemById",
//     });
//   }
// };

// let isValid=(value)=>{
//   if(typeof value === "undefined"||value === null) return false;
//   if(typeof value==="string"&&value.trim().length===0) return false
//   if(value.length==0) return false
//   return true
// }

// let isValid = (value) => {
//   if (typeof value === "undefined" || value === null) return false;
//   if (typeof value === "string" && value.trim().length === 0) return false;
//   if (value.length === 0) return false;
//   return true;
// }

// const isValid = (value) => {
//   return !(value === undefined || value === null || (typeof value === 'string' && value.trim() === ''));
// };

export const getItemById = async (req, res) => {
  try {
    // let itemId = req.params.id;

    // if(!isValid(itemId.trim())){
    //   return res.status(400).json({ status: false, message: "param cannot empty provide something id" });

    // }

    const itemId = req.params.id;
    console.log(itemId);

    // if (!isValid(itemId)) {
    //   return res.status(400).json({ status: false, message: "Param 'id' cannot be empty. Provide a valid ID." });
    // }

    // if (itemId === undefined || itemId === null || !isValid(itemId)) {
    //   return res.status(400).json({ status: false, message: "Param 'id' cannot be empty. Provide a valid ID." });
    // }

    //     if (!isValid(itemId)) {
    //   return res.status(400).json({ status: false, message: "Param 'id' cannot be empty. Provide a valid ID." });
    // }

    // Check if itemId is not a valid ObjectId, is an empty string, or is undefined
    if (
      !isValidObjectId(itemId) ||
      itemId === undefined ||
      itemId.trim() === ""
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid objectId from params" });
    }

    const item = await ItemModel.findById(itemId);

    if (!item) {
      return res.status(404).json({ status: false, message: "Item not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Item getById successfully retrieved data",
      data: item,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "An error occurred while trying to getItemById",
    });
  }
};

// export const updateItem= async(req,res)=>{

//   // setOfRule by resFull api put http method
//   //NOT EXIST RESOUCE
//   // CREATE RESOUCE
//   //AND do UPDATE LAST IN THIS CASE
//   try {

//     let itemId=req.params.id;
//     let {name ,
//     surname ,
//     email,
//     dateOfBirth,
//     age,
//     description}=req.body;
//     if(!itemId.trim()===0   || !itemId===undefined){
//       return res.status(400).json({ status: false, message: "bad request " });
//     }

//     let userId= await findById(itemId);
//     if(!userId){
//       return res.status(404).json({ status: false,message:"userId is not found "})
//     }

//     let newData={name ,
//       surname ,
//       email,
//       dateOfBirth,
//       age,
//       description}

//     let newUser = await ItemModel.create(newData)

//     let upDateData = await ItemModel.findByIdAndUpdate(itemId, newUser,{new:true})

//   } catch (error) {
//     console.log(error.message,"update controller failed logic");

//   }
// }

// PUT

// export const updateItem = async (req, res) => {
//   try {
//     // Extract item ID from request parameters
//     const itemId = req.params.id;

//     // Destructure fields from request body
//     const { name, surname, email, dateOfBirth, age, description } = req.body;

//     // Validate that itemId is provided and not empty or undefined
//     if (!itemId || itemId.trim().length === 0) {
//       return res.status(400).json({ status: false, message: "Bad request" });
//     }

//     // Find the user by the provided itemId
//     const foundUser = await findById(itemId);

//     // Check if the user with the provided ID exists
//     if (!foundUser) {
//       return res.status(404).json({ status: false, message: "User not found" });
//     }

//     // Create a new data object with the provided fields
//     const newData = {
//       name,
//       surname,
//       email,
//       dateOfBirth,
//       age,
//       description,
//     };

//     // Create a new user in the database
//     const newUser = await ItemModel.create(newData);

//     // Update the existing user with the new data
//     const updatedUser = await ItemModel.findByIdAndUpdate(itemId, newUser, { new: true });

//     // Respond with the updated user data
//     res.json({ status: true, message: "User updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error(error.message, "Update controller failed logic");
//     res.status(500).json({ status: false, message: "Internal server error" });
//   }
// };

//---->

export const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, surname, email, dateOfBirth, age, description } = req.body;

    if (
      !isValidObjectId(itemId) ||
      itemId === undefined ||
      itemId.trim() === ""
    ) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid objectId from params" });
    }

    if (!itemId || itemId.trim().length === 0) {
      return res.status(400).json({ status: false, message: "Bad request" });
    }

    const existingItem = await ItemModel.findById(itemId);

    // if(mongoose.Types.ObjectId(existingItem)){
    //   return res.status(404).json({ status: false, message: "this id  not found in database"});
    // }

    // if (!mongoose.Types.ObjectId.isValid(existingItem)) {
    //   return res.status(400).json({ status: false, message: "Invalid ID format" });
    // }

    if (!existingItem) {
      // If the item does not exist, create a new one
      const newItemData = {
        name,
        surname,
        email,
        dateOfBirth,
        age,
        description,
      };

      const newItem = await ItemModel.create(newItemData);

      res.status(201).json({
        status: true,
        message: "Item created successfully",
        item: newItem,
      });
    } else {
      // If the item exists, update it with the new data
      const updatedItemData = {
        name,
        surname,
        email,
        dateOfBirth,
        age,
        description,
      };

      const updatedItem = await ItemModel.findByIdAndUpdate(
        itemId,
        updatedItemData,
        { new: true }
      );

      res.json({
        status: true,
        message: "Item updated successfully",
        item: updatedItem,
      });
    }
  } catch (error) {
    console.error(error.message, "Update controller failed logic");
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

// IMP

export let getUpdateById = async (req, res) => {
  try {
    let updateId = req.params.id;
    let { name, surname, email, dateOfBirth, age, description } = req.body;

    // not Right way to validate Before check id don't do this type
    // step->1 if checking objectid valid or not
    // step->2 not found give them status code and error
    // step->3 if exist id then goto the check validation if
    //step->4 if id ->right and if data isnot empty from req.body

    // if(!(name||surname||email||dateOfBirth||age||description)){
    //   return res.status(400).json({status:false,message:"if u r updating data so u have to provide data in req.body pls provide"})
    // }

    // isValidOjectId bydefault CHECK 24 character 0 to 9 {number },and {a to f } in that entire string
    console.log(updateId, "--h0--");
    if (
      !isValidObjectId(updateId) ||
      updateId === null ||
      updateId === undefined ||
      updateId.trim() === 0
    ) {
      return res.status(400).json({
        status: false,
        message: "invalid params pls provide valid object id",
      });
    }

    console.log(updateId, "h--1-h");

    let isExist = await ItemModel.findById(updateId);
    console.log(updateId, "h--2-h");

    if (!isExist) {
      return res.status(404).json({
        status: false,
        message: `this given id  ${isExist}-->not found`,
      });
    }

    if (isExist) {
      if (!(name || surname || email || dateOfBirth || age || description)) {
        return res.status(400).json({
          status: false,
          message:
            "if u r updating data so u have to provide data in req.body pls provide",
        });
      }
    }

    let newUpdateOne = await ItemModel.findByIdAndUpdate(updateId, req.body, {
      new: true,
    });
    return res.status(200).json({
      status: true,
      message: "User data updated successfully",
      data: newUpdateOne,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: false, message: "getUpdateById can't updatated" });
  }
};

export const deleteItem = async (req, res) => {
  try {
    let itemId = req.params.id;

    console.log(itemId,"---HH->1--")
        
    // if(!itemId){
    //   return res.status(400).json({
    //     status:false,
    //     message: "bad request provide some id in param"
    //   })
    // }
    console.log(itemId,"---HH->2---")

    if (
      !isValidObjectId(itemId) ||itemId === undefined ||itemId === null ||itemId.trim() === 0) {
      return res
        .status(400)
        .json({ status: false, message: " provide valid object id formate" });
    }
    console.log(itemId,"---HH->3--")

    let itemDelete = await ItemModel.findByIdAndDelete(itemId)
    console.log(itemId,"---HH->4--")

    if(!itemDelete){
       return res.status(404).json({
        status:false, message: "not found deleted item"
       })
    }
       // MAY BE IF U WANT TO RETURN IN RESPONCE  USED THIS STATUS CODE-->202
       // IF NO CONTENT RETURN IN BODY THEN U HAVE TO USED 204 ->NO CONTENT RETURN 
    return res.status(204).json({success:true,message: "item deleted successfully"})
  } catch (error) {
      console.log(error.message)
      return res.status(500).json({success:false,message:" deleting item logic error"})
  }
};
