<template>
  <div class='card'>
    <span>Title: {{ props.movie.title }}</span>
    <span>Release year:{{ props.movie.year }}</span>
    <span v-if='props.movie.genresList.length'>Genres:</span>
    <ul
      v-if='props.movie.genresList.length'
      class='genres'
    >
      <li
        v-for='genre in props.movie.genresList'
        :key='`${genre}-genre-${props.movie.title}`'
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
