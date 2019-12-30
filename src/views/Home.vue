<template>
  <div class="row">
    <h1 class="col-12">Products</h1>
    <div v-for="p in products" class=" col-12 col-md-6 col-lg-4">
      <div class="card" :class="{'on-sale': p.on_sale}">
        <img :src="imgSrc(p)" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{{p.name}}</h5>
          <h6 class="card-subtitle mb-2 text-muted">€{{p.price | formatNr()}}</h6>
          <p class="card-text">{{p.short_description | striphtml}}</p>
          <a :href="p.permalink" class="btn btn-danger">More information</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  filters: {
    striphtml(value) {
      let div = document.createElement("div");
      div.innerHTML = value;
      let text = div.textContent || div.innerText || "";
      return text;
    },
    formatNr(price) {
      return parseInt(price).toLocaleString("ru-RU");
    }
  },
  computed: {
    ...mapGetters(["products"])
  },
  methods: {
    imgSrc(p) {
      if (p.images.length > 0) return p.images[0].src;
      else return "";
    }
  }
};
</script>
<style scoped>
h1{
  margin-top: 20px;
}
.card {
  margin-top: 20px;
  font-family: "Titillium Web";
  font-size: 1.25em;
  max-height: 444px;
}
.btn-danger {
  font-family: "Formula1 Display-Regular";
  float: right;
}
.on-sale{
  border: 2px solid #ff000061;
  box-shadow: 0px 0px 12px 0px rgb(252, 122, 122);
}
</style>
