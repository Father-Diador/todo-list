<template>
  <div class="card">
      <div class="card__wrapper">
        <div class="card__content">
          <CardPriority :priority="card.priority" />
          <p>{{ card.title }}</p>
          <p>{{ card.description }}</p>
          <p>{{ card.date }}</p>
          <div class="card__btn">
            <div
              v-if="card.subordinates.length"
              @click.stop="isVissible = !isVissible"
              class="btn-small"
            >↓</div>
          </div>
        </div>
        <div v-if="isVissible" class="card__child">
          <SingleCard
            v-for="card in card.subordinates"
            :key="card.id"
            :card="card"
            class="card__child__card"
          />
      </div>
      </div>
  </div>
</template>

<script>
import CardPriority from "@/components/CardPriority.vue"

export default {
components: {
  CardPriority,
},
data() {
  return {
    isVissible: false,
  }
},
props: {
  card: {
    type: Object,
    required: true,
  },
}
}
</script>

<style scoped lang="scss">
*{
  box-sizing: border-box;
}
.card{
  display: flex;
  flex-direction: column;
  width: 100%;

  &__wrapper{
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: flex-end;
    background: $white;
    border-radius: 10px;
    padding: 20px;
  }

  &__priority {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &__content{
    width: 100%;
    // padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__btn {
    display: flex;
    justify-content: end;
    width: 50px;
  }

  &__child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    &__card{
      // margin-left: 20px;
      border: 1px solid $light-gray;
      border-radius: 10px;
    }
  }

  &__child-card {
    .card__content{
      width: calc(100% - 20px);
    }
  }
}
</style>