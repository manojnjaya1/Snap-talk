const mongoose = require('mongoose');
const DB= process.env.DB;
// console.log('DB is Connected');

mongoose.connect(DB).then(()=>{
    console.log('DB is Connected');
})
.catch((err)=>{
    console.log(err);
});