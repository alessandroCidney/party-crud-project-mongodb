<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />

    <form
      id="login-form"
      @submit.prevent="login"
    >
      <div class="input-container">
        <label for="email">E-mail:</label>

        <input
          v-model="email"
          placeholder="Digite o seu e-mail"
          type="email"
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

      <InputSubmit
        text="Entrar"
      />
    </form>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/main'

import InputSubmit from './form/InputSubmit.vue'
import Message from './Message.vue'

export default {
  name: 'LoginForm',

  components: {
    InputSubmit,
    Message,
  },

  setup () {
    const mainStore = useMainStore()
    return { mainStore }
  },

  data () {
    return {
      email: null,
      password: null,
      msg: null,
      msgClass: null as string | null,
    }
  },

  methods: {
    async login (e: Event) {
      const data = {
        email: this.email,
        password: this.password,
      }

      const jsonData = JSON.stringify(data)

      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: jsonData,
        })

        const responseData = await response.json()

        let auth = false

        if (responseData.error) {
          this.msg = responseData.error
          this.msgClass = 'error'
        } else {
          auth = true
          this.msg = responseData.msg
          this.msgClass = 'success'

          // emit event for auth an user
          this.mainStore.authenticate({
            userId: responseData.userId,
            token: responseData.token,
          })
        }

        setTimeout(() => {
          if (!auth) {
            this.msg = null
          } else {
            this.$router.push('dashboard')
          }
        }, 2000)
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<style scoped>
#login-form {
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
