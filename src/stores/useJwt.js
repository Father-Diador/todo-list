import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useJwt = defineStore('useJwt', () => {

  const jwt = ref(0);

  const setJwt = (value) => {
    jwt.value = value;
  };

  const getJwt = () => {
    return jwt.value;
  };

  return { getJwt, setJwt, jwt };
});