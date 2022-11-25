<template>
  <div class="navbar">
    <div class="navbar-container">
      <div class="logo-container">
        <router-link to="/">
          Moviebase
        </router-link>
      </div>
      <div class="menu-container">
        <ul class="menu-list">
          <li class="menu-list-item">
            Movies
          </li>
          <li class="menu-list-item">
            Genres
          </li>
          <router-link
            to="/about"
            class="menu-list-item"
          >
            About
          </router-link>
        </ul>
      </div>
      <div class="profile-container">
        <div
          v-if="user.token"
          class="profile-text"
          @click="logout"
        >
          Logout
        </div>
        <template v-else>
          <router-link
            to="/login"
            class="profile-text"
          >
            Login
          </router-link>
          <router-link
            to="/register"
            class="profile-text"
          >
            Register
          </router-link>
        </template>
        <div class="toggle">
          <font-awesome-icon
            icon="fa-solid fa-moon"
            class="toggle-icons"
          />
          <font-awesome-icon
            icon="fa-solid fa-sun"
            class="toggle-icons"
          />
          <div class="toggle-ball" />
        </div>
      </div>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import useUser from '@/services/useUser';
import useAuthStore from './stores/auth';

const user = useAuthStore();
const { logout } = useUser();
</script>

<style src="./App.css" scoped />
