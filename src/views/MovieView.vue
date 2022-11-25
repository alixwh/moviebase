<template>
    <div class="movie">
      <img
        class="movie-list-item-img"
        name="movie-list-item-img"
        :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`"
      >
      <div class="movie-info">
        <h1 class="movie-list-item-title">{{ movie.title }}</h1>
        <span>{{ movie.releaseDate }}</span>
        <ul class="genres">
          <li
            v-for="genre in movie.genresList"
            :key="`${genre}-genre-${movie.title}`"
          >
            {{ genre }}
          </li>
        </ul>
        <h3>Overview</h3>
        <p class="movie-list-item-overview">{{ movie.overview }}</p>
        <h3>Director</h3>
        <ul class="directors">
          <li
            v-for="director in movie.directorsList"
            :key="director.name"
          >
            {{ director }}
          </li>
        </ul>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import httpClient from '@/httpClient';

const route = useRoute();
const movie = ref({});
const getMovie = async () => {
  try {
    const response = await httpClient.get(`/api/public/movies/${route.params.id}`);
    movie.value = response.data;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getMovie());
</script>

<style>
.movie {
  min-height: 40vh;
  margin: 8vh 10vh;
  display: flex;
}

.movie-list-item-img {
  width: 320px;
  height: 432px;
  border-radius: 15px;
}

.movie-info {
  margin-top: 50px;
  margin-left: 50px;
}

.genres {
    list-style: none;
    display: flex;
    padding: 0;
    gap: 10px;
}

.genres li {
    text-decoration: underline;
}

.directors {
  list-style: none;
  padding: 0;
}

.circular-progress{
    position: relative;
    height: 250px;
    width: 250px;
    border-radius: 50%;
    background: conic-gradient(#7d2ae8 3.6deg, #ededed 0deg);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
