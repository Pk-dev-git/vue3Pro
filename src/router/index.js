import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/page/index.vue"
import Todos from "@/page/todos/index.vue"
import Todo from "@/page/todos/_id.vue"
//home //todos //todo detail

const router = createRouter({
    history : createWebHistory(), 
    routes : [
        {
            path : '/', 
            name : 'Home', 
            component : Home
        },
        {
            path : '/todos', 
            name : 'Todos', 
            component : Todos
        },
        {
            path : '/todos/:id', 
            name : 'Todo', 
            component : Todo
            
        }

    ]
})

export default router;