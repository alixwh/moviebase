<template>
  <div class="form">
    <div class="title">
      Login
    </div>
    <div class="input-container ic1">
      <input
        id="username"
        v-model="username"
        class="input"
        type="text"
        placeholder=" "
      >
      <div class="cut" />
      <label
        class="placeholder"
      >username</label>
    </div>
    <div class="input-container ic2">
      <input
        id="password"
        v-model="password"
        class="input"
        type="password"
        placeholder=" "
      >
      <div class="cut" />
      <label
        for="lastname"
        class="placeholder"
      >password</label>
    </div>
    <button
      class="submit"
      @click="handleLogin"
    >
      submit
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import useUser from '../../services/useUser';

const { login } = useUser();
const username = ref('');
const password = ref('');

const handleLogin = () => {
  login(username.value, password.value);
};
</script>

<style src="./LoginView.css" scoped />
