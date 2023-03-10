import getWords from "./getWords";
import textToSpeach from "./textToSpeach";

export default {
  startGame() {
    /* if (
      !this.currentCategory ||
      !this.currentCategory.cards ||
      this.currentCategory.cards.length === 0
    ) {
      this.game.pleaseSelectCategory = true;
      return false;
    } */

    this.game.started = true;
    this.game.openLetters = [];
    this.game.guessed = false;
    this.game.cardIndex = 0;
    this.game.typedWord = "";

    if (this.game.category)
      this.game.category.cards = this.shuffleCards(this.game.category.cards);
  },

  quitGame() {
    this.game.started = false;
  },

  async loadCategories() {
    try {
      const categoriesJson = await fetch("/cards/categories.json");
      this.categories = await categoriesJson.json();
    } catch (e) {
      //console.error('Failed loading categories.json!');
    }
  },

  selectCategory(category) {
    if (category && category.cards) {
      category.cards = this.shuffleCards(category.cards);
      this.game.pleaseSelectCategory = false;
      this.game.category = category;
    }
  },

  shuffleCards(cards) {
    switch (this.game.cardSorting) {
      case "alpha":
        cards = sortByKey(cards, "name", "asc");
        break;

      case "shuffle":
        cards = shuffleArray(cards);
        break;
    }

    return cards;
  },

  async getRandomWordsCategory() {
    this.game.loadingWords = true;
    const words = await getWords();
    this.game.loadingWords = false;

    const randomCategory = {
      name: "Random Words",
      cards: words.map((word) => ({
        type: "card",
        name: word,
        category: "Random Words",
      })),
    };

    return randomCategory;
  },

  nextCard() {
    if (this.game.cardIndex + 1 < this.cardsNumber) {
      console.log("Next Card");

      this.stopAudios();
      this.game.cardIndex++;
      this.game.openLetters = [];
      this.game.guessed = false;
    }
  },

  previousCard() {
    if (this.game.cardIndex > 0) {
      console.log("Previous Card");

      this.stopAudios();
      this.game.cardIndex--;
      this.game.openLetters = [];
      this.game.guessed = false;
    }
  },

  openCard() {
    this.game.opened = true;

    this.playCard();
  },

  openLetter(letter) {
    let foundLetter = this.findLetter(letter);

    if (!this.game.openLetters.includes(letter.toLowerCase())) {
      this.game.openLetters.push(letter.toLowerCase());
    }

    const letterAudio = this.playLetterAudio(letter, foundLetter);
    const store = this;

    if (this.isAllLettersOpened && foundLetter)
      letterAudio.onended = () => {
        store.playWinningAudio();
      };
  },

  findLetter(letter) {
    let foundLetter = false;

    this.cardWords.forEach((word) => {
      word.forEach((wordLetter) => {
        if (wordLetter.letter.toLowerCase() === letter.toLowerCase()) {
          foundLetter = true;
        }
      });
    });

    return foundLetter;
  },

  playLetterAudio(letter, foundLetter) {
    this.stopAudios();

    const audio = foundLetter
      ? playAudio("/audios/letters/" + letter.toLowerCase() + ".mp3")
      : playAudio("/audios/wrong.mpeg");

    return audio;
  },

  playWinningAudio() {
    this.stopAudios();

    const rightNumber = Math.floor(Math.random() * 2);
    const audio = playAudio("/audios/right" + rightNumber + ".mp3");

    this.game.winningAudio = audio;
    audio.onended = function () {
      store.game.winningAudio = false;
    };

    return audio;
  },

  async playCard() {
    this.stopAudios();

    if (!this.isAllLettersOpened) return false;

    const store = this;
    const audioFile = this.card.audio
      ? "/cards/" + this.currentCategory.name + "/" + this.card.audio
      : await this.textToSpeach(this.card.name);

    this.game.audio = playAudio(audioFile);
    this.game.audio.onended = function () {
      store.game.audio = false;
    };
  },

  async textToSpeach(word) {
    if (!this.game.textToSpeach[word])
      this.game.textToSpeach[word] = await textToSpeach(this.card.name);

    return this.game.textToSpeach[word];
  },

  stopAudios() {
    if (this.game.audio) {
      this.game.audio.pause();
      this.game.audio = false;
    }
    if (this.game.winningAudio) {
      this.game.winningAudio.pause();
      this.game.winningAudio = false;
    }
  },
};
