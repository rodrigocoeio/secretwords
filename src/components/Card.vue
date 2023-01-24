<template>
    <div class="CardBox">
        <!-- <input type="text" class="TryInput form form-control" placeholder="Make a try!" v-model="tryInput" @keydown.enter="makeTry">

        <br> -->

        <button :class="['LetterButton', 'btn', !this.openLetters.includes(letter) ? 'btn-primary' : 'btn-secondary']" @click="openLetter(letter)"
            :disabled="this.openLetters.includes(letter)"
            v-for="letter, index in letters">
            {{ letter.toUpperCase() }}
        </button>
        
        <hr>

        <div class="Word" v-for="word in cardWords">
            <span class="LetterBox" v-for="letter in word">
                <span class="LetterCover" v-if="!letter.opened">?</span>
                <span class="Letter" v-if="letter.opened">{{  letter.letter }}</span>
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
            tryInput: ""
        }
    },

    computed: {
        guessed() {
            return store.game.guessed;
        },

        letters() {
            return store.game.letters
        },

        openLetters() {
            return store.game.openLetters;
        },

        card() {
            return store.card;
        },

        cardWords() {
            const words = this.card.name.split(" ");
            const openLetters = this.openLetters;

            words.forEach((word,index) => {
                const letters = word.split("");

                letters.forEach((letter,index) => {
                    letters[index] = {
                        letter: letter,
                        opened: (this.openLetters.includes(letter.toLowerCase()) || this.guessed || !this.letters.includes(letter.toLowerCase()))
                    }
                });

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
        makeTry() {
            if(this.tryInput.toLowerCase() === this.card.name.toLowerCase())
            {
                store.game.guessed = true;
            }

            this.tryInput = "";
        },

        openLetter(letter) {
            store.openLetter(letter);
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
.CardBox {
    padding-left: 100px;
    padding-right: 100px;
}
.TryInput {
    max-width: 200px;
    margin: auto;
}

.Word {
    width: auto;
    margin: auto 0;
    float: left;
    margin-left: 20px;
    margin-right: 20px;
}

.LetterBox {
    font-size:36px;
    margin: 5px;
    border: 1px solid gray;
    text-align: center;
    width: 50px;
    display: inline-block;
    min-width: 50px;
    min-height: 57px;
}
.Letter {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    background-color: gainsboro;
    display: inline-block;
    width: 100%;
    height: 100%;
}


.LetterButton {
    margin-right: 5px;
    font-size: 24px;
    font-weight:bold;
    min-width: 40px;
    padding: 0px;
    padding-left: 5px;
    padding-right: 5px;
}
</style>