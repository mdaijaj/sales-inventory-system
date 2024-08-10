const express = require('express');
const inventoryModel= require('../models/inventory_schema');
const responseHandler = require('../utils/index')


// Add new item
const createItems= async (req, res) => {
  try {
    const itemExist= await inventoryModel.findOne({itemName: req.body.itemName})
    if(itemExist){
      return responseHandler.sendError(res, 409, 'Item Allready Exist!')
    }
    const item = new inventoryModel(req.body);
    let result=await item.save();
    console.log("result", result)
    if(result){
      responseHandler.sendSuccess(res , 200, `New Item Created Successfully`)
    }else{
      responseHandler.sendError(res, 404, 'Item Not Created!')
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
};


// Get all items
const getAllItems=  async (req, res) => {
  try {
    const items = await inventoryModel.find();
    if(items.length>0){
      responseHandler.sendSuccess(res , 200, `Item List Fetch Data Successfully!`, items)
    }else{
      responseHandler.sendError(res, 404, 'Item Not Found!', [])
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
}


// Get Single item Details
const getItemDetails=  async (req, res) => {
  try {
    const items = await inventoryModel.findById({_id: req.params.id});
    if(items){
      responseHandler.sendSuccess(res , 200, `Item List Fetch Data Successfully!`, items)
    }else{
      responseHandler.sendError(res, 404, 'Item Not Found!')
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
}


// update Item Details
const updateItemDetail = async (req, res, next) => {
  try {
      if (!req.params.id) {
          return responseHandler.sendError(res, 400, 'Item Id Missing')
      }
      const itemDetails = await inventoryModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec()
      if (itemDetails) {
          responseHandler.sendSuccess(res , 200, `Item  updated Successfully`)
      } else {
          responseHandler.sendError(res, 404, 'Item Details Not Updated!')
      }
  } catch (error) {
      responseHandler.sendError(res, 500, 'Internal Server Error!');
  }
}


// delete Item Details
const deleteItemDetail = async (req, res, next) => {
  try {
      if (!req.params.id) {
          return responseHandler.sendError(res, 400, 'Item Id Missing')
      }
      const itemDetails = await inventoryModel.findByIdAndDelete({ _id: req.params.id })
      if (itemDetails) {
          responseHandler.sendSuccess(res , 200, `Item  Deleted Successfully`)
      } else {
          responseHandler.sendError(res, 404, 'Item Details Not Updated!')
      }
  } catch (error) {
      responseHandler.sendError(res, 500, 'Internal Server Error!');
  }
}



module.exports = {
    getAllItems,
    createItems,
    getItemDetails,
    deleteItemDetail,
    updateItemDetail
}
