//require the just installed express app 
const express = require('express');
// require just to use in the middleware's
var bodyParser = require("body-parser");
// this is my active port number
const port= 8000;
const db =require('./config/mongoose');
const Task=require('./models/task');
//then we call express to initialise
var app = express();
app.use(express.static('assests'));
// we use ejs as a templating language 
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }));
//takes us to the root(/) URL
app.get('/', function (req, res) {
//when we visit the root URL express will render with home.ejs (as a html file)
 Task.find({}, function(err,tasks){
   if(err){
     return console.log('error in fetching the data fro db');
   }
   return res.render('home',{
    title:"myapp",
    todoTasks:tasks
   });

 });
});
// this is adding the task
app.post('/addtask', function (req, res) {

 Task.create({
   task:req.body.task,
   date:req.body.date,
   category:req.body.category
 },function(err,newtask){
   if(err){
     return console.log("error in creating new task");
   }
   console.log(newtask);
   return res.redirect('/');
 });
});
//  this is update the task or edit

app.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
Task.find({}, (err, tasks) => {
res.render("edit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
Task.findByIdAndUpdate(id, {task : req.body.task }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});
// to remove the task by id, we use query instead of param
app.get('/remove',function(req, res) {
  let id =req.query.id;
    Task.findByIdAndDelete(id,function(err){
        if(err){
            return console.log("error in deleteing");
        }
        return res.redirect('back');

    });
  });
//the server is listening on port 8000 for connections
app.listen(process.env.PORT || port, function(err){
    if(err){
        console.log('error');
        return ;
    }
    console.log('my express server is up and running on port number',port);
   
   });
