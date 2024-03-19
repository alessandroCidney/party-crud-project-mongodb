<template>
  <div class="editparty">
    <h1>Edite a sua festa</h1>

    <PartyForm
      :key="componentKey"
      :party="party"
      btn-text="Editar Festa"
      page="editparty"
    />
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/main'

import PartyForm from '@/components/PartyForm.vue'

interface IParty {
  _id?: string
  title: string
  description: string
  partyDate: string
  photos: string[],
  privacy: boolean,
  userId?: string,
}

export default {
  name: 'EditPartyView',

  components: {
    PartyForm,
  },

  setup () {
    return {
      mainStore: useMainStore(),
    }
  },

  data () {
    return {
      party: {} as IParty,
      componentKey: 0,
    }
  },

  created () {
    // load party

    this.getParty()
  },

  methods: {
    async getParty () {
      const id = this.$route.params.id as string

      const token = this.mainStore.token

      try {
        if (!token) {
          throw new Error('User is not authenticated')
        }

        const response = await fetch(`http://localhost:3000/api/party/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          }
        })

        const responseData = await response.json()

        this.party = responseData.party
        this.party.partyDate = this.party.partyDate.substring(0, 10)

        this.party.photos = this.party.photos
          .map(photo => photo.replace('public', 'http://localhost:3000'))

        this.componentKey++
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<style scoped>
.editparty {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
}

.editparty h1 {
  margin-bottom: 40px;
}
</style>