<template>
  <div>
    <div class="filters">
      <li class="filter">
        <button class="dropbtn">
          Genre: {{ checkedGenres.length === 0 ?
            'All' : checkedGenres.length === 1 ? checkedGenres[0].name :
              checkedGenres.length + ' selected' }}
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
              :value="genre"
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
          Year {{ checkedYears.length === 0 ?
            'All' : checkedYears.length === 1 ? checkedYears[0] :
              checkedYears.length + ' selected' }}
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
          Sort by: {{ sortingChoice.name }}
        </button>
        <div class="grid-container">
          <div
            v-for="sort in sortingOptions"
            :key="sort"
            class="grid-item"
          >
            <input
              :id="sort.name"
              v-model="sortingChoice"
              type="radio"
              :value="sort"
            >
            <label
              :for="sort.name"
            >
              {{ sort.name }}</label>
          </div>
        </div>
      </li>
      <li class="filter">
        <button
          class="filter-btn"
          @click="handleFilterSubmit"
        >
          Filter
        </button>
      </li>
    </div>
  </div>
  <Pagination
    :number-of-pages="totalPages"
    :current-page="currentPage"
    @page-changed="handlePageChange"
  />
  <div>
    <ul class="movie-list">
      <li
        v-for="movie in movies"
        :key="movie.title"
        class="movie-list-item"
      >
        <MovieCard :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import MovieCard from '@/components/card/MovieCard.vue';
import Pagination from '@/components/pagination/Pagination.vue';
import httpClient from '@/httpClient';
import { onMounted, ref } from 'vue';

const movies = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const checkedGenres = ref([]);
const checkedYears = ref([]);
const sortingOptions = [{ name: 'title', value: 'title', ascending: true }, { name: 'rating', value: 'vote_average', ascending: false }, { name: 'date', value: 'release_date', ascending: false }];
const sortingChoice = ref(sortingOptions.at(1));

const genres = ref([]);
const getGenres = async () => {
  try {
    const response = await httpClient.get('/api/public/genres');
    genres.value = response.data;
  } catch (e) {
    // console.log(e);
  }
};

const getGenreIds = () => (checkedGenres.value.map((genre) => genre.id).join());
const getMoviesQuery = () => {
  const request = [];
  if (getGenreIds()) {
    request.push(`genre=${getGenreIds()}`);
  }
  if (checkedYears.value.join()) {
    request.push(`year=${checkedYears.value.join()}`);
  }
  request.push(`page=${currentPage.value - 1}&orderBy=${sortingChoice.value.value}&ascending=${sortingChoice.value.ascending}`);
  return request.join('&');
};
const saveMovies = async () => {
  const response = await httpClient.get(`/api/public/filter?${getMoviesQuery()}`);
  movies.value = response.data.content;
  totalPages.value = response.data.totalPages;
};

const getMovies = async () => {
  saveMovies();
};

const handleFilterSubmit = async () => {
  currentPage.value = 1;
  saveMovies();
};

const handlePageChange = (number) => {
  currentPage.value = number;
  getMovies();
};

onMounted(() => {
  getMovies();
  getGenres();
});

</script>
  <style src="./MoviesView.css" scoped />
