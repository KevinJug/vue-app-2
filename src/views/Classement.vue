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
            <div v-if="this.storageRanking.pendu.length === 0">
                Pas de classement pour l'instant.
            </div>
            <div v-else>
                <div v-for="(rank, index) in this.storageRanking.pendu" class="rankingPenduState">
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
        }
    }
</script>

<style scoped>
    @import "../assets/css/classement.css";
</style>