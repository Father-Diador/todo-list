<template>
    <div class="right__wrapper">
        <div>222</div>
        <div class="right__wrapper__rights">version 0.2</div>
    </div>
</template>

<style scoped lang="scss">
.right__wrapper {
    box-sizing: border-box;
    max-width: 20%;
    width: 20%;
    height: 100vh;
    padding: 50px 40px;
    background: $white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    -webkit-box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);
    box-shadow: -4px 0px 8px -8px rgba(34, 60, 80, 0.2);

    &__rights {
        text-align: right;
    }
}
</style>