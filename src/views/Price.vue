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
            <p>Bravo, vous gagnez en {{counter}} essais et en {{ timerF | hours }}.</p>
            <div class="margin-b15" v-if="stateRecord">
                <input class="input-rank" v-model="record">
                <button @click="recordRanking" class="button-rank">Enregistrer dans le classement</button>
            </div>
            <button class="button-new-game" @click="reset">Nouvelle partie</button>
        </div>
    </div>
</template>

<script>
    import _ from "lodash";
    import mixinRanking from "../mixin/ranking";

    export default {
        name: "Price",
        mixins: [mixinRanking],
        data() {
            return {
                number: '',
                limit: '',
                justPrice: '',
                win: false,
                counter: 0,
                etat: '',
                record: '',
                stateRecord: true
            }
        },
        beforeMount() {
            this.limit = 10000;
            this.randomNumber();
        },
        filters: {
            number(number) {
                return new Intl.NumberFormat('fr-FR').format(number)
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
                            this.endTimer();
                        } else if (this.number > this.justPrice) {
                            this.etat = "b-minus";
                        } else {
                            this.etat = "b-plus"
                        }
                    }
                }, 1000)
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
                this.stateRecord= true;
                this.justPrice = Math.floor(Math.random() * Math.floor(this.limit));
                this.startTimer();
            },
            recordRanking() {
                if (this.record) {
                    this.rankingPrice({timerS: this.timerS, timerF: this.timerF, name: this.record});
                    this.stateRecord = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>