<template>
  <div>
    <Message :msg="msg" :msgClass="msgClass" />

    <form
      id="user-form"
      @submit.prevent="page === 'register' ? register($event) : update($event)"
    >
      <input
        v-model="id"
        type="hidden"
        name="id"
        id="id"
      >
      
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
import { useMainStore } from '@/stores/main'

import InputSubmit from './form/InputSubmit.vue'
import Message from './Message.vue'

export default {
  name: 'RegisterForm',

  components: { InputSubmit, Message },

  props: ['user', 'page', 'btnText'],

  setup () {
    const mainStore = useMainStore()
    return { mainStore }
  },

  data () {
    return {
      id: this.user._id || null,
      name: this.user.name || null,
      email: this.user.email || null,
      password: null,
      confirmpassword: null,

      msg: null as string | null,
      msgClass: null as string | null,
    }
  },

  methods: {
    async register (e: Event) {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmpassword: this.confirmpassword,
      }

      const jsonData = JSON.stringify(data)

      try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
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

    async update (e: Event) {
      const data = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: this.password,
        confirmpassword: this.confirmpassword,
      }

      const jsonData = JSON.stringify(data)

      const token = this.mainStore.token

      if (!token) {
        throw new Error('The user is not authenticated!')
      }

      try {
        const response = await fetch('http://localhost:3000/api/user', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
          body: jsonData,
        })

        const responseData = await response.json()

        if (responseData.error) {
          this.msg = responseData.error
          this.msgClass = 'error'
        } else {
          this.msg = responseData.msg
          this.msgClass = 'success'
        }

        setTimeout(() => {
          this.msg = null
        }, 2000)
      } catch (err) {
        console.log(err)
      }
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