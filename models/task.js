const mongoose = require('mongoose');
// creating the schema  for my db 
const taskschema=  new mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    category:{
       type:String,
       required:true

    }
});
//   creating the Task (the name of collection of taskschema)
const Task= mongoose.model('Task', taskschema);
// now export this Task collection
module.exports=Task;


