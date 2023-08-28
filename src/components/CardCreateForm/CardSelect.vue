<template>
    <select v-model="card" @change="selectedCard">
        <option value="">Выберите</option>
        <option 
          v-for="option in selectOptions" 
          :key="option.id" 
          :value="option.id"
        >
            {{ option.title }}
        </option>
    </select>
</template>

<script setup>
import { ref } from "vue";

const card = ref('');

const props = defineProps(['value', 'selectOptions']);
const emit = defineEmits(['input']);

const selectedCard = () => {
    emit('input', card);
};
</script>