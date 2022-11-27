<template>
  <div>
    <div class="filters">
      <li class="filter">
        <button class="dropbtn">
          Genre
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
          Year
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
              :value="2023 - year"
            >
            <label
              :for="year"
            >
              {{ 2023 - year }}</label>
          </div>
        </div>
      </li>
      <li class="filter">
        <button class="dropbtn">
          Sort by: {{ sortingChoice }}
        </button>
        <div class="grid-container">
          <div
            v-for="sort in sortingOptions"
            :key="sort"
            class="grid-item"
          >
            <input
              :id="sort"
              v-model="sortingChoice"
              type="radio"
              :value="sort"
            >
            <label
              :for="sort"
            >
              {{ sort }}</label>
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

const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await httpClient.get('/api/public/movies');
    movies.value = response.data;
  } catch (e) {
    // console.log(e);
  }
};

const checkedGenres = ref([]);
const checkedYears = ref([]);
const sortingOptions = ['default', 'name', 'rating', 'release date'];
const sortingChoice = ref('default');

const handleFilter = async () => {
  movies.value = null;
  if (checkedGenres.value.length !== 0 || checkedYears.value.length !== 0) {
    const response = await httpClient.get(`/api/public/filter?genre=${checkedGenres.value.join()}&year=${checkedYears.value.join()}`);
    movies.value = response.data;
  } else {
    getMovies();
  }
};
onMounted(() => {
  getMovies();
  getGenres();
});

</script>
  <style src="./MoviesView.css" scoped />
