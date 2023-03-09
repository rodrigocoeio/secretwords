<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <!-- Navbar -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- Category Name -->
                    <li class="nav-item CategoryName" :title="categoryName">
                        <img src="/images/secretwords-favicon.png" width="36" />
                        {{ categoryName || "Type your words: " }}
                    </li>

                    <li class="nav-item" v-if="!categoryName">
                        <input id="typeWordInput" :type="typeWordInputType" class="TypeWordInput form form-control"
                            placeholder="Type your words here" v-model="typedWord" @keydown.enter="setTypedWord"
                            @keydown.ctrl="lookTypeWord">
                    </li>

                    <!-- Previous Card -->
                    <li class="nav-item" v-if="categoryName">
                        <button id="previousCardButton" class="PreviousCardButton" :disabled="cardIndex == 0"
                            @click="previousCard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg>
                            Previous
                        </button>
                    </li>

                    <li class="CardIndex nav-item" v-if="categoryName">
                        &nbsp;&nbsp;
                        {{ cardsNumber > 0 ? cardIndex + 1 : 0 }} / {{ cardsNumber }}
                    </li>

                    <!-- Next Card -->
                    <li class="nav-item" v-if="categoryName">
                        <button id="nextCardButton" class="btn btn-success" :disabled="((cardIndex + 1) >= cardsNumber)"
                            @click.stop.prevent="nextCard">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                        </button>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <!-- Quit Game -->
                    <li class="nav-item">
                        <button class="QuitGameButton" @click="quitGame">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                class="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            Quit Game
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import store from "$/store";

export default {
    data() {
        return {
            configs: store.configs,
            typedWord: "",
            typeWordInputType: "password"
        }
    },

    computed: {
        game() {
            return store.game;
        },

        categoryName() {
            return store.categoryName;
        },

        configs() {
            return store.configs;
        },

        cardIndex() {
            return store.game.cardIndex;
        },

        cardsNumber() {
            return store.cardsNumber;
        }
    },

    mounted() {
        if ($("#typeWordInput").is(":visible"))
            $("#typeWordInput").trigger("focus");
    },

    methods: {
        setTypedWord() {
            store.startGame();
            store.game.typedWord = this.typedWord;
            $("#typeWordInput").trigger("blur");
            this.typedWord = "";
        },

        lookTypeWord() {
            this.typeWordInputType = this.typeWordInputType === "text" ? "password" : "text";
        },

        previousCard() {
            $("#previousCardButton").trigger("blur");
            store.previousCard();
        },

        nextCard() {
            $("#nextCardButton").trigger("blur");
            store.nextCard();
        },

        quitGame() {
            store.quitGame();
        }
    },
};
</script>

<style scoped>
nav {
    color: white;
}

nav * {
    display: inline-block;
}

ul {
    list-style: none;
}

button {
    padding: 8px;
    font-size: 24px;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 15px;
}

button:not([disabled]):hover {
    background-color: chartreuse;
    text-shadow: white 3px 0 10px;
    box-shadow: 3px 3px gray;
}

button * {
    vertical-align: middle;
}

.StartGame {
    margin: auto;
    margin-left: calc(50% - 100px);
}

.TypeWordInput {
    padding: 15px;
    font-size: 24px;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 15px;
}

.TypeWordInput:hover {
    background-color: chartreuse;
    text-shadow: white 3px 0 10px;
    box-shadow: 3px 3px gray;
}

.CategoryName {
    font-size: 24px;
    font-weight: bolder;
    padding-right: 15px;
    height: 30px;
}

.CardIndex {
    font-size: 24px;
}

.nav-item {
    margin-left: 10px;
}

.GameSound {
    font-size: 24px;
    margin-top: 6px;
}

.QuitGameButton:not([disabled]):hover {
    background-color: crimson;
}

.PreviousCardButton:not([disabled]):hover {
    background-color: yellow;
}
</style>