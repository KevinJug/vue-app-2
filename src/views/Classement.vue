<template>
    <div class="classement">
        <div class="rankingPrice">
            <h2>Juste prix</h2>
            <div v-if="this.storageRanking.price.length === 0">
                Pas de classement pour l'instant.
            </div>
            <div v-else>
                <div v-for="(rank, index) in this.storageRanking.price" class="rankingPriceState">
                    <div class="rankingPriceRank">{{ index + 1}} :</div>
                    <div class="rankingPriceName">{{ rank.name }}</div>
                    <div class="rankingPriceTimer">{{ rank.timerF }}</div>
                </div>
            </div>
        </div>
        <div class="rankingPendu">
            <h2>Pendu</h2>
            <div class="modes">
                <span @click="choiceMode('easy')" class="mode" :class="mode === 'easy' ? 'actived' : ''">Facile (animaux)</span>
                <span @click="choiceMode('hard')" class="mode" :class="mode === 'hard' ? 'actived' : ''">Difficile</span>
            </div>
            <div v-if="pendu.length === 0">
                Pas de classement pour l'instant.
            </div>
            <div v-else>
                <div v-for="(rank, index) in pendu" class="rankingPenduState">
                    <div class="rankingPenduRank">{{ index + 1}} :</div>
                    <div class="rankingPenduName">{{ rank.name }}</div>
                    <div class="rankingPenduTimer">{{ rank.number }}</div>
                </div>
            </div>
        </div>
        <div class="rankingMastermind">
            <h2>Mastermind</h2>
            <div v-if="this.storageRanking.mastermind.length === 0">
                Pas de classement pour l'instant.
            </div>
            <div v-else>
                <div v-for="(rank, index) in this.storageRanking.mastermind" class="rankingMastermindState">
                    <div class="rankingMastermindRank">{{ index + 1}} :</div>
                    <div class="rankingMastermindName">{{ rank.name }}</div>
                    <div class="rankingMastermindTimer">{{ rank.timerF }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import mixinRanking from "../mixin/ranking";

    export default {
        name: "Classement",
        mixins: [mixinRanking],
        beforeMount() {
            this.getStorage();
            this.pendu = this.storageRanking.pendu[this.mode];
        },
        data (){
          return {
              mode:'hard',
              pendu:[]
          }
        },
        methods: {
            choiceMode(mode){
                if(this.mode !== mode){
                    this.mode = mode;
                    this.pendu = this.storageRanking.pendu[this.mode];
                }
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/classement.css";
</style>