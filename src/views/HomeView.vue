<template>
  <div class='home'>
    <div v-if='!movies.length'>
      loading
    </div>
    <div v-else>
      <ul>
        <li
          v-for='movie in movies'
          :key='movie.title'
        >
          <Card :movie='movie' />
        </li>
      </ul>
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
    const response = await httpClient.get('/movies');
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
  padding: 0;
  display: flex;
  gap: 16px;
}

li {
  padding: 8px;
}
</style>
