<template>
  <div class="card">
    <img
      class="movie-list-item-img"
      name="movie-list-item-img"
      :src="`https://image.tmdb.org/t/p/w500${props.movie.posterPath}`"
    >
    <span class="movie-list-item-title">{{ props.movie.title }}</span>
    <span>{{ props.movie.releaseDate }}</span>
    <span>{{ props.movie.voteAverage }}</span>
    <span class="movie-list-item-overview">{{ props.movie.overview }}</span>
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
  </div>
</template>

<script setup>
const props = defineProps({
  movie: { type: Object, required: true },
});
</script>

<style src="./Card.css" scoped>

</style>
