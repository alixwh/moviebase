<template>
  <div>
    <ul class="page">
      <li
        v-for="n in props.numberOfPages"
        :key="`pagination-${n}`"
        :class="{selected:props.currentPage === n}"
        @click="changePage(n)"
      >
        {{ n }}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const props = defineProps({
  numberOfPages: { type: Number, required: true },
  currentPage: { type: Number, required: true },
});

const emit = defineEmits(['pageChanged']);
const currentPage = ref(1);

const changePage = (number) => {
  currentPage.value = number;
  emit('pageChanged', currentPage.value);
};

</script>
<style src="./Pagination.css" scoped></style>
