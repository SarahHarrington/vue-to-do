<template>
 <div>
  <input 
   type="text"
   v-model="todo" 
   placeholder="Add a Todo!"
   @keyup.enter="addTodo($event)"/>
 </div>
</template>

<script>
import axios from 'axios'
// import bus from './../bus.js'

export default {
 data() {
  return {
   todo: '',
  }
 },
 methods: {
  addTodo(event) {
   if (event) event.preventDefault()
   let url = 'http://localhost:4000/api/add'
   let param = {
    name: this.todo,
    done: 0
   }
   axios.post(url, param).then((response) => {
    console.log('response', response)
   }).catch((error) => {
    console.log('error', error)
   })
  }
 }
 
}
</script>

<style scoped>

</style>