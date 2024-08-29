<template>
    <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-2"
    >
      <div class="card-body p-2 d-flex align-items-center"
        @click.stop="moveTodoDetail(todo.id)"
      >
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input"
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(index)"
            @click.stop
          >
          <label
            class="form-check-label"
            :class="{ todo:todo.completed }"
          >
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="cOnDelete(index)"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>        
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    props : {
        todos : {
            type: Array,
            required : true
        }
    },
    emits : ["c-delete", "c-toggleTodo"],
    setup(props, { emit }) {
      const router = useRouter()

      const cOnDelete = (index) => {
        emit("c-delete", index)
      }
      const toggleTodo = (index) => {
        emit("c-toggleTodo", index)
      }
      const moveTodoDetail = (todoId) =>{
        console.log("moveTodoDetail")
        router.push(
          {
            name : 'Todo',
            params : {
              id : todoId
            } 
          }
        )
      }

      return {
        cOnDelete,
        toggleTodo,
        moveTodoDetail
      }
    },
}
</script>

<style>

</style>