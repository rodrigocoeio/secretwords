<template>
    <div class="CardBox">
        <!-- <input type="text" class="TryInput form form-control" placeholder="Make a try!" v-model="tryInput" @keydown.enter="makeTry">

        <br> -->

        <button :class="['LetterButton', this.openLetters.includes(letter) || isAllLettersOpened ? 'opened' : 'notOpened']"
            @click="openLetter(letter)" :disabled="this.openLetters.includes(letter) || isAllLettersOpened"
            v-for="letter, index in letters" v-if="card.name">
            {{ letter.toUpperCase() }}
        </button>

        <hr>

        <div class="Word" v-for="word in cardWords" @click="playCard">
            <span class="LetterBox" v-for="letter in word">
                <span class="LetterCover" v-if="!letter.opened">?</span>
                <span :class="['Letter', isAllLettersOpened ? 'Opened' : '']" v-if="letter.opened">{{ letter.letter
                }}</span>
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
        isAllLettersOpened() {
            return store.isAllLettersOpened;
        },

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
            return store.cardWords;
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
            if (this.tryInput.toLowerCase() === this.card.name.toLowerCase()) {
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
            console.log("play card");
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
    margin-bottom: 20px;
}

.LetterBox {
    font-size: 48px;
    font-weight: bold;
    margin: 5px;
    border: 2px dashed gainsboro;
    color: gainsboro;
    text-align: center;
    display: inline-block;
    min-width: 77px;
    min-height: 85px;
    box-sizing: border-box;
    border-radius: 15px;
    overflow: hidden;
}

.Letter {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    background-color: gainsboro;
    display: block;
    width: 100%;
    height: 81px;
    color: black;
}

.Letter.Opened {
    cursor: pointer;
    background-color: greenyellow;
}


.LetterButton {
    margin-right: 5px;
    font-size: 24px;
    font-weight: bold;
    min-width: 40px;
    padding: 0px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 30px;
}

.LetterButton.notOpened {
    text-shadow: white 3px 0 0px;
}

.LetterButton:not([disabled]):hover {
    background-color: chartreuse;
    box-shadow: 2px 2px gray;
}
</style>