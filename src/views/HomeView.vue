<template>
  <div class="home">
    <div class="discover-container">
      <img
        class="discover-img"
        src="../assets/movie_collage.jpg"
      >
      <div class="search-container">
        <div class="search-bar">
          <input
            v-model="inputValue"
            type="text"
            placeholder="Search"
            name="query"
          >
          <button
            class="submit"
            @click="redirect(inputValue)"
          >
            <font-awesome-icon
              icon="fa-solid fa-magnifying-glass"
              class="magnifying-glass"
            />
          </button>
        </div>
      </div>
      <div class="quiz-container">
        <h1>Don't know what to watch?</h1>
        <h2>Answer questions and we will find you something you'll like.</h2>
      </div>
    </div>
    <div class="content-container">
      <div class="movie-list-container">
        <h1 class="movie-list-title">
          Popular
        </h1>
        <div class="movie-list-wrapper">
          <ul>
            <li
              v-for="movie in movies"
              :key="movie.title"
            >
              <MovieCard :movie="movie" />
            </li>
          </ul>
          <font-awesome-icon
            icon="fa-solid fa-chevron-right"
            class="arrow"
            name="arrow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// @ is an alias to /src
import MovieCard from '@/components/card/MovieCard.vue';
import httpClient from '@/httpClient';
import { onMounted, ref } from 'vue';

const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await httpClient.get('/api/public/movies');
    movies.value = response.data.content;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getMovies());
</script>
<script>
export default {
  methods: {
    redirect(inputValue) {
      this.$router.push({ path: '/search', query: { query: inputValue } });
    },
  },
};

const arrows = document.querySelectorAll('.arrow');
const movieLists = document.querySelectorAll('.home ul');
arrows.forEach((arrow, i) => {
  const numberOfMoviesOnPage = 6;
  let clickCounter = 0;
  arrow.addEventListener('click', () => {
    const ratio = Math.floor(window.innerWidth / 270);
    // eslint-disable-next-line no-plusplus
    clickCounter++;
    if (21 - (numberOfMoviesOnPage * clickCounter) + (numberOfMoviesOnPage - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get('transform')[0].x.value - 1230
      }px)`;
    } else {
      movieLists[i].style.transform = 'translateX(0)';
      clickCounter = 0;
    }
  });
});
</script>

<style src="./HomeView.css" scoped />
