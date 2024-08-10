const mongoose=require('mongoose');

let url=process.env.DATABASE || "mongodb://localhost:27017/inventory-billing";

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
}).then(()=>{
    console.log("db connected successfully!")
}).catch((err)=>{
    console.log("errro while connected db,........")
    console.log(err.message)
})


module.exports=mongoose;