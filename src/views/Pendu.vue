<template>
    <div>
        <div v-if="counter < 5">
            <input v-model="newChar" maxlength="1">
            <p>{{hideWord}}</p>
        </div>
        <div v-else>
            <p>Vous avez perdu, le mot état : {{word}}</p>
            <button @click="restart">Recommencez</button>
        </div>
        <img v-if="counter !== 0" alt="pendu" :src="getImgUrl(counter)" width="300px" height="500px">
    </div>
</template>
<script>
    const words = require('../utils/word.json');
    import _ from 'lodash';

    export default {
        name: "Pendu",
        data() {
            return {
                word: '',
                wordNoAccent: '',
                hideWord: '',
                regex: /[a-zÀ-ÿ]/gi,
                lastCharacter: '',
                counter: 0
            }
        },
        beforeMount() {
            this.findWord();
        },
        computed: {
            newChar: {
                get: function () {
                    return '';
                },
                set: _.debounce(function (newValue) {
                    this.lastCharacter = newValue;
                    this.validateCharacter();
                }, 500)
            }
        },
        methods: {
            restart() {
                this.findWord();
                this.counter= 0;
            },
            getImgUrl(counter) {
            // ../assets/img/pendu-5.png
                var images = require.context('../assets/img/', false, /\.png$/);
                return images('./pendu-' + counter + ".png")
            },
            findWord() {
                this.word = this.swapOE(words[Math.floor(Math.random() * 22738)]);
                this.wordNoAccent = this.swapAccent(this.word);
                this.hideWord = this.word.replace(this.regex, '_').replace(/(.{1})/g, '$1 ');
            },
            validateCharacter() {
                let find = false;
                let initSearch = 0;
                if(this.checkCharacter(0) === -1){
                    ++this.counter;
                }
                do {
                    let indexOfCharacter = this.checkCharacter(initSearch);
                    find = indexOfCharacter >= 0;
                    if (find) {
                        this.hideWord = this.hideWord.substring(0,indexOfCharacter*2) + this.word.substr(indexOfCharacter,1) + this.hideWord.substr(indexOfCharacter*2+1);
                        initSearch = indexOfCharacter + 1;
                    }
                } while (find);

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
            }
        }
    }
</script>

<style scoped>

</style>