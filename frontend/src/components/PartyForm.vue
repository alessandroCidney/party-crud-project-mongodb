<template>
  <div>
    <Message :msg="msg" :msg-class="msgClass" />

    <form
      id="party-form"
      enctype="multipart/form-data"
      @submit.prevent="page === 'newparty' ? createParty($event) : update($event)"
    >
      <input
        v-model="id"
        type="hidden"
        name="id"
        id="id"
      >

      <input
        v-model="user_id"
        type="hidden"
        name="user_id"
        id="user_id"
      >

      <div class="input-container">
        <label for="title">Título do Evento:</label>

        <input
          v-model="title"
          placeholder="Digite o título"
          type="text"
          name="title"
          id="title"
        >
      </div>

      <div class="input-container">
        <label for="description">Descrição:</label>

        <textarea
          v-model="description"
          placeholder="O que vai acontecer ou aconteceu no evento?"
          name="description"
          id="description"
        />
      </div>

      <div class="input-container">
        <label for="party_date">Data da Festa:</label>

        <input
          v-model="party_date"
          name="party_date"
          id="party_date"
          type="date"
        />
      </div>

      <div class="input-container">
        <label for="photos">Imagens:</label>

        <input
          ref="file"
          name="photos"
          id="photos"
          type="file"
          multiple
          @change="onChange"
        />
      </div>

      <div
        v-if="page === 'editparty' && showMiniImages"
        class="mini-images"
      >
        <p>Imagens atuais:</p>

        <img
          v-for="(photo, index) in photos"
          :key="index"
          :src="`${photo}`"
        >
      </div>

      <div class="input-container checkbox-container">
        <label for="privacy">Evento privado?</label>

        <input
          v-model="privacy"
          name="privacy"
          id="privacy"
          type="checkbox"
        />
      </div>

      <InputSubmit :text="btnText" />
    </form>
  </div>
</template>

<script lang="ts">
import { useMainStore } from '@/stores/main'

import Message from './Message.vue'
import InputSubmit from './form/InputSubmit.vue'

export default {
  name: 'PartyForm',

  components: { Message, InputSubmit },

  props: ['party', 'page', 'btnText'],

  setup () {
    return {
      mainStore: useMainStore(),
    }
  },

  data () {
    return {
      id: this.party._id || null,
      title: this.party.title || null,
      description: this.party.description || null,
      party_date: this.party.partyDate || null,
      photos: this.party.photos || [],
      privacy: this.party.privacy || false,
      user_id: this.party.userId || null,

      msg: null,
      msgClass: null as string | null,

      showMiniImages: true,
    }
  },

  methods: {
    async createParty (e: Event) {
      const formData = new FormData()

      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('party_date', this.party_date)
      formData.append('privacy', this.privacy)

      if (this.photos.length > 0) {
        for (const photoItem of this.photos) {
          formData.append('photos', photoItem)
        }
      }

      // get token from store
      const token = this.mainStore.token

      try {
        if (!token) {
          throw new Error('User is not authenticated')
        }

        const response = await fetch('http://localhost:3000/api/party', {
          method: 'POST',
          headers: {
            'auth-token': token
          },
          body: formData
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

          if (!responseData.error) {
            this.$router.push('dashboard')
          }
        }, 2000)
      } catch (err) {
        console.log(err)
      }
    },

    async update (e: Event) {
      const formData = new FormData()

      formData.append('id', this.id)
      formData.append('title', this.title)
      formData.append('description', this.description)
      formData.append('party_date', this.party_date)
      formData.append('privacy', this.privacy)
      formData.append('user_id', this.user_id)

      if (this.photos.length > 0) {
        for (const photoItem of this.photos) {
          formData.append('photos', photoItem)
        }
      }

      // get token from store
      const token = this.mainStore.token

      try {
        if (!token) {
          throw new Error('User is not authenticated')
        }

        const response = await fetch('http://localhost:3000/api/party', {
          method: 'PATCH',
          headers: {
            'auth-token': token
          },
          body: formData
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

    onChange (e: Event) {
      const target = e.target

      if (target instanceof HTMLInputElement) {
        console.log('change!')
        this.photos = target.files
        this.showMiniImages = false
      }
    },
  }
}
</script>

<style scoped>
#party-form {
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

.input-container input, .input-container textarea {
  padding: 10px;
  border: 1px solid #e8e8e8;
}

.checkbox-container {
  flex-direction: row;
}

.checkbox-container label {
  margin-bottom: 0;
}

.checkbox-container input {
  margin-left: 12px;
}

.mini-images {
  display: flex;
  flex-wrap: wrap;

  margin-bottom: 0;
}

.mini-images p {
  width: 100%;
  font-weight: bold;

  margin-bottom: 15px;
  text-align: left;
}

.mini-images img {
  height: 50px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>