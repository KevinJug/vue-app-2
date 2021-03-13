<template>
    <div class="center">
        <div>
            <button  class="button-validate" v-if="swap" @click="validateColorsCircle" :disabled="validateColors">
                Valider
            </button>
            <div class="border choice-bord padding-10">
                <CircleMM v-for="c in currentColors" :key="c.index" :colors="c" :swap="swap"
                          @change-colors="swapColorCircle"/>
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
        name: "ChoiceMM",
        props: {
            colors: {
                type: Array
            },
            swap: {
                type: Boolean,
            }
        },
        data() {
            return {
                currentColors: [{
                    colors: '',
                    indexColors: -1,
                    index: 1,
                }, {
                    colors: '',
                    indexColors: -1,
                    index: 2,
                }, {
                    colors: '',
                    indexColors: -1,
                    index: 3,
                }, {
                    colors: '',
                    indexColors: -1,
                    index: 4,
                }],
                validateColors: true
            }
        },
        methods: {
            swapColorCircle(data) {
                this.currentColors[data.index - 1] = data;
                this.checkValidateColors();
            },
            validateColorsCircle() {
                this.checkValidateColors();
                if (!this.validateColors) {
                    this.$emit('validate', JSON.parse(JSON.stringify(this.currentColors)));
                    this.currentColors.forEach((colors) => {
                        colors.colors = '';
                        colors.indexColors = -1;
                    })
                }
            },
            checkValidateColors() {
                let currentColorsOK = this.currentColors.reduce((acc, obj) => {
                    if (obj.indexColors !== -1) {
                        acc.push(obj);
                    }
                    return acc
                }, []);
                this.validateColors = currentColorsOK.length !== this.currentColors.length;
            }
        }
    }
</script>

<style scoped>

</style>