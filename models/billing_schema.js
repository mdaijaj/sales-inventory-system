const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    items: [{
            itemId: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'inventary'
            },
            quantity: {
                type: Number, 
                required: true 
            },
        }],
    totalAmount: { 
        type: Number, 
        required: true 
    },
},{
    timestamps: true
});

module.exports = mongoose.model('bill', billSchema);
