<template>
    <nav class="navbar sticky-top navbar-expand-md navbar-dark bg-danger" v-bind:class="{homeNav : transparentNav}">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <router-link class="navbar-brand" to="/"><img class="nav-logo" :src=logosrc /></router-link>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item" v-for="route in filteredRoutes" data-toggle="collapse" data-target=".navbar-collapse.show">
                    <router-link tag="a" class="nav-link" :to="route.path">
                    <span>{{ route.display }}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <router-link v-if="!LoggedIn" tag="button" :to="{ name: 'login'}" class="btn login-btn" v-bind:class="{homeLogin : transparentNav}" type="submit">
            <i class="far fa-user"></i>
            <span class="d-none d-md-inline">LOGIN</span>
        </router-link>
        <button v-if="LoggedIn" @click="logOutUser" class="btn login-btn" v-bind:class="{homeLogin : transparentNav}">
            <i class="fas fa-sign-out-alt"></i>
            <span class="d-none d-md-inline">LOGOUT</span>
        </button>
    </nav>
</template>

<script>
    import { routes } from '../router/routes';
    import {mapMutations} from 'vuex'
    export default {
        computed: {
            logosrc() {
              return '/assets/images/icons/logo/f1_logo.svg';
            },
            filteredRoutes() {
                return routes.filter((r) => {
                    if (r.display !== "hide") {
                        return true
                    }
                })
            },
            transparentNav(){
                return this.currRoute && this.pageYposition === 0 && this.widthPage > 845;
            },
            LoggedIn(){
                return  this.userLogged || this.$store.getters.token || localStorage.getItem("F1token");
            },
        },
        mounted() {
            this.widthPage = document.body.clientWidth;

            window.addEventListener('scroll', (()=>{
                this.pageYposition = window.pageYOffset;
            }));
            window.addEventListener('resize', (()=>{
                this.widthPage = document.body.clientWidth;
                
            }));
        },
        watch:{
            $route(){            
               this.currRoute = this.$router.currentRoute.name === "home";
            }
        },
        data() {
            return {
                routes,
                pageYposition: 0,
                widthPage:846,
                currRoute: this.$router.currentRoute.name === "home",
                userLogged:null,
            }
        },
        methods:{
            removeFocus(e){
               //removes the focus that stays after click.
               e.srcElement.blur();
            },
            logOutUser(){
               this.logOut();
               this.userLogged = false;
            },
            ...mapMutations(["logOut"])
        }
    }
</script>

<style scoped>

    nav{
        padding: 0 22px;
    }
    .bg-danger {
        background-color: #e10600 !important;
        transition: 0.3s;
    }
    /* .homeNav{
        background-color: #e1060000 !important;
    } */
    .homeLogin{
        background-color: #0000 !important;
        border: 1px solid;
        transition: 0.3s;
    }
    .navbar-dark .navbar-brand {
        border: none;
        padding-bottom: 0px;
        padding-top: 0;
    }
    span{
        font-size: 1.1em;
    }
    .router-link-exact-active > span {
        border-bottom: 1.5px solid #ffffff;
        border-right: 1.5px solid #ffffff;
        border-bottom-right-radius: 11px;
        padding-bottom: 5px;
        padding-right: 11px;
    }
    .nav-link{
        padding: 32px 0;
    }
    .nav-item:hover{
        background: #000 !important;
    }
    .nav-link:active{
        background: none;
    }
    .nav-item > .nav-link, .nav-item > .nav-link:hover, .nav-link:focus{
        color: #fff !important;
    }

    .nav-logo{
        width:150px;
    }
    .login-btn{
        background-color: #000;
        color: #fff;
    }
    .d-md-inline{
        margin-left:5px;
    }
    @media screen and (max-width: 768px) {
        .nav-logo{
            width:120px;
        }
        .navbar-brand {
            margin: 0 auto;
        }
        nav{
            padding: 16px 22px
        }
        .nav-link{
            padding: 5px 0;
        }
        .router-link-exact-active > span {
            border:none;
            padding-bottom: 5px;
            padding-right: 11px;
        }
        i{
            font-size: 1.1rem;
        }
        .router-link-exact-active{
            border-bottom: 1.5px solid #ffffff;
            border-right: 1.5px solid #ffffff;
            border-bottom-right-radius: 11px;
            /*padding-bottom: 5px;*/
            /*padding-right: 11px;*/
        }
    }
</style>