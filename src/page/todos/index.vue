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
  <toast
    v-if="showToast"
    :todoMessage="message"
    :status="status"
  />
</template>

<script>
import { ref, computed, onBeforeMount, watch } from 'vue'
import todoForm from '@/components/todoForm.vue'
import todoList from '@/components/todoList.vue'
import axios from '@/axios'
import toast from '@/components/toast.vue'
import { useStore } from 'vuex'

export default {
  components : {
    todoForm,
    todoList,
    toast
  },
  setup() {
    const store = useStore()

    const tempData = ref(1)

    const searchText = ref('')
    
    const todos = ref([
    ])

    //toast
    // const showToast = computed(() => store.state.showToast)
    // const message = computed(() => store.state.message)
    // const status = computed(() => store.state.status)
    const showToast = computed(() =>store.state.showToast)
    const message = computed(() => store.state.message)
    const status = computed(() => store.state.status)
  

    // const tiggerToast = (msg, type='success') => {
    //   message.value = msg
    //   status.value = type
    //   showToast.value = true
    //   setTimeout(() => {
    //     message.value = ''
    //     status.value = ''
    //     showToast.value = false
    //   }, 3000)
    // }

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
        const res = await axios.get("todos") 
        todos.value = res.data
      } catch (err) {
        console.log("something error")
      }
    }

    const addTodo = async (data) => {
      //데이터베이스 등록
      try {
        const res = await axios.post("todos", {
          subject : data.subject,
          completed : data.completed
        })
        todos.value.push(res.data)
        store.dispatch("tiggerToast", "success", "success")
      }catch(err){
        store.dispatch("tiggerToast", "fail", "danger")
      } 
    }

    const todoStyle = {
      textDecoration : 'line-through',
      color:'red'
    }    
    
    const onDelete = async (index) => {
      const id = todos.value[index].id
      try{
        await axios.delete("todos/" + id)
        todos.value.splice(index, 1) 
      }catch (err){
        console.log("something error")
      }

    }

    const toggleTodo = async (index) => {
      tempData.value = 2
      const id = todos.value[index].id

      try {
        await axios.patch("todos/" + id, {
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
      showToast,
      status,
      message,
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

