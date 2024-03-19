<template>
  <div class="home">
    <h1>Veja as últimas festas</h1>

    <div v-if="parties.length > 0" class="parties-container">
      <div
        v-for="(party, index) in parties"
        :key="index"
        class="party-container"
      >
        <div
          :style="{
            backgroundImage: `url(${ party.photos[0] })`
          }"
          class="party-img"
        />

        <router-link
          :to="`/party/${party._id}`"
          class="party-title"
        >
          {{ party.title }}
        </router-link>

        <p class="party-date">
          {{ party.partyDate }}
        </p>
        
        <router-link
          :to="`/party/${party._id}`"
          class="party-details-btn"
        >
          Ver mais
        </router-link>
      </div>
    </div>

    <p v-else>Não há festas ainda...</p>
  </div>
</template>

<script lang="ts">
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
  name: 'HomeView',

  data () {
    return {
      parties: [] as IParty[],
    }
  },

  created () {
    // load public parties

    this.getParties()
  },

  methods: {
    async getParties () {
      try {
        const response = await fetch('http://localhost:3000/api/party/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const responseData = await response.json() as { parties: IParty[] }

        responseData.parties.forEach((party, index) => {
          if (party.partyDate) {
            party.partyDate = new Date(party.partyDate).toLocaleDateString()
          }

          if (party.photos.length > 0) {
            party.photos = party.photos
              .map(
                photo => this.replaceAll(
                  photo.replace('public', 'http://localhost:3000'), // .replaceAll('\\', '/'),
                  '\\',
                  '/'
                )
              )
          }
        })

        this.parties = responseData.parties
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
  }
}
</script>

<style scoped>
.home {
  padding-top: 40px;
  padding-bottom: 100px;

  text-align: center;
}

.home h1 {
  margin-bottom: 40px;
}

.parties-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  margin: 0 auto;
}

.party-container {
  width: 30.3%;
  margin: 1.5%;

  display: flex;
  flex-direction: column;
}

.party-img {
  width: 100%;
  height: 200px;

  background-color: #ccc;

  margin-bottom: 12px;

  background-position: center;
  background-size: cover;
}

.party-title {
  color: #25282e;
  text-decoration: none;
  margin-bottom: 12px;
}

.party-date {
  color: #777;
  margin-bottom: 12px;
}

.party-details-btn {
  width: 100%;
  text-transform: uppercase;
  color: #fff;

  background-color: #25282e;

  transition: .5s;

  border: 0;

  padding: 12px;

  text-decoration: none;

  text-align: center;
}

.party-details-btn:hover {
  background-color: #141619;
}
</style>
