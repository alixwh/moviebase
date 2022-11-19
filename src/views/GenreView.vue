<template>
  <div class="genre">
    <h1 class="genre-name">
      {{ genreName }}
    </h1>
    <ul class="movie-list">
      <li
        v-for="movie in movies"
        :key="movie.title"
        class="movie-list-item"
      >
        <Card :movie="movie" />
      </li>
    </ul>
  </div>
</template>
<script setup>
import Card from '@/components/card/Card.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import httpClient from '@/httpClient';

const route = useRoute();
const genreName = ref();
const getGenreName = async () => {
  try {
    const response = await httpClient.get(` http://localhost:8081/api/genres/${route.params.id}`);
    genreName.value = response.data.name;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getGenreName());

const url = `http://localhost:8081/api/genre/${route.params.id}`;
const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await httpClient.get(url);
    movies.value = response.data;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getMovies());
</script>

<style>
.genre {
  margin: 0 70px;
}

.movie-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(247px, 1fr));
  row-gap: 20px;
  margin-top: 40px;
  padding: 0 20px;
  transform: translateX(0);
  transition: 1s ease-in-out;
}

.movie-list-item {
  margin-right: 30px;
  position: relative;
}

.genre-name {
  margin-top: 40px;
  margin-left: 30px;
  margin-bottom: 0;
}
</style>
