<template>
    <div class="border choice-bord padding-10">
        <p v-for="c in combination"
                class="circle center border"
                :class="'circle-' + c"
        ></p>
    </div>
</template>

<script>
    export default {
        name: "WinResultMM",
        props : {
            combination : {
                type: Array
            }
        }
    }
</script>

<style scoped>

</style>