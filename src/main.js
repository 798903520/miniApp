import {
	createApp
} from "vue";
import * as Pinia from 'pinia';
import { setupStore } from './store';
import App from "./App";
const app = createApp(App);
app.use(Pinia);
setupStore(app);
app.mount('#app');