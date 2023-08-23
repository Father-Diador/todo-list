<template>
    <div class="header">
        <div class="btn-default">Добавить</div>
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
const currentDay = ref();

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

currentDay.value = mm + '.' + dd + '.' + yyyy;
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 20px 40px;
    width: 100%;
    top: 0;
    box-sizing: border-box;
    height: 100px;
    background: $white;
    // border-bottom: 1px solid ;
    -webkit-box-shadow: 0px 4px 11px -6px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 4px 11px -6px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 4px 11px -6px rgba(34, 60, 80, 0.2);

    &__date {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
}
</style>