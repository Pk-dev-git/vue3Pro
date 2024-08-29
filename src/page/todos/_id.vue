<template>
    <div class="container">
        <h1>To-do Detail</h1> 
        <div v-if="loading">loading ....</div> 
        <form v-else>
            <div class="form-group">
                <label>Subject</label>
                <input 
                    type="text"
                    class="form-control"
                    v-model="todo.subject"
                >
            </div>
            <button 
                class="btn btn-primary mt-2 me-2"
                :disabled="!todoUpdate"
                @click="onSave()"
            >Save</button>
            <button 
                class="btn btn-danger mt-2"
                @click="moveTodoList()"
            >cancel</button>
        </form>
    </div>
    

</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, computed } from 'vue' 
import _ from 'lodash'

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const todo = ref()
        const originalTodo = ref() 
        
        const loading = ref(true)

        const getTodo = async () => {
            const res = await axios.get("http://localhost:3000/todos/" + route.params.id)
            todo.value = {...res.data}
            originalTodo.value = {...res.data}
            loading.value = false
        }

        getTodo()
            
        const onSave = () => {
            // 숙제
            // const res = await axios.put("http://localhost:3000/todos/" + route.params.id)
            // todo.value = res.data
            // loading.value = false
        }

        const moveTodoList = () => {
            router.push({
                name:'Todos'
            })
        }
        
        const todoUpdate = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value)
        })

        return {
            todo,
            loading,
            onSave,
            todoUpdate,
            moveTodoList
        }

    },
}
</script>

<style>

</style>