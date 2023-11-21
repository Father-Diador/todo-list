<template>
    <div class="search">
        <input
            class="search__input"
            type="text"
            placeholder="Поиск"
            @input="findText"
            v-model="search"
        >
        <div class="search__icon">
            <img src="@/assets/icons/search.svg" alt="">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const search = ref('');

const findText = () => {
    let allWords = document.getElementsByClassName('search-word');
    if (search.value.length < 1) {
        return;
    }
    for (let item of allWords) {
        if (item.textContent.toLowerCase().includes(search.value.toLowerCase())) {
            if (search.value.length > 1) {
                item.style.color = '#cccc00';
            } else {
                item.style.color = '#5e5e5e';
            }
        } else {
            item.style.color = '#5e5e5e';
        }
    }
};
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: $white;
    border-radius: 10px;
    overflow: hidden;

    &__input {
        outline: none;
        background: $white;
        border: none;
        width: 600px;
        color: $main-color;
        font-size: 18px;
        line-height: 18px;
        font-weight: 400;
        padding: 10px;
    }

    &__icon {
        cursor: pointer;
        border-radius: 0 10px 10px 0;
        padding: 15px;
        transition: 0.3s;

        img {
            width: 20px;
            height: 20px;
        }

        &:hover {
            background: #89a8f0;
        }
    }
}
</style>