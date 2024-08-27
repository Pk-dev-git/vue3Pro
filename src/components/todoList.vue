<template>
    <div
      v-for="(todo, index) in todos"
      :key="todo.id"
      class="card mt-2"
    >
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input"
            type="checkbox"
            :value="todo.completed"
            @change="toggleTodo(index)"
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
            @click="cOnDelete(index)"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>        
</template>

<script>
export default {
    props : {
        todos : {
            type: Array,
            required : true
        }
    },
    emits : ["c-delete", "c-toggleTodo"],
    setup(props, { emit }) {
      const cOnDelete = (index) => {
        emit("c-delete", index)
      }
      const toggleTodo = (index) => {
        emit("c-toggleTodo", index)
      }

      return {
        cOnDelete,
        toggleTodo
      }
    },
}
</script>

<style>

</style>