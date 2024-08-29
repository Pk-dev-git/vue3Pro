<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Logo</router-link>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/todos">Todos</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
  <toast
    :todoMessage="message"
    :status="status"
  />
</template>

<script>
import toast from '@/components/toast.vue'
import { ref } from 'vue'

export default {
  components: {
    toast
  },
  setup() {
    const message = ref('success')
    const status = ref('danger')
    
    return {
      message,
      status
    }
  }
}
</script>

<style>

</style>

