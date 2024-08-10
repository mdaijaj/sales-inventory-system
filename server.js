const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const db = require('./database/db');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let routes=require('./routes/index')
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});