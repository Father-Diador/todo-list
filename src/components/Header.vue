<template>
    <div class="header">
        <div class="header__sidebar" @click="toogleSide">
            <img src="@/assets/icons/sidebar-icon.png" alt="">
        </div>
        <div v-if="route.name !== 'localcards'" class="header__search">
            <Search />
        </div>
        <div class="header__date">
            <span>
                Today
            </span> 
            <span>
                {{ currentDay }}
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useMenu } from "@/stores/useMenu";
import Search from "@/components/Search.vue"
import { useRoute } from "vue-router";

const route = useRoute();
const menuStore = useMenu();
const { toggle, toogleSidebar } = menuStore;
const toggleMenu = () => { toggle() };

const toogleSide = () => { toogleSidebar() };

const currentDay = ref();

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

currentDay.value = mm + '.' + dd + '.' + yyyy;
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px 0;
    width: 100%;
    top: 0;
    box-sizing: border-box;
    height: 100px;
    // background: $white;
    // border-bottom: 1px solid ;
    // -webkit-box-shadow: 0px 4px 11px -6px rgba(34, 60, 80, 0.2);
    // -moz-box-shadow: 0px 4px 11px -6px rgba(34, 60, 80, 0.2);
    // box-shadow: 0px 4px 11px -6px rgba(34, 60, 80, 0.2);

    &__search {
        max-width: 670px;
        width: 60%;
    }

    &__sidebar {
        cursor: pointer;
        padding: 10px;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        transition: 0.3s;
        img {
            width: 32px;
            height: 32px;
        }

        &:hover {
            background: $white;
        }
    }

    &__date {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
}
</style>