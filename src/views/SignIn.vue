<template>
    <div class="signup">
        <div class="signup__form">
            <span class="signup__form__title">Вход</span>
            <input type="text" placeholder="Логин" v-model="data.login">
            <input type="password" placeholder="Пароль" v-model="data.password">
            <button class="signup__form__button" @click="login">Войти</button>
        </div>
    </div>
</template>

<script setup>
import { reactive, onBeforeMount } from "vue";
import http from "@/js/http";
import { useRouter } from "vue-router";
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

const router = useRouter();

const data = reactive({
    login: '',
    password: '',
});

const login = () => {
    http.auth(data, (res) => {
        if (res.status == 200) {
            createToast("You are logged in!", {
                type: "success",
            });

            let now = new Date();
            let time = now.getTime();
            let expireTime = time + 1000*36000;
            now.setTime(expireTime);
            document.cookie = 'cookie=logged;expires='+now.toUTCString()+';path=/';

            router.push('/allcards');
        } else {
            createToast("Error, user not found!", {
                type: "danger",
            });
        }
    });
};

onBeforeMount(() => {
  if (document.cookie) {
    router.push('/allcards');
  }
});
</script>

<style lang="scss" scoped>
.signup {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    // background: url('/public/background-blue.jpeg');
    // background-size: cover;

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
