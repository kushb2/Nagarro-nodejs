/* require package
1. express - web appserver
2. nodemon for update data in running server
3. body-parser - parse data from post put command
 */

/*
1. create the database for todos seed.js
 */
var express = require("express");
var bodyparser = require("body-parser");
var db = require("./seed");
var app = express();
app.listen(4000);
app.use("/",express.static(__dirname + "/public"));
// for a resquest on res.send work
// print on console for server side to check what request
// is made.
// root request get - get data
app.get("/",function (req,res) {
    res.send(db.todoList);
});

app.get("/api/todos",function (req,res) {
    res.send(db.todoList);
});

app.use("/",bodyparser.urlencoded({extended : false}));

app.put("/api/todos/:id",function (req,res) {
    //console.log("bhiwani");
    const id = req.params.id;
    //console.log(id);
    //console.log("hello yea");
    if (db.todoList[id] === undefined) {
        res.status(400).send('Bad request');
    }
    else {
        if (db.todoList[id].status === db.statusEnum.ACTIVE) {
            db.todoList[id].status = db.statusEnum.COMPLETE;
        }
        else
            db.todoList[id].status = db.statusEnum.ACTIVE;
        let result = {};
        result[id] = db.todoList[id];
      //  console.log("sss");
        res.send(result);
    }
});






app.post('/api/todos',function (req,res) {
    let data = req.body.title;
   // console.log("hello post");
     if(data === undefined || data.trim() === ''){
         res.status(400).send("Bad RRequest");
     }
     else{
         let newData = {
             title : data,
             status : db.statusEnum.ACTIVE
         };
         let id = db.nextId;
         db.todoList[id] = newData;
         db.nextId = id+1;
         let resut = {};
         resut[id] = db.todoList[id];
         res.send(resut);
    }
});


app.delete("/api/todos/:id",function (req,res) {
   const  id = req.params.id;
   if(db.todoList[id] === undefined){
       res.status(400).send("Bad Request");
   }
   else{
       let status = db.todoList[id].status;
       db.todoList[id].status = db.statusEnum.DELETE;
       res.send({status : status , todo : db.todoList[id]});
   }
});

