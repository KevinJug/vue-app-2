<template>
    <div>
        <div v-if="!search">
            <label>Limite</label>
            <input v-model="limit">
        </div>
        <div v-else-if="!win">
            <p> Trouvez la valeur entre 0 et {{limit}}</p>
            <label>Valeur</label>
            <input v-model="price">
            <p>Votre valeur : {{number}}</p>
            <p>Essai : {{counter}}</p>
            <p>{{message}}</p>
        </div>
        <div v-else>
            {{message}}
            <button @click="reset">Encore ?</button>
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
                search: false,
                win: false,
                message : '',
                counter:0
            }
        },
        computed : {
            price : {
                get: function() {
                    return '';
                },
                set : _.debounce(function (newValue) {
                    ++this.counter;
                    this.number = newValue;
                    if (newValue == this.justPrice){
                        this.win = true;
                        this.message = `Bravo vous avez gagnez en ${this.counter} essais!!!`
                    } else if(this.number > this.justPrice) {
                        this.message = "Le nombre est plus petit."
                    } else {
                        this.message = "Le nombre est plus grand."
                    }

                },700)
            }
        },
        watch : {
            limit() {
                this.limit = parseInt(this.limit);
                this.randomNumber();
            }
        },
        methods: {
            reset(){
                this.number= '';
                this.limit= '';
                this.justPrice= '';
                this.search= false;
                this.win= false;
                this.message= '';
                this.counter=0
            },
            randomNumber: _.debounce(function () {
                if (typeof this.limit === 'number' && this.limit){
                    this.justPrice = Math.floor(Math.random() * Math.floor(this.limit));
                    this.search = true;
                } else {
                    this.limit = '';
                }
            }, 700)
        }
    }
</script>

<style scoped>

</style>