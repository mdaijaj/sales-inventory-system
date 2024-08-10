const BillModel = require('../models/billing_schema');
const InventaryModel = require('../models/inventory_schema');
const responseHandler = require('../utils/index')

// Create a new bill
const creteNewBill= async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;

    // Validate and update inventory
    for (const entry of items) {
      const item = await InventaryModel.findById(entry.itemId);
      if (!item || item.quantity < entry.quantity) {
        return responseHandler.sendError(res, 404, 'Insufficient stock or item not found!')
      }

      totalAmount += item.price * entry.quantity;
      item.quantity -= entry.quantity;
      await item.save();
    }

    // Create bill
    const bill = new BillModel({ items, totalAmount });
    const result= await bill.save();
    if(result){
      responseHandler.sendSuccess(res , 201, `New Bill Generated Successfully`, bill)
    }else{
      responseHandler.sendError(res, 404, 'Bill Not Generated!')
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
}


// Get all bills
const getallBills= async (req, res) => {
  try {
    const bills = await BillModel.find()
    if(bills.length>0){
      responseHandler.sendSuccess(res , 200, `All Bill List Fetch Successfully`, bills)
    }else{
      responseHandler.sendError(res, 404, 'Bill Not Found!', [])
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
}


// Get specific bill
const singleBillingDetails= async (req, res) => {
  try {
    const bill = await BillModel.findById(req.params.id)
    .populate('items.itemId');
    if (bill) {
      responseHandler.sendSuccess(res , 200, `Bill Fetch Details Successfully`, bill)
    }else{
      responseHandler.sendError(res, 404, 'Bill Details Not Found!')
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
}


// delete specific bill
const deleteBillingDetails= async (req, res) => {
  try {
    const bill = await BillModel.findByIdAndDelete({_id:req.params.id})
    if (bill) {
      responseHandler.sendSuccess(res , 200, `Bill Deleted successfully`)
    }else{
      responseHandler.sendError(res, 404, 'Bill Details Not Found!')
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
}


// updated specific bill
const updateBillingDetail = async (req, res) => {
    const { items } = req.body;
    const billId = req.params.id;

  try {
    const existingBill = await BillModel.findById(billId);
    if (!existingBill) {
      return responseHandler.sendError(res, 404, 'Bill Details Not Found!')
    }

    let totalAmount = 0;
    // Update inventory based on previous items
    for (const entry of existingBill.items) {
      const item = await InventaryModel.findById(entry.itemId);
      if (item) {
        item.quantity += entry.quantity; // Restore old quantity to the inventory
        await item.save();
      }
    }

    // Update inventory based on new items
    for (const entry of items) {
      const item = await InventaryModel.findById(entry.itemId);
      if (item) {
        item.quantity -= entry.quantity; // duduction new quantity from the inventory
        if (item.quantity < 0) {
          return responseHandler.sendError(res, 404, `Insufficient stock for item: ${item.name}`)          
        }
        await item.save();
        totalAmount += item.price * entry.quantity;
      } else {
        return responseHandler.sendError(res, 404, 'Bill Not Generated!')
      }
    }

    // Update the bill
    existingBill.items = items;
    existingBill.totalAmount = totalAmount;
    const billSave= await existingBill.save();
    if(billSave){
      responseHandler.sendSuccess(res, 200, `Bill Updated Successfully`, existingBill)
    }else{
      return responseHandler.sendError(res, 404, 'Bill Not Found!')
    }
  } catch (error) {
    responseHandler.sendError(res, 500, 'Internal Server Error')
  }
}


module.exports = {
    creteNewBill,
    singleBillingDetails,
    deleteBillingDetails,
    updateBillingDetail,
    getallBills
}
