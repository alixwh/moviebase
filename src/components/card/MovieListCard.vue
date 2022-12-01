<template>
  <div class="card">
    <router-link :to="`/movie/${movie.id}`">
      <div>
        <img
          class="movie-img"
          name="movie-img"
          :src="`https://image.tmdb.org/t/p/w500${props.movie.posterPath}`"
        >
      </div>
    </router-link>

    <div class="details">
      <div class="movie-title">
        <router-link :to="`/movie/${movie.id}`">
          {{ props.movie.title }}
        </router-link>
      </div>
      <div class="movie-date">
        {{ props.movie.releaseDate }}
      </div>
      <div class="movie-rating">
        {{ props.movie.voteAverage }}
      </div>
      <p class="movie-overview">
        {{ props.movie.overview }}
      </p>
      <div>
        <ul class="action">
          <li>
            <select
              v-model="selected"
              class="select-movielist"
              @change="onchage"
            >
              <option
                v-for="option in options"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </li>
          <li>
            <button class="remove-button">
              Remove from watchlist
            </button>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import httpClient from '@/httpClient';
import { ref } from 'vue';

const props = defineProps({
  movie: { type: Object, required: true },
  list: { type: String, required: true },
});
const selected = ref(props.list);

const options = ['wantToWatch', 'watching', 'dropped', 'completed'];

const onchage = () => {
  const request = {
    accountId: localStorage.getItem('accountId'),
    movieId: props.movie.id,
    state: selected.value,
  };
  httpClient.put('/api/account/movielist/change', request);
};

</script>

<style src="./MovieListCard.css" scoped>

</style>
