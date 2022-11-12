<template>
  <div class="home">
    <div class="discover-container">
      <div class="search-container">
        <form
          action="http://localhost:8080/api/search"
          method="get"
          class="search-bar"
        >
          <input
            type="text"
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
      <div class="quiz-container">
        <h1>Don't know what to watch?</h1>
        <h2>Anwer questions and we will find you something you'll like.</h2>
      </div>
    </div>
    <div class="content-container">
      <div class="movie-list-container">
        <h1
          id="fgh"
          class="movie-list-title"
        >
          Popular
        </h1>
        <div class="movie-list-wrapper">
          <ul>
            <li
              v-for="movie in movies"
              :key="movie.title"
            >
              <Card :movie="movie" />
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
import Card from '@/components/card/Card.vue';
import httpClient from '@/httpClient';
import { onMounted, ref } from 'vue';

const movies = ref([]);
const getMovies = async () => {
  try {
    const response = await httpClient.get('/api/movies');
    movies.value = response.data;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getMovies());
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  padding: 0 20px;
  height: 400px;
  transform: translateX(0);
  transition: 1s ease-in-out;
}

li {
  margin-right: 30px;
  position: relative;
}

.home {
  color: white;
}

.discover-container{
  background-color: black;
  margin: 0 10%;
  border-radius: 0 0 50px 50px;
}
.search-container {
  min-height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  width: 100%;
  max-width: 600px;
  max-height: 30px;
  background-color: white;
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 10px 20px;
}

.search-bar input {
  flex: 1;
  border: 0;
  outline: none;
  font-size: 20px;
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

.quiz-container {
  height: 40vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
}

.content-container {
  height: 70vh;
}

.movie-list-title {
  display:flex;
  margin-left: 30px;
  margin-bottom: 0;
}

.movie-list-wrapper {
  position: relative;
  overflow: hidden;
}

.arrow {
  font-size: 120px;
  position: absolute;
  top: 70px;
  right: 2%;
  color: lightgray;
  opacity: 0.5;
  cursor: pointer;
}

.home.active {
  color: black;
}

.search-bar.active {
  background-color: gray;
}

.discover-container.active{
  background-color: #42b977;
}

</style>
