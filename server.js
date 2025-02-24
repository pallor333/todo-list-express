<<<<<<< HEAD
const express = require('express') //import express so it can be used
const app = express() //shorthand to call express 
const MongoClient = require('mongodb').MongoClient //import mongoDB
const PORT = 2121 //specify port to use
require('dotenv').config() //load .env

let db, //variable to hold database
    dbConnectionStr = process.env.DB_STRING, //get db connection string from env
    dbName = 'todo' //name of database

//connect to mongoDB using defined DB_string
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => { 
        console.log(`Connected to ${dbName} Database`) //successful connection = print db name
        db = client.db(dbName) //assign the connected db to a variable
    })
    
app.set('view engine', 'ejs') //set view engine to EJS for rendering templates
app.use(express.static('public')) //serve staic files from 'public' directory
app.use(express.urlencoded({ extended: true })) //parse URL-encoded request bodies (for form submissions)
app.use(express.json()) //parse json() request bodies

//define route for root URL ('/')
app.get('/',async (request, response)=>{
    //fetch all document from todos db and put them in an array
    const todoItems = await db.collection('todos').find().toArray()
    //count documents where 'completed' is false
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    //render index.ejs template, passing todo items and incompletes
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    /* db.collection('todos').find().toArray()
    .then(data => {
        db.collection('todos').countDocuments({completed: false})
        .then(itemsLeft => {
            response.render('index.ejs', { items: data, left: itemsLeft })
        })
    })
    .catch(error => console.error(error)) */
})

//Define a route to handle POST requests to '/addTodo'
app.post('/addTodo', (request, response) => {
    //Insert a new document into the 'todos' collection with the data from the request body
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        response.redirect('/') //redirect to root URL
=======
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
>>>>>>> 8247adf50f08bd10000a520d0c12dd01ccaa776b
    })
    .catch(error => console.error(error))
})

<<<<<<< HEAD
//Define a route to handle PUT requests to '/markComplete'
app.put('/markComplete', (request, response) => {
    //Update the first document that matches the 'thing' field from the request body
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true //Set the 'completed' field to true
          }
    },{
        sort: {_id: -1}, // Sort by _id in descending order (not necessary here)
        upsert: false // Do not create a new document if no match is found
    })
    .then(result => {
        console.log('Marked Complete') //print complete
        response.json('Marked Complete') //send JSON response for complete
=======
app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
>>>>>>> 8247adf50f08bd10000a520d0c12dd01ccaa776b
    })
    .catch(error => console.error(error))

})

<<<<<<< HEAD
// Define a route to handle PUT requests to '/markUnComplete'
app.put('/markUnComplete', (request, response) => {
    // Update the first document that matches the 'thing' field from the request body
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false //Set the 'completed' field to false
          }
    },{
        sort: {_id: -1}, // Sort by _id in descending order (not necessary here)
        upsert: false   //Do not create a new document if no match is found
    })
    .then(result => {
        console.log('Marked Complete') //log success
        response.json('Marked Complete') //send JSON response success
=======
app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
>>>>>>> 8247adf50f08bd10000a520d0c12dd01ccaa776b
    })
    .catch(error => console.error(error))

})

<<<<<<< HEAD
// Define a route to handle DELETE requests to '/deleteItem'
app.delete('/deleteItem', (request, response) => {
    // Delete the first document that matches the 'thing' field from the request body
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')  //log success
        response.json('Todo Deleted') //json response success
=======
app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
>>>>>>> 8247adf50f08bd10000a520d0c12dd01ccaa776b
    })
    .catch(error => console.error(error))

})

<<<<<<< HEAD
//start server and listen on specified port
=======
>>>>>>> 8247adf50f08bd10000a520d0c12dd01ccaa776b
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})