<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />

    <form id="user-form" @submit.prevent="page === 'register' ? register($event) : update($event)">
      <div class="input-container">
        <label for="name">Nome:</label>

        <input
          v-model="name"
          placeholder="Digite o seu nome"
          type="text"
          name="name"
          id="name"
        >
      </div>

      <div class="input-container">
        <label for="email">E-mail:</label>

        <input
          v-model="email"
          placeholder="Digite o seu e-mail"
          type="text"
          name="email"
          id="email"
        >
      </div>

      <div class="input-container">
        <label for="password">Senha:</label>

        <input
          v-model="password"
          placeholder="Digite a sua senha"
          type="password"
          name="password"
          id="password"
        >
      </div>

      <div class="input-container">
        <label for="confirmpassword">Confirmar senha:</label>

        <input
          v-model="confirmpassword"
          placeholder="Confirme a sua senha"
          type="password"
          name="confirmpassword"
          id="confirmpassword"
        >
      </div>

      <input-submit :text="btnText" />
    </form>
  </div>
</template>

<script lang="ts">
import InputSubmit from './form/InputSubmit.vue'
import Message from './Message.vue'

export default {
  name: 'RegisterForm',

  components: { InputSubmit, Message },

  props: ['user', 'page', 'btnText'],

  data () {
    return {
      name: null,
      email: null,
      password: null,
      confirmpassword: null,

      msg: null,
      msgClass: null,
    }
  },

  methods: {
    register (e: Event) {
      window.alert('test')
    },

    update (e: Event) {

    },
  }
}
</script>

<style scoped>
#user-form {
  max-width: 400px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}

.input-container {
  display: flex;
  flex-direction: column;

  margin-bottom: 15px;
  text-align: left;
}

.input-container label {
  margin-bottom: 10px;
  color: #555;
}

.input-container input {
  padding: 10px;
  border: 1px solid #e8e8e8;
}
</style>