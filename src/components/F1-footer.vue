<template>
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-6 col-md-4">
                    <a href="https://www.facebook.com/Formula1/" target="_blank"><i class="fab fa-facebook-square"></i></a>
                    <span>@Formula1</span>
                </div>
                <div class="col-6 col-md-4">
                    <a href="https://www.youtube.com/user/Formula1"
                       target="_blank"><i class="fab fa-youtube"></i></a>
                    <span>
                        Formula 1
                    </span>
                </div>
                <div class="col-12 col-md-4">
                    <a href="https://www.instagram.com/f1/" target="_blank"><i class="fab fa-instagram"></i></a>
                    <span>
                       @F1
                    </span>
                </div>
                <div class="col-12 row justify-content-center footer-bottom">
                    <div class="col-6 col-md-4 f1tv">
                        <a href="https://f1tv.formula1.com/en/" target="_blank">
                            <img src="/assets/images/icons/f1tv.png" alt="icon of a tv">
                        </a>
                        <span>
                            F1TV
                        </span>
                    </div>
                    <div class="col-6 col-md-4 twitter">
                        <a href="https://twitter.com/f1" target="_blank"><i class="fab fa-twitter"></i></a>
                        <span>
                             @F1
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>
<script>

</script>
<style scoped>
    footer {
        width: 100%;
        padding: 20px;
        background: #3a3a3a;
        margin-top: 50px;
        /* position: fixed;
        bottom: 0; */
    }
    i {
        font-size:2rem;
        color: #fff;
    }
    div > a {
        display:block;
        text-align:center;
    }
    span {
        text-align: center;
        display: block;
        color: #fff;
    }
    .twitter {
        padding-left: 56px;
    }
    .f1tv{
        padding-left: 35px;
    }
    .f1tv img{
        width: 36px;
    }
    @media screen and (max-width: 767px) {
        .footer-bottom {
            padding: 0;
            margin-top: 15px;
        }

    }

</style>
