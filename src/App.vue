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
</template>

<script>


export default {
  setup() {
   
    return {
    
    }
  }
}
</script>

<style>

</style>

