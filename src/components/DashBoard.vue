<template>
    <div class="right__wrapper">
        <div class="btn-default" @click="del">
            <span class="btn-default__plus">
                <img src="@/assets/icons/delete-cards.svg" alt="">
            </span>
        </div>
        <div class="right__wrapper__rights">ver. 0.2</div>
    </div>
</template>

<script setup>
const del = () => {
    localStorage.clear();
}
</script>

<style lang="scss" scoped>
.right__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    box-sizing: border-box;
    width: 100px;
    height: 100vh;
    padding: 50px 20px 20px;
    background: $white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    -webkit-box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);
    box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);

    &__rights {
        text-align: right;
    }
}
</style>