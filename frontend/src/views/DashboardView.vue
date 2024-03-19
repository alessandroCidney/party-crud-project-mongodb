<template>
  <div class="dashboard">
    <div class="title-container">
      <h1>Gerencie seus eventos</h1>

      <router-link to="/newparty" class="btn">Cadastrar Festa</router-link>
    </div>

    <div v-if="parties.length > 0">
      <data-table
        :parties="parties"
        @remove="getParties"
      />
    </div>

    <div v-else>
      <p>Você ainda não tem festas cadastradas, </p>
      <router-link to="/newparty">
        clique aqui para criar a sua festa!
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import DataTable from '@/components/DataTable.vue'

import { useMainStore } from '@/stores/main'

export default {
  name: 'DashboardView',

  components: { DataTable },

  setup () {
    return {
      mainStore: useMainStore(),
    }
  },

  data () {
    return {
      parties: [],
    }
  },

  created () {
    // load user parties
    this.getParties()
  },

  methods: {
    async getParties () {
      const token = this.mainStore.token

      try {
        if (!token) {
          throw new Error('User is not authenticated')
        }

        const response = await fetch('http://localhost:3000/api/party/userparties', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          }
        })

        const responseData = await response.json()

        this.parties = responseData.parties
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
.dashboard {
  padding: 50px;
  padding-bottom: 100px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.btn {
  padding: 10px 16px;
  background-color: #000;
  color: #fff;
  margin: 5px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: .5s;
}

.btn:hover {
  background-color: #141619
}
</style>
