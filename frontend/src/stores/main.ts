import { defineStore } from 'pinia'

export interface ISetAuthenticateParams {
  userId: string | null
  token: string | null
}

export const useMainStore = defineStore('main', {
  state: () => ({
    authenticated: false,
    userId: null as string | null,
    token: null as string | null,
  }),

  actions: {
    authenticate (data: ISetAuthenticateParams) {
      this.authenticated = true
      this.token = data.token
      this.userId = data.userId
    },

    logout () {
      this.authenticated = false
      this.token = null
      this.userId = null
    },
  },

  persist: {
    storage: window.localStorage,
  },
})
