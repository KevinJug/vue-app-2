<template>
    <div class="main">
        <div class="search">
            <div class="modes">
                <span @click="choiceMode('easy')" class="mode" :class="mode === 'easy' ? 'actived' : ''">Facile (animaux)</span>
                <span @click="choiceMode('hard')" class="mode" :class="mode === 'hard' ? 'actived' : ''">Difficile</span>
            </div>
            <div v-if="win">
                <p>Bravo vous avez trouver.</p>
                <p>Le mot est {{ word }}.</p>
            </div>
            <div v-else-if="counter < 5">
                <div class="letters">
                    <p v-for="a in alphabet" :key="a" @click="recordLetter(a)" class="letter">{{a}}</p>
                </div>
                <p>{{hideWord}}</p>
            </div>
            <div v-else-if="goodWord > 0">
                <p>Vous avez trouver {{ goodWord}} {{ goodWord > 1 ? 'mots' : 'mot' }}.</p>
                <div class="margin-b15" v-if="stateRecord">
                    <input class="input-rank" v-model="record">
                    <button @click="recordRanking" class="button-rank">Enregistrer dans le classement</button>
                </div>
                <div>
                    <button class="button-new-game" @click="restart(true)">Nouvelle partie</button>
                </div>
            </div>
            <div v-else>
                <p>Vous avez perdu, le mot est : <span class="world-secret">{{word}}</span></p>
                <button class="button-new-game" @click="restart">Nouvelle partie</button>
            </div>
        </div>
        <div class="img-pendu">
            <img v-if="counter !== 0" alt="pendu" :src="getImgUrl(counter)" width="350px" height="470px">
        </div>
    </div>
</template>
<script>
    import mixinRanking from "../mixin/ranking";

    const words = require('../utils/word.json');
    const wordsEasy = require('../utils/wordEasy.json');
    import _ from 'lodash';

    export default {
        name: "Pendu",
        mixins: [mixinRanking],
        data() {
            return {
                word: '',
                wordNoAccent: '',
                hideWord: '',
                regex: /[a-zÀ-ÿ]/gi,
                lastCharacter: '',
                counter: 0,
                record: '',
                goodWord: 0,
                win: false,
                stateRecord: true,
                mode: 'hard',
                alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            }
        },
        beforeMount() {
            this.findWord();
        },
        methods: {
            choiceMode(mode){
                console.log(mode);
                console.log(this.mode);
                if(this.mode !== mode){
                    this.mode = mode;
                    this.restart();
                }
            },
            recordLetter(letter) {
                this.lastCharacter = letter.toLowerCase();
                this.validateCharacter();
            },
            restart(reset) {
                this.goodWord = reset ? 0 : this.goodWord;
                this.findWord();
                this.counter = 0;
                this.stateRecord = true;
            },
            getImgUrl(counter) {
                var images = require.context('../assets/img/', false, /\.png$/);
                return images('./pendu-' + counter + ".png")
            },
            findWord() {
                if (this.mode === "hard") {
                    this.word = this.swapOE(words[Math.floor(Math.random() * 22738)]).toLowerCase();
                } else {
                    this.word = this.swapOE(wordsEasy[Math.floor(Math.random() * 137)]).toLowerCase();
                }
                this.wordNoAccent = this.swapAccent(this.word);
                this.hideWord = this.word.replace(this.regex, '_').replace(/(.{1})/g, '$1 ');
            },
            validateCharacter() {
                let find = false;
                let initSearch = 0;
                if (this.checkCharacter(0) === -1) {
                    ++this.counter;
                }
                do {
                    let indexOfCharacter = this.checkCharacter(initSearch);
                    find = indexOfCharacter >= 0;
                    if (find) {
                        this.hideWord = this.hideWord.substring(0, indexOfCharacter * 2) + this.word.substr(indexOfCharacter, 1) + this.hideWord.substr(indexOfCharacter * 2 + 1);
                        initSearch = indexOfCharacter + 1;
                    }
                } while (find);

                this.checkWin();

            },
            checkCharacter(index) {
                return this.wordNoAccent.indexOf(this.lastCharacter, index);
            },
            swapAccent(word) {
                if (typeof word === 'string') {
                    let str = word;
                    let accent = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ";
                    let noAccent = "aaaaaaaaaaaaooooooooooooeeeeeeeecciiiiiiiiuuuuuuuuynn";
                    let arrayAccent = accent.split('');
                    let arrayNoAccent = noAccent.split('');
                    let arrayCorrection = [];
                    var i = -1;
                    while (arrayAccent[++i]) {
                        arrayCorrection[arrayAccent[i]] = arrayNoAccent[i]
                    }
                    return str.replace(/./g, function ($0) {
                        return (arrayCorrection[$0]) ? arrayCorrection[$0] : $0
                    });
                }
            },
            swapOE(word) {
                let str = word;
                let arrayCorrection = [];
                arrayCorrection['Œ'] = 'OE';
                arrayCorrection['œ'] = 'oe';
                return str.replace(/./g, function ($0) {
                    return (arrayCorrection[$0]) ? arrayCorrection[$0] : $0
                });
            },
            checkWin() {
                if (this.wordNoAccent === this.swapAccent(this.hideWord.replace(/\s/g, ''))) {
                    this.win = true;
                    ++this.goodWord;
                    setTimeout(() => {
                        this.win = false;
                        this.restart();
                    }, 2000)
                }
            },
            recordRanking() {
                if (this.record) {
                    this.rankingPendu([this.mode,{number: this.goodWord, name: this.record}]);
                    this.stateRecord = false;
                }
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/pendu.css";
</style>