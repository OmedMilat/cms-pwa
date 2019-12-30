<template>
  <div id="app">
    <template>
      <nav-menu params="route: route"></nav-menu>
    </template>
    <main id="main" class="container">
      <router-view></router-view>
    </main>
    <f1-footer></f1-footer>
  </div>
</template>
<script>
import Vue from "vue";
import { store } from "./store";
import NavMenu from "./components/Nav-Menu";
import F1footer from "./components/F1-footer";

Vue.component("nav-menu", NavMenu);
Vue.component("f1-footer", F1footer);

export default {
  created() {
    this.$store.dispatch("fetchProducts");
    this.serviceWorker();
  },
  methods: {
            serviceWorker() {
                if ('serviceWorker' in navigator) {
                    try {
                        navigator.serviceWorker.register('./sw.js');
                    } catch (e) {
                        console.log(e)
                    }
                }
            },
        }
};
</script>

<style>
@font-face {
  font-family: "Formula1 Display-Regular";
  src: url("/assets/fonts/Formula1-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "Formula1 Display-Bold";
  src: url("/assets/fonts/Formula1-Bold.ttf") format("truetype");
}

@font-face {
  font-family: "Titillium Web";
  src: url("/assets/fonts/TitilliumWeb-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "Titillium Web SemiBold";
  src: url("/assets/fonts/TitilliumWeb-SemiBold.ttf") format("truetype");
}

body {
  font-family: "Formula1 Display-Regular";
  background-color: #f3f3f3;
  font-size: 0.9rem;
}
h1 {
  font-size: 2.25rem;
}
h1,
h2,
h3,
h4,
h5 {
  color: #000;
  font-family: "Formula1 Display-Bold";
}

a,
a:hover {
  color: unset;
  text-decoration: none;
}

.title {
  padding: 20px 0;
}

#nprogress .bar {
  background: #000;
  height: 3.4px;
  z-index: 0;
  margin-top: 87px;
}

#nprogress .peg {
  box-shadow: 0 0 13px #000, 0 0 5px #000;
}

#nprogress .spinner {
  display: none;
}

@media screen and (max-width: 768px) {
  #nprogress .bar {
    margin-top: 72px;
  }
}
/*confirmation dialog*/
.modal-button-danger {
  border-bottom: 3px solid #ff7777 !important;
}
</style>
