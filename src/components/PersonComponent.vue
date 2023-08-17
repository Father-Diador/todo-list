<template>
    <div>
        <div
            v-for="subordinates in subordinates.subordinates"
            :key="subordinates.id"
            class="table-row-subordinate"
        >
            <div class="table-row-subordinate-row">
                <div class="table-field-subordinate">{{ subordinates.title }}</div>
                <div class="table-field">{{ subordinates.description }}</div>
            </div>
            <PersonComponent 
                v-for="subordinates in subordinates.subordinates"
                :key="subordinates.id"
                :subordinates="subordinates"
            />
        </div>
    </div>
</template>

<script>
import PersonComponent from '@/components/PersonComponent.vue'

export default {
  name: 'PersonComponent',
  components: {PersonComponent},
  props: {
    subordinates: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>
.table-row-subordinate{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.table-row-subordinate-row{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.table-field{
  width: 50%;
  padding: 20px;
  border: 2px solid #000;
}
.table-field-subordinate{
  margin-left: 10%;
  width: 40%;
  padding: 20px;
  border: 2px solid #000;
}
</style>