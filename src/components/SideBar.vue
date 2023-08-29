<template>
    <div class="sidebar__wrapper">
        <img src="/public/logo.svg" class="sidebar__logo" alt="">
        <div class="sidebar__btn" >Сегодня</div>
        <div class="sidebar__btn" >В работе</div>
        <div class="sidebar__btn" >Готовые</div>
        <div class="sidebar__btn" @click="sort('priority')">По приоритету</div>
        <div class="sidebar__btn" >Проекты</div>
        <div class="btn-default sidebar__add" @click="toggleMenu">
            <span class="btn-default__plus">+</span>
            <span>Добавить</span>
        </div>
    </div>
</template>

<script setup>
import { useMenu } from "@/stores/useMenu";

const menuStore = useMenu();
const { toggle, setSort } = menuStore;
const toggleMenu = () => { toggle() };

const sort = (value) => {
    console.log(value);
    setSort(value);
};
</script>

<style scoped lang="scss">
.sidebar {
    &__wrapper {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 20%;
        width: 20%;
        height: 100vh;
        padding: 50px 40px;
        background: $white;
    }

    &__logo {
        width: 50px;
        height: 50px;
        margin-bottom: 32px;
    }

    &__btn {
        padding: 14px;
        background: #F7F8FA;
        border-radius: 7px;
        color: $main-font;
        font-size: 20px;
        line-height: 20px;
    }

    &__add {
        position: absolute;
        bottom: 50px;
    }
}
</style>