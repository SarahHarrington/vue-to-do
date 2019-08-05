<template>
 <div>
  <h2>Things to do!</h2>
  <div v-for="todo in todos" v-bind:key="todo._id">
   <input 
    type="checkbox"
    class="checkbox"
    v-model="todo.done" 
    :checked="todo.done"
    v-on:change="updateTodo(todo)">
   <input 
    type="text"
    class="todo-item"
    v-model="todo.name"
    v-on:change="updateTodo(todo)"
    v-show="todo.edit">
    <div
     v-on:click="todo.edit = true"
     v-show="!todo.edit"> {{todo.name}}
    </div>
   <button v-on:click="deleteTodo(todo)">Delete</button>
  </div>
 </div>
 
</template>

<script>
import axios from 'axios'
import bus from './../bus.js'

export default {
 data() {
  return {
   todos: [],
  }
 },
 created: function () {
  this.getTodos()
  this.listenToEvents();
 },
 methods: {
  getTodos() {
   let uri = 'http://localhost:4000/api/all'
   axios.get(uri).then((response) => {
    this.todos = response.data
   })
  },
  updateTodo(todo) {
   let id = todo._id
   let uri = 'http://localhost:4000/api/updateTodo/' + id
   todo.edit = false;
   axios.post(uri, todo).then((response) => {
    console.log(response)
    this.getTodos()
   }).catch((error) => {
    console.log(error)
   })
  },
  deleteTodo(todo) {
   let id = todo._id
   let uri = 'http://localhost:4000/api/deleteTodo/' + id

   axios.post(uri)
   this.getTodos()
  },
  listenToEvents() {
   bus.$on('refreshTodo', ($event) => {
    this.getTodos()
   })
  },
  todoEdit(todo) {
   console.log('todo', todo)
   todo.edit = true;
  }
 }
}
</script>

<style scoped>
 .todo-item {
  width: 80%;
  height: 2rem;
 }
</style>
