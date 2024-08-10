const mongoose = require('mongoose');

const inventarySchema = new mongoose.Schema({
    itemName: { 
        type: String, 
        required: true 
    },
    description: {
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
},{
    timestamps: true
}
);

module.exports = mongoose.model('inventary', inventarySchema);