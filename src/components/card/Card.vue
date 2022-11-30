<template>
  <div class="card">
    <router-link :to="`/movie/${movie.id}`">
      <img
        class="movie-list-item-img"
        name="movie-list-item-img"
        :src="`https://image.tmdb.org/t/p/w500${props.movie.posterPath}`"
      >
      <div class="movie-list-item-title">
        {{ props.movie.title }}
      </div>
      <div>{{ props.movie.releaseDate }}</div>
      <div class="movie-list-item-overview">
        {{ props.movie.overview }}
      </div>
      <ul
        v-if="props.movie.genresList.length"
        class="genres"
      >
        <li
          v-for="genre in props.movie.genresList"
          :key="`${genre}-genre-${props.movie.title}`"
        >
          {{ genre }}
        </li>
      </ul>
    </router-link>
  </div>
  <router-view />
</template>

<script setup>
const props = defineProps({
  movie: { type: Object, required: true },
});
</script>

<style src="./Card.css" scoped>

</style>
