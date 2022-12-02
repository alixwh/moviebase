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
          <router-link
            to="/movies"
            class="menu-list-item"
          >
            Movies
          </router-link>
          <li class="menu-list-item">
            Genres
            <div class="sub-menu-list">
              <ul>
                <li
                  v-for="genre in genres"
                  :key="genre"
                >
                  <router-link :to="`/genre/${genre.id}`">
                    {{ genre.name }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
          <router-link
            to="/about"
            class="menu-list-item"
          >
            About
          </router-link>
        </ul>
      </div>
      <div>
        <ul
          v-if="user.token"
          class="profile-container"
        >
          <div
            class="profile-item"
            @click="logout"
          >
            <a class="profile-text">Logout</a>
          </div>
          <router-link
            to="/accountView"
            class="profile-item"
          >
            <a class="profile-text">Account</a>
          </router-link>
        </ul>
        <ul v-else>
          <router-link
            key="login"
            to="/login"
            class="profile-text"
          >
            <a>Login</a>
          </router-link>
        </ul>
      </div>
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
    <router-view />
  </div>
</template>

<script setup>
import httpClient from '@/httpClient';
import { onMounted, ref } from 'vue';
import useUser from '@/services/useUser';
import useAuthStore from './stores/auth';

const user = useAuthStore();
const { logout } = useUser();

const genres = ref([]);
const getGenres = async () => {
  try {
    const response = await httpClient.get('/api/public/genres');
    genres.value = response.data;
  } catch (e) {
    // console.log(e);
  }
};
onMounted(() => getGenres());
</script>

<style src="./App.css" scoped />
