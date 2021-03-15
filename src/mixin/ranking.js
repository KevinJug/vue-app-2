import moment from "moment";

export default {
    data() {
        return {
            intervalId: null,
            storageRanking: {
                price: [],
                pendu: {easy: [], hard: []},
                mastermind: []
            },
            timerS: 0,
            timerF: 0,
        }
    },
    filters: {
        hours(timer) {
            let hoursArray = timer.split(':');
            let h = parseInt(hoursArray[0]);
            let m = parseInt(hoursArray[1]);
            let s = parseInt(hoursArray[2]);
            let hDisplay = h > 0 ? h + (h === 1 ? " heure, " : " heures, ") : "";
            let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
            let sDisplay = s > 0 ? s + (s === 1 ? " seconde" : " secondes") : "";
            return hDisplay + mDisplay + sDisplay;
        }
    },
    methods: {
        startTimer() {
            this.timerS = 0;
            this.intervalId = setInterval(() => {
                ++this.timerS;
            }, 1000)
        },
        endTimer() {
            clearInterval(this.intervalId);
            this.secondsToHs();
        },
        secondsToHs() {
            this.timerF = moment().startOf('day').seconds(this.timerS).format("H:mm:ss");
        },
        getStorage() {
            let storage = JSON.parse(localStorage.getItem('ranking'));
            if (storage) {
                this.storageRanking = storage;
            }
        },
        setStorage() {
            localStorage.setItem('ranking', JSON.stringify(this.storageRanking));
        },
        rankingMastermind(ranking) {
            this.getStorage();
            let rankingMastermind = this.storageRanking.mastermind;
            rankingMastermind.push(ranking);
            rankingMastermind.sort(function (a, b) {
                return a.timerS - b.timerS;
            });
            if (rankingMastermind.length > 5) {
                rankingMastermind.pop();
            }
            this.storageRanking.mastermind = rankingMastermind;
            this.setStorage();
        },
        rankingPrice(ranking) {
            this.getStorage();
            let rankingPrice = this.storageRanking.price;
            rankingPrice.push(ranking);
            rankingPrice.sort(function (a, b) {
                return a.timerS - b.timerS;
            });
            if (rankingPrice.length > 5) {
                rankingPrice.pop();
            }
            this.storageRanking.price = rankingPrice;
            this.setStorage();
        },
        rankingPendu(ranking) {
            this.getStorage();
            let rankingPendu = this.storageRanking.pendu[ranking[0]];
            rankingPendu.push(ranking[1]);
            rankingPendu.sort(function (a, b) {
                return a.number - b.number;
            });
            if (rankingPendu.length > 5) {
                rankingPendu.pop();
            }
            this.storageRanking.pendu[ranking[0]] = rankingPendu;
            this.setStorage();
        }
    }
}