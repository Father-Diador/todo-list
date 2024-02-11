<template>
    <div class="signup">
        <div class="signup__form">
            <span class="signup__form__title">Вход</span>
            <input type="text" placeholder="Логин" v-model="data.login">
            <input type="password" placeholder="Пароль" v-model="data.password">
            <button class="signup__form__button" @click="login()">Войти</button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import http from "@/js/http";
const data = reactive({
    login: '',
    password: '',
});

const login = () => {
    http.auth(data, (res) => {
        console.log(res);
    });
};
</script>

<style lang="scss" scoped>
.signup {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: url('/public/background-blue.jpeg');
    background-size: cover;

    &__form {
        background: $bg-overlay;
        position: absolute;
        // background: $bg;
        border-radius: 10px;
        padding: 70px 25px 100px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
        box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);

        &__title {
            font-size: 24px;
            font-weight: 500;
            margin-bottom: 10px;
            color: $white;
        }

        input {
            width: 300px;
            border: none;
            background: $white;
            outline: none;
            padding: 10px 20px;
            border-radius: 2px;
            -webkit-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
            -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
            box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);

            font-size: 18px;
            line-height: 24px;
        }

        &__button {
            margin-top: 10px;
            // width: max-content;
            width: 100%;
            padding: 10px 20px;
            border-radius: 2px;
            border: none;
            background: $accent;
            color: $white;
            cursor: pointer;
            transition: 0.3s;

            &:hover {
                background: $accent-hover;
            }
        }
    }
}
</style>
