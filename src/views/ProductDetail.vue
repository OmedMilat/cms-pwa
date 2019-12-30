<template>
   <main class="container">
        <div class="row">
            <div class="tableheader col-12">
                <h1 class="tabletitle">{{tableTitle}}</h1>
                 <a class="tablebutton btn btn-success" @click="save">
                        <i class="fa fa-save" title="opslaan"></i>
                        <span class="iconbutton">Opslaan</span>
                </a>
                <router-link to="/admin" class="tablebutton btn btn-warning">
                    <i class="fa fa-ban" title="annuleren"></i>
                    <span class="iconbutton">Cancel</span>
                </router-link>
            </div>
            <div class="col-12 form-row">
                <div class="form-group col-12 col-md-4">
                    <label for="Name">Name:</label>
                    <input v-model="productDetail.name" type="text" class="form-control" id="Name" >
                </div>
                 <div class="form-group col-4 col-md-2">
                    <label for="SKU">SKU:</label>
                    <input v-model="productDetail.sku" type="text" class="form-control" id="SKU" >
                </div>
                <div class="form-group col-4 col-md-2">
                    <label for="Price">Price:</label>
                    <div class="input-group mb-2 mr-sm-2">
                        <div class="input-group-prepend">
                            <div class="input-group-text">€</div>
                        </div>
                        <input v-model="productDetail.price" type="text" class="form-control" id="Price" >
                    </div>
                </div>
                <div class="form-group col-4 col-md-2">
                    <label for="Stock">Stock:</label>
                    <input v-model.number="productDetail.stock_quantity" type="number" class="form-control" id="Stock" >
                </div>
                <div class="form-group col-4 col-md-2">
                    <label for="Weight">Weight:</label>
                    <div class="input-group mb-2 mr-sm-2">
                         <input v-model="productDetail.weight" type="text" class="form-control" id="Weight" >
                        <div class="input-group-prepend">
                            <div class="input-group-text">KG</div>
                        </div>
                    </div>
                </div>
         
                <div v-if="isNewProduct" class="form-group col-12 col-md-4">
                    <label for="CoverImage">Cover image:</label>
                    <input v-model="imageUrls[0]" type="url" class="form-control" id="CoverImage" >
                </div>
                <div v-if="isNewProduct" class="form-group col-12 col-md-4">
                    <label for="Image2">Image 2:</label>
                    <input v-model="imageUrls[1]" type="url" class="form-control" id="Image2" >
                </div>
                <div v-if="isNewProduct" class="form-group col-12 col-md-4">
                    <label for="Image3">Image 3:</label>
                    <input v-model="imageUrls[2]" type="url" class="form-control" id="Image3" >
                </div>
            
                <div class="form-group col-12">
                    <label for="Description">Description:</label>
                    <textarea v-model="productDetail.short_description" type="text" class="form-control" id="Description" rows="3" />
                </div>
            </div>
         
        </div>
   </main>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import store from "../store";

export default {
    store,
    beforeRouteEnter(to, from, next) {
        if(to.params.id !== "new")
            store.dispatch('fetchProductDetail', to.params.id).then(() => { next(vm => vm.tableTitle = "Edit product") });
        else
            next(vm => {vm.tableTitle = "Add product", store.state.productDetail = {}, store.state.productDetail.id = 0,
             store.state.productDetail.manage_stock = true, vm.isNewProduct = true,
             
             store.state.productDetail.images = [{src: "http://localhost/wordpress/wp-content/uploads/2019/12/cover-1.jpg", name:"hoho", alt:""}]

             });
    },
    computed: {
        ...mapGetters(["productDetail"]), 
    },
    data() {
        return {
            tableTitle: '',
            isNewProduct: false,
            imageUrls: [],
        }
    },
    methods: {
        save(){
            if(this.productDetail.on_sale)
                this.productDetail.sale_price = this.productDetail.price;
            else
                this.productDetail.regular_price = this.productDetail.price;
            

            if(this.isNewProduct){
                this.imageUrls.forEach((img, i) => {
                    this.productDetail.images[i] = {src: img, name: "hoho"+i, alt:""}
                })
                this.createProduct(this.productDetail);
            }
            else
                this.updateProductDetail(this.productDetail);   
        },
        ...mapActions(["updateProductDetail", "createProduct"]), 
    }
};
</script>

<style scoped>
  .tableheader {
        border-radius: 3px;
        margin-top: 20px;
        padding: 20px;
        padding-bottom: 15px;
        background-color: #222222;
    }

    .tabletitle {
        display: block;
        color: white;
        text-align: center;
    }

    .tablebutton {
        width: 100%;
        float: none;
    }

    .iconbutton {
        padding-left: 5px;
    }

    .btn-success {
        color: white !important;
    }

    @media (min-width: 768px) {
        .tablebutton {
            width: auto;
            float: right;
            margin-top: 3px;
            margin-left: 10px;
        }

        .tabletitle {
            display: inline;
            text-align: start;
        }
    }
    .btn-light {
        border-color: #ced4da !important;
    }

    .tableheader {
        margin-bottom: 25px;
    }

    .editbuttons {
        text-align: right;
        margin-top: 2em;
        margin-bottom: 2em;
        padding: 0;
    }

        .editbuttons a {
            /*font-size: 13pt;*/
        }
    
    .form-group {
        font-family: "Titillium Web";
        font-size: 1.1rem;
    }
    .form-row{
        padding-left: 0px;
        padding-right: 0px;
    }
</style>