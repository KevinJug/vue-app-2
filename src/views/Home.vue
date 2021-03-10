<template>
    <div class="home">
        <!--    <img alt="Vue logo" src="../assets/logo.png">-->
        <div class="justPrix img-home">
            <router-link to="/price"><img alt="Vue logo" src="../assets/img/JustePrix.png" width="300px" height="300px">
            </router-link>
        </div>
        <div class="pendu img-home">
            <router-link to="/pendu"><img alt="Vue logo" src="../assets/img/Pendu.png"></router-link>
        </div>
        <div class="mastermind img-home">
            <router-link to="/mastermind"><img alt="Vue logo" src="../assets/img/mastermind.png"></router-link>
        </div>
        <div class="classement img-home">
            <router-link to="/classement"><img alt="Vue logo" src="../assets/img/classement.png"></router-link>
        </div>
        <div class="line-top"></div>
        <div class="line-bottom"></div>
        <div class="line-left"></div>
        <div class="line-right"></div>
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Home'
    }
</script>

<style>
    @import "../assets/css/home.css";
</style>
