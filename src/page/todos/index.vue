<template>
  <div class="container">
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
import { ref, computed, onBeforeMount, watch } from 'vue'
import todoForm from '@/components/todoForm.vue'
import todoList from '@/components/todoList.vue'
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

    //reactive , props, computed 감시
    // watchEffect(() => {
    //   console.log("watchEffect") 
    //   console.log(tempData.value)
    // })

    //로그인 자릿수 체크 
    watch([tempData, searchText], (newData, oldData) =>{
      console.log("watch call tempdata")
      console.log(newData, oldData)
    })


    onBeforeMount(() => {
      console.log('onBeforeMount')
      getTodos()
    });
   
    const getTodos = async () => {
      try{
        const res = await axios.get("http://localhost:3000/todos") 
        todos.value = res.data
      } catch (err) {
        console.log("something error")
      }
    }

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
    
    const onDelete = async (index) => {
      const id = todos.value[index].id
      try{
        await axios.delete("http://localhost:3000/todos/" + id)
        todos.value.splice(index, 1) 
      }catch (err){
        console.log("something error")
      }

    }

    const toggleTodo = async (index) => {
      tempData.value = 2
      const id = todos.value[index].id

      try {
        await axios.patch("http://localhost:3000/todos/" + id, {
          completed : !todos.value[index].completed
        })
        
        todos.value[index].completed = !todos.value[index].completed
      } catch (err) {
        console.log("something error")
      }

      
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

