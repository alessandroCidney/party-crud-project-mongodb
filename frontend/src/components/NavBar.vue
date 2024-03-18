<template>
  <div id="nav">
    <router-link to="/" id="logo-container">
      <img src="/img/partytimelogo.png" alt="Party Time">
    </router-link>

    <h2 id="nav-title">Party Time</h2>

    <div id="nav-links">
      <router-link
        to="/"
      >
        Home
      </router-link>

      <router-link
        v-show="!isAuthenticated"
        to="/login"
      >
        Entrar
      </router-link>

      <router-link
        v-show="!isAuthenticated"
        to="/register"
      >
        Cadastrar
      </router-link>

      <router-link
        v-show="isAuthenticated"
        to="/dashboard"
      >
        Dashboard
      </router-link>

      <router-link
        v-show="isAuthenticated"
        to="/profile"
      >
        Configurações
      </router-link>

      <button
        v-show="isAuthenticated"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/main'

export default {
  name: 'NavBar',

  setup () {
    return {
      mainStore: useMainStore(),
    }
  },

  computed: {
    isAuthenticated () {
      return this.mainStore.authenticated
    },
  },

  methods: {
    logout (e) {
      this.mainStore.logout()

      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

#nav a {
  text-decoration: none;
  margin-right: 15px;
}

#nav img {
  width: 35px;
}

#nav-title {
  font-size: 3rem;
  font-weight: 300;
}

#logo-container, #nav-links {
  width: 400px;
}

#nav-links {
  display: flex;
  justify-content: flex-end;
}

button {
  background-color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  color: #c1b696;
}
</style>