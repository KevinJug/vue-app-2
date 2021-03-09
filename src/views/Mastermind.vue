<template>
    <div>
        <div v-if="victory < 4 && nbTest < 12">
            <ChoiceMM :colors="colors" @validate="validateColorsCircle" :swap="true"/>
        </div>
        <div v-else-if="victory === 4">
            <p> Bravo, vous avez gagné.</p>
            <button class="button-new-game" @click="newGame" :swap="false">Nouvelle partie</button>
        </div>
        <div v-else>
            <p> Dommage vous avez perdu.</p>
            <button class="button-new-game" @click="newGame" :swap="false">Nouvelle partie</button>
        </div>
        <div v-if="victory === 4 || nbTest === 12" class="center margin-10">
            <WinResultMM :combination="combination"/>
        </div>
        <div>
            <LastResultMM :results="lastResult" :swap="false"/>
        </div>
        <div class="margin-10 center-legend">
            <div class="legend">
                <span class="triangle-code-perfect"></span><span>Couleur bien placée.</span>
            </div>
            <div class="legend">
                <span class="triangle-code-good"></span><span>Couleur existante mais mal placée.</span>
            </div>
        </div>

    </div>
</template>

<script>
    import ChoiceMM from "../components/mastermind/ChoiceMM";
    import LastResultMM from "../components/mastermind/LastResultMM";
    import WinResultMM from "../components/mastermind/WinResultMM";

    export default {
        components: {
            ChoiceMM,
            LastResultMM,
            WinResultMM
        },
        name: "Mastermind",
        data() {
            return {
                colors: ['red', 'blue', 'green', 'purple', 'black', 'white'],
                combination: [],
                lastResult: [],
                nbTest: 0,
                victory: 0

            }
        },
        beforeMount() {
            this.createCombination();
        },
        methods: {
            newGame() {
                this.createCombination();
                this.lastResult = [];
                this.nbTest = 0;
                this.victory = 0;
            },
            createCombination() {
                this.combination = [];
                for (let i = 0; i < 4; ++i) {
                    let value = Math.floor(Math.random() * 6);
                    this.combination.push(this.colors[value]);
                }
                console.log(this.combination);
            },
            validateColorsCircle(data) {
                let arrayVerification = [];
                let combination = [...this.combination];
                let dataColor = data.reduce((acc, obj) => {
                    acc.push(obj.colors);
                    return acc
                },[]);
                for (let i = 0; i < 4; ++i) {
                    if (data[i].colors === this.combination[i]) {
                        arrayVerification.push(1);
                        combination[i] = "";
                        dataColor[i] = "";
                    }
                }
                for (let i = 0; i < 4; ++i) {
                    if(dataColor[i] !== ""){
                        let indexCombination = combination.indexOf(dataColor[i]);
                        if (indexCombination !== -1) {
                            arrayVerification.push(0);
                            combination[indexCombination] = "";
                        }
                    }
                }
                ++this.nbTest;
                this.victory = arrayVerification.filter(r => r === 1).length;
                this.lastResult.unshift(
                    {
                        data: data,
                        result: {
                            perfect: arrayVerification.filter(r => r === 1).length,
                            good: arrayVerification.filter(r => r === 0).length
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/mastmind.css";
</style>