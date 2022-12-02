<template>
  <router-link :to="`/actor/${actor.id}`">
    <div class="actor">
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
        src="../../assets/default_profile_pic.jpg"
      >
      <span class="actor-name">{{ actor.name }}</span>
    </div>
  </router-link>
  <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import httpClient from '@/httpClient';

const props = defineProps({
  actorId: { type: Number, required: true },
});
const actor = ref({});
const getActor = async () => {
  try {
    const response = await httpClient.get(`/api/public/actors/${props.actorId}`);
    actor.value = response.data;
  } catch (e) {
    console.log(e);
  }
};
onMounted(() => getActor());
</script>

<style>
.actor {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  gap: 8px;
  align-items: center;
}

.actor-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 100px;
}
</style>
