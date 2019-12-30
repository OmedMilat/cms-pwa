import Vue from 'vue'
import Vuex from 'vuex'
import {router} from './router/router'
import axios from 'axios'
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

Vue.use(Vuex)
const apiUrl = 'https://dev-cmshowest.pantheonsite.io/wp-json';

const wcApi = new WooCommerceRestApi({
  url: "https://dev-cmshowest.pantheonsite.io",
  consumerKey: "ck_a83411893a24e123db1d5ce627d98a3262f0cd22",
  consumerSecret: "cs_7dd869d1c4f03cf6759a6e20e3cf2395eb6dcbac",
  version: "wc/v3",
  queryStringAuth: true
});

const state = {
  products: [],
  productDetail: {},
  token: null,
}

const getters = {
  token: (state) => {
    return state.token;
  },
  products: (state) => {
    return state.products;
  },
  productDetail: (state) => {
    return state.productDetail;
  }
}


const actions = {
  async fetchProducts({ commit, dispatch }) {
    await wcApi.get("products")
      .then(res => {
        commit('updateProducts', res.data);
      })
      .catch(error => {
        console.log(error)
      })
  },
  async fetchProductDetail(context, id) {
    await wcApi.get(`products/${id}`)
      .then(res => {
        context.commit('populateProductDetail', res.data);
      })
      .catch(error => {
        console.log(error)
      })
  },
  async updateProductDetail(context, data){
    console.log(data)
    await wcApi.put(`products/${data.id}`, data)
      .then(res => {
        context.commit('updateProductDetail', res.data);
        router.replace({ name: "admin" });
      })
      .catch(error => {
        console.log(error)
      })
  },
  async createProduct(context, data){
    console.log("pre", data)
    await wcApi.post(`products`, data)
      .then(res => {
        console.log("after", res.data)
        context.commit('createProduct', res.data);
        router.replace({ name: "admin" });
      })
      .catch(error => {
        console.log(error)
      })
  },
  async deleteProduct(context, data) {
    await wcApi.delete(`products/${data.id}`)
      .then(res => {
        context.commit('deleteProductItem', res.data);
      })
      .catch(error => {
        console.log(error)
      })
  },
  async login(context, data) {
    await axios.post(`${apiUrl}/jwt-auth/v1/token`, data)
      .then(res => {
        context.commit('authUser', res.data)
        router.replace({ name: "admin" });
      })
      .catch(error => {
        console.log(error)
      })
  },
  async isUserAuthenticated() {
    let storage = JSON.parse(localStorage.getItem("F1token"));
    if(storage == null)
      router.replace({ name: "login" })
      
    let acces = ["shop_manager", "administrator"];
    
    return new Promise((resolve, reject) => {
        axios.post(`${apiUrl}/jwt-auth/v1/token/validate `,{}, { 
          headers: { 'Authorization': "Bearer "+ storage.token} })
            .then(res => {
              if(acces.indexOf(storage.role[0]) > -1)
                resolve();
              else
                reject("HTTP 401: Unauthorized")
            })
            .catch(error => {
                console.log(error)
                router.replace({ name: "login" })
                reject(error);
            })
    })
  }
}


const mutations = {
  updateProducts(state, data) {
    state.products = data
  },
  populateProductDetail(state, data) {
    state.productDetail = data
  },
  updateProductDetail(state, data) {
    state.products = state.products.filter(p => {
       return p.id !== data.id
    })
    state.products.push(data);
  },
  createProduct(state, data) {
    state.products.push(data);
  },
  deleteProductItem(state, data) {
    state.products = state.products.filter(p => {
      return p.id !== data.id
   })
  },
  authUser(state, data) {
    localStorage.setItem("F1token", JSON.stringify(data));
    state.token = localStorage.getItem("F1token");
  },
  logOut(state) {
    state.token = null;
    localStorage.removeItem("F1token");
    if(window.location.pathname === "/admin")
      router.replace({ name: "home" });
  }
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});