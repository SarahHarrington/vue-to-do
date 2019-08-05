const express = require('express')
const todoRoutes = express.Router()
const todo = require('./Todo')

todoRoutes.route('/all').get(function (req, res, next) {
 todo.find(function (err, todos) {
  if (err) {
   return next(new Error(err))
  }
  res.json(todos)
 })
})

todoRoutes.route('/add').post(function (req, res) {
 todo.create(
  {
   name: req.body.name,
   done: false
  },
  function (err, todo) {
   if (err) {
    res.sendStatus(400).send('unable to create todo')
    return
   }
   res.sendStatus(200)
  }
 )
})

todoRoutes.route('/updateTodo/:id').post(function(req, res, next) {
 let id = req.params.id
 todo.findById(id, function (error, todo) {
  if (error) {
   return next(new Error('Todo not found'))
  } else {
   console.log('the todo', todo)
   todo.name = req.body.name 
   todo.done = req.body.done

   todo.save({
    function (error, todo) {
     if (error){
      res.sendStatus(400).send('Unable to update todo')
     } else {
      res.sendStatus(200)
     }
    }
   })
  }
 })
})

todoRoutes.route('/deleteTodo/:id').post(function (req, res, next) {
 let id = req.params.id

 console.log('the id', id)

 todo.findByIdAndRemove(id, function (error, todo) {
  if (error) {
   return next(new Error('Could not delete to do'))
  }
  res.sendStatus(200)
 })
})


module.exports = todoRoutes