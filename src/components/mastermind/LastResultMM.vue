<template>
    <div>
        <div v-for="(result, index) in results" class="center">
            <div class="choice-bord">
                <div class="border width-70 circle-perfect">
                    <p v-for="n in result.result.perfect" class="triangle-code-perfect" :key="n"></p>
<!--                    <p>{{result.result.perfect}}</p>-->
                </div>
                <div class="border choice-bord padding-10">
                    <CircleMM v-for="r in result.data" :key="index + r.index" :colors="r" :swap="swap"/>
                </div>
                <div class="border width-70 circle-good">
                    <p v-for="n in result.result.good" class="triangle-code-good" :key="n"></p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import CircleMM from "./CircleMM";

    export default {
        components: {
            CircleMM
        },
        name: "LastResultMM",
        props: {
            results: {
                type: Array
            },
            swap: {
                type: Boolean,
            },
        }
    }
</script>

<style scoped>

</style>