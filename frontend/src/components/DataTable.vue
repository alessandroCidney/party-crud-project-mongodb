<template>
  <div class="data-container">
    <Message :msg="msg" :msg-class="msgClass" />

    <div class="data-table-heading">
      <div class="data-id-heading">
        Nº:
      </div>

      <div class="data-title-heading">
        Nome da Festa:
      </div>

      <div class="data-actions-heading">
        Ações:
      </div>
    </div>

    <div class="data-table-body">
      <div
        v-for="(party, index) in parties"
        :key="index"
        class="data-row"
      >
        <div class="data-id-container">
          {{ index + 1 }}
        </div>

        <div class="data-title-container">
          <router-link :to="`/party/${party._id}`">
            {{ party.title }}
          </router-link>
        </div>

        <div class="data-actions-container">
          <router-link
            :to="`/editparty/${party._id}`"
            class="edit-btn"
          >
            Editar
          </router-link>

          <button
            class="remove-btn"
            @click="remove(party._id)"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Message from './Message.vue'

export default {
  name: 'DataTable',

  components: { Message },

  props: ['parties'],

  data () {
    return {
      msg: null,
      msgClass: null,
    }
  },

  methods: {
    remove (partyId: string) {

    },
  }
}
</script>

<style scoped>
.data-table-heading, .data-row {
  display: flex;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ccc;
}

.data-table-heading div, .data-row div {
  flex: 1 1 0;
}

.data-id-heading, .data-id-container {
  max-width: 50px;
}

.edit-btn, .remove-btn {
  padding: 10px 16px;
  background-color: #000;
  color: #fff;
  margin: 5px;
  text-decoration: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: .5s;
}

.edit-btn {
  background-color: #007bff;
}

.edit-btn:hover {
  background-color: #0069d9;
}

.remove-btn {
  background-color: #dc3545;
}

.remove-btn:hover {
  background-color: #c82333;
}
</style>