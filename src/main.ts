import {createApp} from "vue";
import App from "./App.vue";

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

//pinia
import {storeF} from './store'
import pinia from "./pinia";
const app = createApp({})
app.use(pinia);
const settings = storeF(pinia);
const lightTheme = {
    dark: false,
    colors: {
        primary: settings.color.light.primary,
        secondary: settings.color.light.secondary,
        background: settings.color.light.background,
    }
};
const darkTheme = {
    dark: false,
    colors: {
        primary: settings.color.dark.primary,
        secondary: settings.color.dark.secondary,
        background: settings.color.dark.background,
    }
};
const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        variations: {
            colors: ['primary', 'secondary', 'background'],
            lighten: 5,
            darken: 5,
        },
        themes: {
            light: lightTheme,
            dark: darkTheme
        }
    },
})

createApp(App).use(vuetify).use(pinia).mount("#app");
