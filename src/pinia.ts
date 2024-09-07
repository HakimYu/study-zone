import { createPinia } from 'pinia'
import persisitedstate from "pinia-plugin-persistedstate";
const pinia = createPinia()
pinia.use(persisitedstate);
export default pinia