<template>
  <div>
    <div class="filters">
      <li class="filter">
        <button class="dropbtn">
          Genre: {{ checkedGenres }}
        </button>
        <div class="grid-container">
          <div
            v-for="genre in genres"
            :key="genre"
            class="grid-item"
          >
            <input
              :id="genre.name"
              v-model="checkedGenres"
              type="checkbox"
              :value="genre.id"
            >
            <label
              :for="genre.name"
            >
              {{ genre.name }}</label>
          </div>
        </div>
      </li>
      <li class="filter">
        <button class="dropbtn">
          Year: {{ checkedYears }}
        </button>
        <div class="grid-container">
          <div
            v-for="year in 30"
            :key="year"
            class="grid-item"
          >
            <input
              :id="year"
              v-model="checkedYears"
              type="checkbox"
              :value="year + 1993"
            >
            <label
              :for="year"
            >
              {{ year + 1993 }}</label>
          </div>
        </div>
      </li>
      <li class="filter">
        <button
          class="filter-btn"
          @click="handleFilter"
        >
          Filter
        </button>
      </li>
      <li class="filter">
        Sort by
      </li>
    </div>
  </div>
  <div>
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
import httpClient from '@/httpClient';
import { onMounted, ref } from 'vue';

const genres = ref([]);
const getGenres = async () => {
  try {
    const response = await httpClient.get('/api/public/genres');
    genres.value = response.data;
  } catch (e) {
    // console.log(e);
  }
};
const checkedGenres = ref([]);

const checkedYears = ref([]);

const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await httpClient.get('/api/public/movies');
    movies.value = response.data;
  } catch (e) {
    // console.log(e);
  }
};
const handleFilter = async () => {
  if (checkedGenres.value.length !== 0) {
    const response = await httpClient.get(`/api/public/movies/genres/${checkedGenres.value.join()}`);
    movies.value = null;
    movies.value = response.data;
  } else if (checkedYears.value.length !== 0) {
    const response = await httpClient.get(`/api/public/movies/years/${checkedYears.value.join()}`);
    movies.value = null;
    movies.value = response.data;
  } else {
    getMovies();
  }
  if (checkedGenres.value.length !== 0 && checkedYears.value.length !== 0) {
    const response = await httpClient.get(`/api/public/movies/years/${checkedYears.value.join()}/genres${checkedGenres.value.join()}`);
    movies.value = null;
    movies.value = response.data;
  }
};
onMounted(() => {
  getMovies();
  getGenres();
});

</script>
<style src="./MoviesView.css" scoped />
