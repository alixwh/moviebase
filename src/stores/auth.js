import { defineStore } from 'pinia';

const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    account: null,
    token: localStorage.getItem('token') || null,
  }),
  actions: {
    setCredentials(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    clearCredentials() {
      this.token = null;
      localStorage.clear();
    },
  },
  getters: {

  },
});

export default useAuthStore;
