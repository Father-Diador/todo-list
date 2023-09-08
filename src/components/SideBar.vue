<template>
    <div class="sidebar__wrapper">
        <img src="/public/logo.svg" class="sidebar__logo" alt="">
        <div class="sidebar__btn sidebar__btn__active">Сегодня</div>
        <div class="sidebar__btn">В работе</div>
        <div class="sidebar__btn">Готовые</div>
        <div class="sidebar__btn" @click="sort('priority')">По приоритету</div>
        <div class="sidebar__btn">Проекты</div>
        <div class="btn-default sidebar__add" @click="toggleMenu">
            <span class="btn-default__plus">+</span>
            <span>Создать</span>
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

<style lang="scss" scoped>
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

        -webkit-box-shadow: 4px 0px 8px -8px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 4px 0px 8px -8px rgba(34, 60, 80, 0.2);
        box-shadow: 4px 0px 8px -8px rgba(34, 60, 80, 0.2);
    }

    &__logo {
        width: 50px;
        height: 50px;
        margin-bottom: 32px;
    }

    &__btn {
        padding: 14px;
        border-radius: 7px;
        color: $main-color;
        font-size: 20px;
        line-height: 20px;
        font-weight: 600;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            background: #F7F8FA;
            color: $second-color;
        }

        &__active {
            background: #F7F8FA;
            color: $second-color;
        }
    }

    &__add {
        position: absolute;
        bottom: 50px;
    }
}
</style>