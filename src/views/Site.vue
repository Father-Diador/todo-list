<template>
    <div class="wrapper">
        <div class="aaa">
            {{ count }}
        </div>
        <div class="bbb">
            <button @click="a">a</button>
            <button @click="b">b</button>
        </div>
    </div>
</template>

<script setup>
// export default {
//     data() {
//         return {
//             count: 0,
//         }
//     },
//     methods: {
//         a() {
//             this.count += 1;
//         },
//         b() {
//             this.count -= 1;
//         }
//     }
// }

import { ref } from 'vue';

const count = ref(0);

const a = () => {
    count.value += 1;
}

const b = () => {
    count.value -= 1;
}

</script>

<style lang="scss" scoped>
.wrapper {
    width: 1400px;
    background: #75c1ff;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
}
.aaa {
    font-size: 100px;
    font-weight: 500;
    color: #fff;
}

.bbb {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 400px;

    button {
        color: #fff;
        padding: 10px 50px;
        background: #42ff9e;
        border-radius: 5px;
        border: none;
        font-size: 20px;
        transition: 0.4s;
        cursor: pointer;
        
        &:hover {
            background: #00db6a;
        }
    }
}
</style>