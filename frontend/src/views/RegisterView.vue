<template>
  <div class="register">
    <h1>Criar uma conta</h1>

    <UserForm
      page="register"
      btn-text="Cadastrar"
      :user="{}"
    />
  </div>
</template>

<script lang="ts">
import UserForm from '@/components/UserForm.vue'

export default {
  name: 'RegisterView',

  components: { UserForm },
}
</script>

<style scoped>
  .register {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 100px;
  }

  .register h1 {
    margin-bottom: 40px;
  }
</style>