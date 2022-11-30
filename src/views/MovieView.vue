<template>
  <div class="main-movie-container">
    <img
      class="movie-img"
      name="movie-img"
      :src="`https://image.tmdb.org/t/p/w500${movie.posterPath}`"
    >
    <div class="movie-info">
      <h1 class="movie-title">
        {{ movie.title }}
      </h1>
      <span>{{ movie.releaseDate }}</span>
      <ul class="genres">
        <li
          v-for="genre in movie.genresList"
          :key="`${genre}-genre-${movie.title}`"
        >
          {{ genre }}
        </li>
      </ul>
      <font-awesome-icon
        class="star-icon"
        icon="fa-solid fa-star"
      />
      <span>{{ movie.voteAverage }} / 10</span>
      <h3>Overview</h3>
      <p class="movie-overview">
        {{ movie.overview }}
      </p>
      <h3>Director</h3>
      <ul class="directors-list">
        <li
          v-for="director in movie.directorsList"
          :key="director.name"
        >
          {{ director }}
        </li>
      </ul>
    </div>
  </div>
  <div class="actors-container">
    <h2>Top cast</h2>
    <ul class="actors-list">
      <li
        v-for="actorId in movie.actorsList"
        :key="actorId"
        class="actors-list-item"
      >
        <ActorCard :actorId="actorId" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import ActorCard from '@/components/ActorCard.vue';
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

<style src="./MovieView.css" scoped />
