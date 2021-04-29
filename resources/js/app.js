/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import Components from 'laravel-mix/src/components/Components';
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './Router/index';
import store from './Store/index';


require('./bootstrap');

window.Vue = require('vue').default;

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
Vue.use(VueRouter);
Vue.component('left-navigation', require('./components/LeftNavigation.vue').default);
Vue.component('workouts', require('./components/Workouts.vue').default);
Vue.component('profile', require('./components/Profile.vue').default);
Vue.component('login', require('./components/Login.vue').default);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
*/
const app = new Vue({
    router,
    store,
    el: '#app',
});
