const mongoose=require('mongoose');
//  to connect the database
mongoose.connect('mongodb://localhost/todo_App');
mongoose.set("useFindAndModify", false);
// acquired the connection (to check is functioning)
const db=mongoose.connection;
// if connection is failed
db.on('error', console.error.bind(console, 'connection error:'));
// for sucessful connection
db.once('open', function() {
  console.log('we are connecting to the db')
});
