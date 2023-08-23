<template>
  <div>
    <Header />
    <div class="wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: 100px;
}
</style>