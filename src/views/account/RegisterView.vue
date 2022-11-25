<template>
  <div class="form">
    <div class="title">
      <router-link
        to="/login"
        class="title"
      >
        Login |
      </router-link>
      Register
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
      @click="handleRegister"
    >
      Register
    </button>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import useUser from '../../services/useUser';

const { register } = useUser();
const username = ref('');
const password = ref('');

const handleRegister = () => {
  register(username.value, password.value);
};
</script>

<style src="./LoginView.css" scoped />
