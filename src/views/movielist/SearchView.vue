<template>
  <div class="search">
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
    <h1 class="search-result">
      Search results for "{{ props.query }}"
    </h1>
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
import { ref, onMounted, watch } from 'vue';
import httpClient from '@/httpClient';

const props = defineProps({
  query: { type: String, required: true },
});
const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await httpClient.get(`/api/public/search?query=${props.query}`);
    movies.value = response.data;
  } catch (e) {
    // console.log(e);
  }
};
onMounted(() => getMovies());

watch(() => props.query, () => {
  getMovies();
});
</script>
<script>
export default {
  methods: {
    redirect(inputValue) {
      this.$router.push({ path: '/search', query: { query: inputValue } });
    },
  },
};
</script>

<style src="./SearchView.css" scoped />
