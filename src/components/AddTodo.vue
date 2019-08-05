<template>
  <div>
    <input 
      type="text" 
      v-model="todo" 
      placeholder="Add a Todo!" 
      @keyup.enter="addTodo($event)"
      class="add-todo" />
  </div>
</template>

<script>
import axios from 'axios'
import bus from './../bus.js'

export default {
  data() {
    return {
      todo: ""
    };
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();
      let url = "http://localhost:4000/api/add";
      let param = {
        name: this.todo,
        done: 0
      };
      axios
        .post(url, param)
        .then(response => {
          console.log("response", response);
          this.clearTodo();
          this.refreshTodo();
        })
        .catch(error => {
          console.log("error", error);
        });
    }, 
    clearTodo() {
      this.todo = ''
    },
    refreshTodo() {
      bus.$emit('refreshTodo')
    }
  }
};
</script>

<style scoped>
  .add-todo {
    width: 80%;
  }
</style>