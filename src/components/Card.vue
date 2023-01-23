<template>
    <div class="CardBox">
        <button class="LetterButton btn btn-success" @click="openLetter(letter)"
            v-for="letter, index in letters">
            {{ letter }}
        </button>

        <hr>

        <div class="Word" v-for="word in cardWords">
            <span class="Letter" v-for="letter in word">
                {{  letter }}
            </span>
            <div style="clear:both;"></div>
        </div>

    </div>
</template>

<script>
import store from "$/store.js";

export default {
    data() {
        return {
            letters: ['A','B','C','D','E','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','W','Y','Z'],
            openLetters: []
        }
    },

    computed: {
        card() {
            return store.card;
        },

        cardWords() {
            const words = this.card.name.split(" ");

            words.forEach((word,index) => {
                const letters = word.split("");

                words[index] = letters;
            });

            return words;
        },

        cardImage() {
            return "/cards/" + store.currentCategory.name + "/" + this.card.image;
        },

        opened() {
            return store.game.opened;
        }
    },

    methods: {
        openLetter(letter) {
            playAudio("/audios/letters/" + letter.toLowerCase() +".mp3");
        },

        openCard() {
            return store.openCard();
        },

        playCard() {
            return store.playCard();
        }
    }
}
</script>

<style scoped>
.Letter {
    padding:5px;
    font-size:36px;
    margin: 15px;
    border: 1px solid gray;
    text-align: center;
    width: 50px;
    display: inline-block;
}

.Word {
    clear: both;
    width: auto;
    margin: auto 0;
}


.LetterButton {
    margin-right: 5px;
}
</style>