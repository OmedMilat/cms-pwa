<template>
    <transition mode="out-in">
        <main id="admin-overview">
            <div class="justify-content-center container">
                <div class="logout">
                    <a class="btn btn-danger" @click="logout">
                        <i class="fa fa-power-off" title="LoggOff"></i>
                        <span class="iconbutton">Afmelden</span>
                    </a>
                </div>
                <div class="tableheader">
                    <h1 class="tabletitle">Products</h1>
                    <router-link :to="'admin/product/new'" class="tablebutton btn btn-success">
                        <i class="fa fa-plus-circle" title="toevoegen"></i>
                        <span class="iconbutton">Add Product</span>
                    </router-link>
                </div>
                <table v-bind:class="{'table table-hover' : IsResponsive}">
                    <thead>
                        <tr>
                            <th scope="col">#</th> 
                            <th>Photo</th>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="tableRow" v-for="p in products">
                            <th class="idNr" scope="row">{{p.id}}</th>
                            <td class="TableFoto "><img :src="imgSrc(p)" /></td>
                            <td data-title="Name:">{{p.name}}</td>      
                            <td data-title="Sku:">{{p.sku}}</td>      
                            <td data-title="Sku:">€{{p.price | formatNr}}</td>                   
                            <td class="tableIcons">
                                <router-link :to="'admin/product/'+p.id"><a class="edit"><i class="fa fa-cog" title="bewerken"></i></a></router-link>
                                <a class="remove" @click="deletePro(p)"><i class="far fa-trash-alt" title="verwijderen"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <v-dialog />
        </main>
    </transition>
</template>
<script>
    import store from '../store'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'

    export default {
        store,
        beforeRouteEnter(to, from, next) {
            store.dispatch("isUserAuthenticated").then(() => { next() })
        },
        filters:{
            formatNr(price){
                return parseInt(price).toLocaleString("ru-RU");
            }
        },
        computed: {
            ...mapGetters(["products"])
        },
        data() {
            return {
                IsResponsive: true,
            }
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.responsive);
                this.responsive();
            })
        },
        methods: {
             imgSrc(p) {    
                if(p.images.length > 0)
                    return p.images[0].src;
                else
                    return ''; 
            },
            deletePro(p) {
                this.$modal.show('dialog', {
                    title: 'Attention',
                    text: `You are trying to delete a product with id as ${p.id} and name ${p.name}`,
                    buttons: [
                        {
                            title: 'Cancel',
                            handler: () => { this.$modal.hide('dialog'); }
                        },
                        {
                            title: 'Delete',
                            default: true,
                            handler: () => {
                                this.deleteProduct(p);
                                this.$modal.hide('dialog'); 
                            },
                            class: 'vue-dialog-button modal-button-danger'
                        }
                    ]
                })
                
            },
            responsive() {
                var self = this;
                //console.log(document.documentElement.clientWidth);
                var w = document.documentElement.clientWidth;
                if (w > 751) {
                    self.IsResponsive = true;
                } else {
                    self.IsResponsive = false;
                }
            },
            ...mapActions(["deleteProduct","logout"])
        },
    }
</script>
<style scoped>
    #admin-overview {
        margin-top: 50px;
    }

    .edit {
        color: gray !important;
        font-size: 20pt;
        cursor: pointer;
        margin-right: 0.7vw;
    }

        .edit:hover {
            color: black !important;
        }

    .remove {
        color: red !important;
        font-size: 20pt;
        cursor: pointer;
    }

        .remove:hover {
            color: #ca0000 !important;
        }

    #dagen:first-letter {
        text-transform: capitalize;
    }

    .tableheader {
        border-radius: 3px;
        margin-top: 15px;
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
        margin-top: 3px;
    }

    .iconbutton {
        padding-left: 7px;
    }

    .btn-success, .btn-danger {
        color: white !important;
    }

    .TableFoto {
    width: 20%;
    }

    .TableFoto > img {
        border-radius: 3%;
        max-width: 150px;
        max-height: 150px;
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
    /*Mobile "Table"*/
    @media only screen and (max-width: 767px), (min-device-width: 768px) and (max-device-width: 1024px) {
        /*Source: https://css-tricks.com/responsive-data-tables */

        /* Force table to not be like tables anymore */
        table, thead, tbody, th, td, tr {
            display: block;
            padding: .25rem !important;
            border-top: none !important;
        }

            /* Hide table headers (but not display: none;, for accessibility) */
            thead tr {
                position: absolute;
                top: -9999px;
                left: -9999px;
            }

        tr {
            border: 1px solid #ccc;
        }

        td {
            /* Behave  like a "row" */
            border: none;
            border-bottom: 1px solid #eee;
            position: relative;
            padding-left: 50% !important;
        }

            td:before {
                /* Now like a table header */
                position: absolute;
                /* Top/left values mimic padding */
                left: 6px;
                width: 45%;
                padding-right: 10px;
                white-space: nowrap;
            }

            /*
    Label the data
    */
            td:before {
                font-weight: bold;
                content: attr(data-title);
                margin-left: 0.5vw;
            }

            td:nth-child(odd) {
                background-color: #eeeeee;
            }

        .tableheader {
            margin-top: 0;
            padding: 7px;
            padding-bottom: 5px;
        }

        .tableRow {
            border-radius: 6px;
            margin-bottom: 5px;
            box-shadow: 0px 0px 4px -1px rgba(0,0,0,0.75);
        }

        .idNr {
            text-align: center;
        }

        .tabletitle {
            text-align: center;
            display: block;
        }

        .tablebutton {
            float: none;
            display: block;
            margin-bottom: 5px;
        }

        .edit, .remove {
            font-size: 23pt;
        }

        .edit {
            margin-right: 5.3vw;
            margin-left: 15vw;
        }

        .tableIcons {
            padding-top: 1vh;
        }
        .logout {
            text-align: center;
            margin-bottom: 9px;
            margin-top: -13px;
        }

        .TableFoto {
            text-align: center;
            display: block;
            padding: 0px 0px;
            width: unset;
            padding-bottom: 7px;
            padding-left: 0px !important;
         }

        .TableFoto > img {
            border-radius: 3%;
            max-width: 210px;
            max-height: 150px;
        }
    }

   
</style>
