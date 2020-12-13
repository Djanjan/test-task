import { createApp } from "vue";

import 'babel-polyfill'

import "./css/index.css"
import "./css/components/index.css"
import "./css/spacing/index.css"
import "./css/theme/index.css"
import "./css/typography/index.css"

import App from "./App.vue";

createApp(App)
  .mount("#genetic-variants");
