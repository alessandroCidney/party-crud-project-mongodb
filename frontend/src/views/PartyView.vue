<template>
  <div class="party">
    <h1>{{ party.title }}</h1>

    <div class="party-container">
      <div
        v-if="party.photos && party.photos.length > 0"
        class="party-images"
      >
        <div
          :style="{
            backgroundImage: `url(${ party.photos[0] })`
          }"
          class="main-image"
        />

        <div
          v-if="party.photos[1]"
          class="party-mini-images"
        >
          <div
            v-for="(photo, index) in party.photos.slice(1, party.photos.length)"
            :key="index"
            :style="{
              backgroundImage: `url(${ photo })`
            }"
            class="mini-image"
          />
        </div>
      </div>

      <div class="party-details">
        <p class="bold">Descrição da festa:</p>
        <p class="party-description">{{ party.description }}</p>

        <p class="bold">Data da festa:</p>
        <p class="party-date">{{ party.partyDate }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/main'

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
  name: 'PartyView',

  setup () {
    return {
      mainStore: useMainStore(),
    }
  },

  data () {
    return {
      party: {} as IParty,
    }
  },

  created () {
    // load party

    this.getParty()
  },

  methods: {
    async getParty () {
      const id = this.$route.params.id as string
      const token = this.mainStore.token || ''
      
      try {
        const response = await fetch(`http://localhost:3000/api/party/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        })

        const responseData = await response.json()

        if (responseData.error != null) {
          this.$router.push('/')
        }

        this.party = responseData.party

        this.party.partyDate = new Date(this.party.partyDate).toLocaleDateString()

        this.party.photos = this.party.photos
          .map(
            photo => this.replaceAll(
              photo.replace('public', 'http://localhost:3000'), // .replaceAll('\\', '/'),
              '\\',
              '/'
            )
          )
      } catch (err) {
        console.log(err)
      }
    },

    escapeRegExp (string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    },

    replaceAll (str: string, find: string, replace: string) {
      return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    },
  },
}
</script>

<style scoped>
.party {
  text-align: center;
  padding-top: 40px;
  padding-bottom: 100px;
  max-width: 1000px;
  margin: 0 auto;
}

.party h1 {
  margin-bottom: 40px;
}

.party-container {
  display: flex;
}

.party-images {
  width: 380px;
  margin-right: 30px;
}

.main-image {
  width: 100%;
  height: 200px;

  background-color: #ccc;

  margin-bottom: 15px;

  background-position: center;
  background-size: cover;
}

.party-mini-images {
  display: flex;
  flex-wrap: wrap;
}

.mini-image {
  width: 80px;
  height: 80px;

  margin-right: 15px;
  margin-bottom: 15px;

  background-color: #ccc;

  background-position: center;
  background-size: cover;
}

.party-details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.bold {
  margin-bottom: 12px;
  font-weight: bold;
}

.party-description, .party-date {
  margin-bottom: 20px;
}
</style>