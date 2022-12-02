<template>
  <div>
    <div class="account">
      <h1>{{ username }}</h1>
    </div>
    <div class="account">
      <select
        v-model="selected"
        @change="onchange"
      >
        <option
          v-for="option in options"
          :key="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
    <div class="account">
      <h2>{{ selected }}</h2>
    </div>
    <div class="movie-list">
      <div
        v-for="movie in movies"
        :key="movie.title"
        class="movie-list-item"
      >
        <ListMovieCard
          :movie="movie"
          :list="selected"
        />
      </div>
    </div>

    <div class="account">
      <h2>Friend list</h2>
      <ul class="movie-list">
        <li
          v-for="account in friendList"
          :key="account.username"
          class="movie-list-item"
        >
          {{ account.username }}
        </li>
      </ul>
    </div>
    <div class="account">
      <button @click="deleteUser">
        Delete account
      </button>
    </div>
  </div>
</template>
<script setup>
import ListMovieCard from '@/components/card/MovieListCard.vue';
import httpClient from '@/httpClient';
import { onMounted, ref } from 'vue';
import useUser from '@/services/useUser';

const { deleteAccount } = useUser();

const id = localStorage.getItem('accountId');
const username = localStorage.getItem('username');
const friendList = ref([]);
const movies = ref([]);
const acocuntId = ref('');

const options = ['wantToWatch', 'watching', 'completed', 'dropped'];
const selected = ref(options.at(0));
const getMovieLists = async () => {
  acocuntId.value = localStorage.getItem('accountId');
  const response = await httpClient.get(`api/account/watchlist/${acocuntId.value}/${selected.value}`);
  movies.value = response.data;
};
const deleteUser = () => {
  deleteAccount(id);
};

onMounted(() => getMovieLists());

const onchange = () => {
  getMovieLists();
};
</script>

<style src="./AccountView.css" scoped />
