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
                    initialization: "?"
                }, {
                    colors: '',
                    indexColors: -1,
                    index: 2,
                    initialization: "?"
                }, {
                    colors: '',
                    indexColors: -1,
                    index: 3,
                    initialization: "?"
                }, {
                    colors: '',
                    indexColors: -1,
                    index: 4,
                    initialization: "?"
                }],
                validateColors: true
            }
        },
        methods: {
            swapColorCircle(data) {
                if (data.indexColors === -1 || data.indexColors === 5) {
                    data.indexColors = 0;
                } else {
                    ++data.indexColors;
                }
                data.colors = this.colors[data.indexColors];
                this.checkValidateColors();
            },
            validateColorsCircle() {
                this.checkValidateColors();
                if (!this.validateColors) {
                    this.$emit('validate', JSON.parse(JSON.stringify(this.currentColors)));
                    this.currentColors.forEach((colors) => {
                        colors.colors = '';
                        colors.indexColors = -1;
                        colors.initialization = "?";
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