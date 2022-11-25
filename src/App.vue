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
      <div class="profile-container">
        <div
          v-if="user.token"
          class="profile-text"
          @click="logout"
        >
          Logout
        </div>
        <router-link
          v-else
          to="/login"
          class="profile-text"
        >
          Login
        </router-link>
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
    console.log(e);
  }
};
onMounted(() => getGenres());
</script>

<style src="./App.css" scoped />
