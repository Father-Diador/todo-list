<template>
    <div class="sidebar__wrapper" :style="{ width: sideBar + 'px' }">
        <img src="/public/logo.svg" class="sidebar__logo" alt="">
        <router-link to="/" class="sidebar__btn">
            <img src="@/assets/icons/in-process.svg" alt="">
            <span :style="{ opacity: sidebarOpacity }">В процессе</span>
        </router-link>
        <router-link to="/donecards" class="sidebar__btn">
            <img src="@/assets/icons/in-done.svg" alt="">
            <span :style="{ opacity: sidebarOpacity }">Закрытые</span>
        </router-link>
        <div class="btn-default sidebar__add" @click="toggleMenu">
            <span class="btn-default__plus">
                <img src="@/assets/icons/add-card.svg" alt="">
            </span>
        </div>
    </div>
</template>

<script setup>
import { useMenu } from "@/stores/useMenu";
import { storeToRefs } from "pinia";

const menuStore = useMenu();
const { toggle } = menuStore;
const { sidebarOpacity, sideBar } = storeToRefs(menuStore);
const toggleMenu = () => { toggle() };
</script>

<style lang="scss" scoped>
.sidebar {
    &__wrapper {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 15px;
        // width: 100px;
        height: 100vh;
        padding: 20px;
        background: $white;
        transition: 0.1s;

        -webkit-box-shadow: 4px 0px 8px -8px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 4px 0px 8px -8px rgba(34, 60, 80, 0.2);
        box-shadow: 4px 0px 8px -8px rgba(34, 60, 80, 0.2);
    }

    &__toogle {
        cursor: pointer;
        padding: 0 15px;
        margin: 10px 0 30px 0;
        background: $accent;
        border-radius: 10px;
        img {
            width: 30px;
            height: 30px;
        }
    }

    &__logo {
        width: 60px;
        height: 60px;
        margin-bottom: 30px;
    }

    &__btn {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding: 10px;
        // border-radius: 0 7px 7px 0;
        border-left: 5px solid transparent;
        color: $main-color;
        font-size: 20px;
        line-height: 20px;
        font-weight: 600;
        transition: 0.3s;
        display: flex;
        align-items: center;
        gap: 15px;
        cursor: pointer;
        overflow: hidden;
        text-decoration: none;

        img {
            width: 30px;
            height: 30px;
        }

        &:hover {
            background: #F7F8FA;
            color: $second-color;
            border-radius: 7px;
        }

        span {
            transition-delay: 0.3s;
            transition: 0.3s;
        }
    }

    &__add {
        position: absolute;
        bottom: 50px;
    }
}

.router-link-exact-active {
    background: #F7F8FA;
    color: $second-color;
    border-left: 5px solid $accent;
    border-radius: 0 7px 7px 0 !important;
}
</style>