import categories from "$/categories.js";

export default {
  game: {
    started: false,
    category: false,
    letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','x','w','y','z'],
    openLetters: [],
    guessed: false,
    cardIndex: 0,
    cardSorting: "alpha"
  },

  categories
};
