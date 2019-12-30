<template>
    <section class="container">
        <div class="login-wrapper">
            <form class="col-md-5 col-12" @submit.prevent>
                <h1>Login</h1>
                <div class="form-group">
                    <label for="Inputusername">Username</label>
                    <input v-model="user.username" type="text" class="form-control" id="Inputusername">
                </div>
                <div class="form-group">
                    <label for="InputPassword">Password</label>
                    <input v-model="user.password" type="password" class="form-control" id="InputPassword">
                </div>
                <button type="submit" @click="Postlogin" class="btn col-12">Sign in</button>
            </form>
        </div>
    </section>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                user: {
                    username: null,
                    password: null
                },
            }
        },
        methods: {
            Postlogin() {
                this.login(this.user);
            },
            ...mapActions(["login"])
        }
    }
</script>

<style scoped>
    form {
        font-family: "Titillium Web";
        margin: 0 auto;
        padding: 38px;
        background-color: white;
        border-radius: 6px;
        box-shadow: 0px 0px 20px 1px #c5c5c5;
        padding-bottom: 50px;
    }

    form > h1 {
        text-align: center;
        margin-bottom: 22px
    }

    .login-wrapper {
        min-height: 100vh;
        display: flex;
        margin-top: -70px;
        align-items: center;
    }

    .btn {
        background-color: #000;
        color: #fff;
    }
    .register{
        margin-top: 15px;
        margin-bottom: 0px;
        text-align: center;
    }
    .register a{
        border-bottom: 2px solid #000000;
    }
</style>