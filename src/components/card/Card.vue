<template>
  <div class="card">
    <router-link :to="`/movie/${movie.id}`">
      <img
        class="movie-list-item-img"
        name="movie-list-item-img"
        :src="`https://image.tmdb.org/t/p/w500${props.movie.posterPath}`"
      >
      <div class="movie-list-item-title">
        {{ props.movie.title }}
      </div>
      <div>{{ props.movie.releaseDate }}</div>
      <div class="movie-list-item-overview">
        {{ props.movie.overview }}
      </div>
      <ul
        v-if="props.movie.genresList.length"
        class="genres"
      >
        <li
          v-for="genre in props.movie.genresList"
          :key="`${genre}-genre-${props.movie.title}`"
        >
          {{ genre }}
        </li>
      </ul>
    </router-link>
    <router-view />
    <div v-if="user">
      <button
        @click="addToWantToWatch(props.movie.id)"
      >
        want to watch
      </button>
    </div>
  </div>
</template>

<script setup>
import httpClient from '@/httpClient';

const props = defineProps({
  movie: { type: Object, required: true },
});
const user = localStorage.getItem('username');
const addToWantToWatch = async (id) => {
  const response = await httpClient.get('api/account');
  const accountId = response.data.id;
  const request = {
    accountId,
    movieId: id,
    state: 'wantToWatch',
  };
  httpClient.post('api/account/movielist/add', request);
};
</script>

<style src="./Card.css" scoped>

</style>
