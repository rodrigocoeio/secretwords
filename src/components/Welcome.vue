<template>
  <main>
    <div class="WelcomeWrapper">
      <img src="/images/secretwords-favicon.png" class="Logo" width="200">
      <h1>Secret Words, Phrases</h1>

      <select v-model="cardSorting">
        <option value="alpha">Alphabetical Sorting</option>
        <option value="shuffle">Shuffle Cards</option>
      </select>

      <category-select :categories="categories"></category-select>

      <button class="StartGame" @click="startGame" :disabled="loadingWords">Start Game</button>
    </div>
  </main>
</template>
  
<script>
import store from "$/store.js";
import CategorySelect from "./CategorySelect.vue";

export default {
  async beforeMount() {
    await store.loadCategories();
  },

  data() {
    return {
      cardSorting: store.game.cardSorting
    }
  },

  computed: {
    categories() {
      return store.categories;
    },
    loadingWords() {
      return store.game.loadingWords;
    }
  },

  watch: {
    cardSorting(value) {
      store.game.cardSorting = value;
    }
  },

  methods: {
    startGame() {
      return store.startGame();
    }
  },

  components: {
    CategorySelect
  }
}
</script>
  
<style scoped>
main {
  height: 100%;
  padding: 15px;
  display: flex;
  place-content: center;
  justify-items: center;
  align-items: center;
}

.Logo {
  margin-bottom: 30px;
}

h1 {
  text-shadow: gray 3px 1px 1px;
  -webkit-text-stroke: 1px black;
  margin-bottom: 30px;
  font-size: 48px;
  font-weight: bold;
  font-family: Georgia, 'Times New Roman', Times, serif;
  color: white;
}

select {
  display: block;
  padding: 20px;
  border-radius: 15px;
  font-size: 24px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  margin: 0 auto;
  margin-bottom: 15px;
  cursor: pointer;
  border: 3px solid black;
}

select:hover {
  background-color: chartreuse;
  text-shadow: white 3px 0 10px;
  box-shadow: 3px 3px gray;
}

.CardSortingSelect {
  float: left;
  max-width: 200px;
  margin-right: 15px;
}

.DifficultySelect {
  float: right;
  max-width: 200px;
}

.StartGame {
  display: block;
  padding: 20px;
  border: 3px solid black;
  border-radius: 15px;
  font-size: 24px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
}

.StartGame:hover {
  background-color: chartreuse;
  text-shadow: gray 3px 0 10px;
  box-shadow: 3px 3px gray;
}

.PleaseSelect {
  border: 3px solid red !important;
  box-sizing: border-box;
}
</style>