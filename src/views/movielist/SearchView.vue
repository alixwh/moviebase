<template>
  <div class="search">
    <div class="search-container">
      <form
        action="/search"
        class="search-bar"
      >
        <input
          type="text"
          :value="props.query"
          placeholder="Search"
          name="query"
        >
        <button type="submit">
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            class="magnifying-glass"
          />
        </button>
      </form>
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
import { ref, onMounted } from 'vue';
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
</script>

<style>
.search {
  margin: 0 70px;
}

.search-container {
  position: relative;
  min-height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  width: 100%;
  max-width: 500px;
  max-height: 25px;
  background-color: white;
  display: flex;
  align-items: center;
  border-style:solid;
  border-radius: 50px;
  border-color: #151515;
  padding: 10px 20px;
}

.search-bar input {
  flex: 1;
  border: 0;
  outline: none;
  font-size: 18px;
  padding: 2px 10px;
  background-color: transparent;
}

.search-bar button {
  border: 0;
  max-height: 30px;
  border-radius: 50%;
  width: 60px;
  background-color: transparent;
  cursor: pointer;
}

.magnifying-glass {
  font-size: 20px;
  color: darkgray;
}

.movie-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(247px, 1fr));
  row-gap: 20px;
  margin-top: 40px;
  padding: 0 20px;
}

.movie-list-item {
  margin-right: 30px;
}

.search-result {
  margin-top: 40px;
  margin-left: 30px;
  margin-bottom: 0;
}
</style>
