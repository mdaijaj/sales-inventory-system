const express= require('express')
const router=express()
const inventoryController= require('../controllers/inventory_controller')
const billingController= require('../controllers/billing_controller')


// Item Routes 
router.post('/api/createItems', inventoryController.createItems)
router.get('/api/getAllItemsList', inventoryController.getAllItems)
router.get('/api/getItemDetails/:id', inventoryController.getItemDetails)
router.put('/api/updateItemDetails/:id', inventoryController.updateItemDetail)
router.put('/api/deleteItemDetails/:id', inventoryController.deleteItemDetail)


// Sale Billing Routes 
router.post('/api/createBill', billingController.creteNewBill)
router.get('/api/getAllBillsList', billingController.getallBills)
router.get('/api/getBillDetails/:id', billingController.singleBillingDetails)
router.put('/api/updateBillingDetails/:id', billingController.updateBillingDetail)
router.put('/api/deleteBillingDetails/:id', billingController.deleteBillingDetails)


module.exports = router;