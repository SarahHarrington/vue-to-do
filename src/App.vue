<template>
  <div id="app">
    <h1>Heyo</h1>
    <AddTodo></AddTodo>
    <TodoList></TodoList>
  </div>
</template>

<script>
  import TodoList from './components/TodoList.vue'
  import AddTodo from './components/AddTodo'

  export default {
    name: 'app',
    components: {TodoList, AddTodo}
  }
</script>

<style>

</style>
