<template>
    <form 
      class="d-flex" 
      @submit.prevent="onSubmit">
      <div 
        class="flex-grow-1 me-2">
        <input 
          class="form-control" 
          placeholder="To do List"
          :type="type" 
          v-model="todo">
      </div>
      <div>
        <button 
          class="btn btn-primary"
          type="submit">
          add
        </button>
      </div>
    </form>
    <div 
      v-show="hasError"
    >
      empty has error
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    emits : ['c-addTodo'],
    setup(props, { emit }) {
        const todo = ref('')
        const hasError = ref(false)

        const onSubmit = () => {
            console.log("call onSubmit")
            if(todo.value === ""){
                hasError.value = true
            }else {
                //
                emit('c-addTodo', {
                    id : Date.now(),
                    subject : todo.value,
                    completed : false
                })

                hasError.value = false
                todo.value = ""
            }
        }
        
        return {
            todo, 
            hasError,
            onSubmit
        }
    }
}
</script>

<style>

</style>