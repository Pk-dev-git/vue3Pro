<template>
    <div 
        class="alert toast-box"
        :class="`alert-${status}`"
        role="alert">
        {{ todoMessage }}
    </div>
</template>

<script>
// import { ref } from 'vue'

export default {
    props : {
        todoMessage : {
            type: String,
            required : true
        },
        status : {
            type: String,
            default : 'success'
        }
    },
    setup(props) {
        // const toastMessage = ref('')
    
        // toastMessage.value = props.todoMessage
        // return {
        //    toastMessage 
        // }
    },
}
</script>

<style>
    .toast-box {
        position : fixed;
        top : 10px;
        right : 10px;
    }
</style>