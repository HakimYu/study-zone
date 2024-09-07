import {createPinia, defineStore} from 'pinia'
import {ref} from "vue";
import persisitedstate from "pinia-plugin-persistedstate";

const pinia = createPinia()
pinia.use(persisitedstate);
export const storeF = defineStore('store', () => {
    const color = ref({
        'light': {
            primary: '#ffffff',
            secondary: '#ffffff',
            background: '#ffffff'
        },
        'dark': {
            primary: '#212121',
            secondary: '#212121',
            background: '#121212'
        }
    });

    return {
        color
    }},
    {
        persist: true,
    }
)
    export default pinia