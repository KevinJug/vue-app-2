<template>
    <div>
        <div v-if="!win">
            <p> Trouvez la valeur entre 0 et {{limit | number}}</p>
            <label>Votre prix est :</label>
            <input class="input-search" v-model="price">
            <p v-if="number">Dernier prix : {{number | number}}</p>
            <div v-if="etat">
                <img :src="getImgUrl(etat)" :alt="etat">
            </div>
        </div>
        <div v-else>
            <p>Bravo, vous gagnez en {{counter}} essais</p>
            <button class="button-new-game" @click="reset">Nouvelle partie</button>
        </div>
    </div>

</template>

<script>
    import _ from "lodash";

    export default {
        name: "Price",
        data() {
            return {
                number: '',
                limit: '',
                justPrice: '',
                win: false,
                counter: 0,
                etat: ''
            }
        },
        beforeMount() {
            this.limit = 10000;
            this.randomNumber();
        },
        filters: {
            number(number) {
                return new Intl.NumberFormat('fr-FR', {maximumSignificantDigits: 3}).format(number)
            }
        },
        computed: {
            price: {
                get: function () {
                    return '';
                },
                set: _.debounce(function (newValue) {
                    ++this.counter;
                    newValue = parseInt(newValue);
                    if (isNaN(newValue)) {
                        this.etat = 'stop';
                    } else {
                        this.number = newValue;
                        if (newValue == this.justPrice) {
                            this.win = true;
                        } else if (this.number > this.justPrice) {
                            this.etat = "b-minus";
                        } else {
                            this.etat = "b-plus"
                        }
                    }
                }, 700)
            }
        },
        methods: {
            getImgUrl(etat) {
                var images = require.context('../assets/img/', false, /\.png$/);
                return images('./' + etat + ".png")
            },
            reset() {
                this.number = '';
                this.justPrice = '';
                this.win = false;
                this.counter = 0;
                this.etat = '';
                this.randomNumber();
            },
            randomNumber() {
                this.justPrice = Math.floor(Math.random() * Math.floor(this.limit));
            }
        }
    }
</script>

<style scoped>

</style>