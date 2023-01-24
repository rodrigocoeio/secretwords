export default {
  currentCategory() {
    return this.game.category;
  },

  categoryName() {
    return this.currentCategory ? this.currentCategory.name : "";
  },

  cards() {
    return this.currentCategory ? this.currentCategory.cards : [];
  },

  card() {
    const card_index = this.game.cardIndex;

    return this.currentCategory && this.currentCategory.cards[card_index]
      ? this.currentCategory.cards[card_index]
      : { name: this.game.typedWord };
  },

  cardWords() {
    const words = this.card.name.split(" ");
    const letters = this.game.letters;
    const openLetters = this.game.openLetters;
    const guessed = this.game.guessed;

    words.forEach((word, index) => {
      const wordLetters = word.split("");

      wordLetters.forEach((wordLetter, index) => {
        wordLetters[index] = {
          letter: wordLetter,
          opened:
            openLetters.includes(wordLetter.toLowerCase()) || // if letter is already chosed/opened
            !letters.includes(wordLetter.toLowerCase()),      // if the char is not a letter
        };
      });

      words[index] = wordLetters;
    });

    return words;
  },

  cardsNumber() {
    return this.currentCategory ? this.currentCategory.cards.length : 0;
  },
};
