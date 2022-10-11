import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import store from "./store";

import "./assets/main.css";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:
    "66923151689-dsbgpm94qqlvlrpj6mvvph2uioiplccb.apps.googleusercontent.com",
});

app.use(store)

app.use(router);

app.mount("#app");
