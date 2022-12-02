<template>
  <div class="actor-container">
    <img
      v-if="actor.profilePath"
      class="actor-img"
      name="actor-img"
      :src="`https://image.tmdb.org/t/p/w500${actor.profilePath}`"
    >
    <img
      v-else
      class="actor-img"
      name="actor-img"
      src="../assets/default_profile_pic.jpg"
    >
    <div class="actor-info">
      <h1 class="actor-name">
        {{ actor.name }}
      </h1>
    </div>
  </div>
  <div class="movies-container">
    <h2>Starred in</h2>
    <ul class="movies-list">
      <li
        v-for="movie in movies"
        :key="movie.title"
        class="movies-list-item"
      >
        <MovieCard :movie="movie" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import MovieCard from '@/components/card/MovieCard.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import httpClient from '@/httpClient';

const route = useRoute();
const actor = ref({});
const movies = ref([]);
const getActorInfo = async () => {
  try {
    const response = await httpClient.get(`/api/public/actors/${route.params.id}`);
    actor.value = response.data;
    actor.value.actorMovies.forEach(async (movieId) => {
      try {
        const response2 = await httpClient.get(`/api/public/movies/${movieId}`);
        movies.value.push(response2.data);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getActorInfo());
</script>

<style src="./ActorView.css" scoped />
