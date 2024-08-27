<template>
  <div class="container">
    <!-- <div>
      <h4>temp data : {{ tempData }}</h4>
      <h4>function data : {{ tempDoblue() }}</h4>
      <h4>function data : {{ tempDoblue() }}</h4>
      <h4>computed data : {{ tempDoblueCom }}</h4>
      <h4>computed data : {{ tempDoblueCom }}</h4>
      <button
        @click="tempData++"
      >
        click
      </button>
    </div> -->
    <h2>Todo-List</h2>
    <input 
      class="form-control" 
      :type="text" 
      v-model="searchText"
      placeholder="search"
    >
    <hr>
    <todoForm 
      @c-addTodo="addTodo" 
    />
    <div 
      v-show="!filterTodos.length">
      NO DATA
    </div>
    <todoList 
      :todos="filterTodos" 
      @c-delete="onDelete"
      @c-toggleTodo="toggleTodo"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import todoForm from './components/todoForm.vue'
import todoList from './components/todoList.vue'
import axios from 'axios'

export default {
  components : {
    todoForm,
    todoList
  },
  setup() {
    const tempData = ref(1)

    const searchText = ref('')
    
    const todos = ref([
    ])

    const addTodo = async (data) => {
      //데이터베이스 등록
      try {
        const res = await axios.post("http://localhost:3000/todos", {
          subject : data.subject,
          completed : data.completed
        })
        
        todos.value.push(res.data)
      }catch(err){
        console.log(err)
      } 

      
    }

    const todoStyle = {
      textDecoration : 'line-through',
      color:'red'
    }    
    
    const onDelete = (index) => {
      console.log("click delete", index)
      todos.value.splice(index, 1) 
    }

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    }

    const filterTodos = computed(() => {
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value)
        })
      }

      return todos.value
    }) 

    //fucntion
    const tempDoblue = () => {
      console.log("tempDoblue call")
      return tempData.value *2
    }

    const tempDoblueCom = computed(() => {
      console.log("tempDoblueCom call")
      return tempData.value *2
    })

    return { 
      tempData,     
      todos,
      todoStyle,
      searchText,
      onDelete,
      addTodo,
      toggleTodo,
      tempDoblue,
      tempDoblueCom,
      filterTodos
    }
  }
}
</script>

<style>

  .todo {
    text-decoration : line-through;
    color: red;
  }

</style>

