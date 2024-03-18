<template>
  <div class="profile">
    <h1>Edite seu perfil</h1>

    <UserForm
      :key="componentKey"
      :user="user"
      btn-text="Editar"
      page="profile"
    />
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/main'

import UserForm from '../components/UserForm.vue'

export default {
  name: 'ProfileView',

  components: {
    UserForm,
  },

  setup () {
    return {
      mainStore: useMainStore(),
    }
  },

  data () {
    return {
      user: {},
      componentKey: 0,
    }
  },

  created () {
    // load user
    this.getUser()
  },

  methods: {
    async getUser () {
      // get id from token

      const id = this.mainStore.userId
      const token = this.mainStore.token

      try {
        if (!id || !token) {
          throw new Error('The user is not authenticated!')
        }

        const response = await fetch(`http://localhost:3000/api/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          }
        })

        const responseData = await response.json()

        this.user = responseData.user

        this.componentKey++
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<style scoped>
.profile {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
}

.profile h1 {
  margin-bottom: 40px;
}
</style>
