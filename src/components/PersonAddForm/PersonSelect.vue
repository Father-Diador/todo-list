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

<script>
export default {
    props: {
      value: String,
      selectOptions: {
        type: Array,
        required: true,
      }
    },
    methods: {
        selectedCard(event) {
            this.$emit('input', card)
            value: ''
        }
    },
}
</script>