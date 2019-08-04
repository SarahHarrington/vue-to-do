<template>
 <div>
  <h2>Things to do!</h2>
  <div v-for="todo in todos">
   <input 
    type="checkbox" 
    v-model="todo.done" 
    :checked="todo.done"
    v-on:change="updateTodo(todo)">
   <input 
    type="text" 
    v-model="todo.name"
    v-on:change="updateTodo(todo)">
  </div>
 </div>
 
</template>

<script>
import axios from 'axios'
import bus from './../bus.js'

export default {
 data() {
  return {
   todos: []
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

   axios.post(uri, todo).then((response) => {
    console.log(response)
   }).catch((error) => {
    console.log(error)
   })
  },
  listenToEvents() {
   bus.$on('refreshTodo', ($event) => {
    this.getTodos()
   })
  }
 }
}
</script>

<style scoped>

</style>
