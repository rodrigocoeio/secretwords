export default {
  startGame() {
    if (
      !this.currentCategory ||
      !this.currentCategory.cards ||
      this.currentCategory.cards.length === 0
    ) {
      alert("Choose a Category or Subcategory");
      $("#categoryField").trigger("focus");
      return false;
    }

    this.game.started = true;
    this.game.openLetters = [];
    this.game.guessed = false;
    this.game.cardIndex = 0;
  },

  quitGame() {
    this.game.started = false;
    this.game.category = false;
  },

  selectCategory(category) {
    if (category && category.cards) {
      switch (this.game.cardSorting) {
        case "alpha":
          category.cards = sortByKey(category.cards, "name", "asc");
          break;

        case "shuffle":
          category.cards = shuffleArray(category.cards);
          break;
      }

      this.game.category = category;
    }
  },

  nextCard() {
    if (this.game.cardIndex + 1 < this.cardsNumber) {
      console.log("Next Card");

      this.game.cardIndex++;
      this.game.openLetters = [];
      this.game.guessed = false;
    }
  },

  previousCard() {
    if (this.game.cardIndex > 0) {
      console.log("Previous Card");

      this.game.cardIndex--;
      this.game.openLetters = [];
      this.game.guessed = false;
    }
  },

  playTip(tip) {
    if (this.game.audio) {
      this.game.audio.pause();
      this.game.audio = false;
    }

    const store = this;
    const audioFile = "/cards/" + this.currentCategory.name + "/" + tip;

    this.game.audio = playAudio(audioFile);
    this.game.audio.onended = function () {
      store.game.audio = false;
      store.game.tipsPlayed[tip] = true;
    };
  },

  playNextTip() {
    const card = this.card;
    const store = this;

    if (card) {
      card.tips.every((tip) => {
        if (!this.game.tipsPlayed[tip]) {
          store.playTip(tip);
          return false;
        }

        return true;
      });
    }
  },

  openCard() {
    this.game.opened = true;

    this.playCard();
  },

  openLetter(letter) {
    playAudio("/audios/letters/" + letter.toLowerCase() + ".mp3");

    if(!this.game.openLetters.includes(letter.toLowerCase()))
      this.game.openLetters.push(letter.toLowerCase());
  },

  playCard() {
    if (this.game.audio) {
      this.game.audio.pause();
      this.game.audio = false;
    }

    if (!this.card.audio) return false;

    const store = this;
    const audioFile =
      "/cards/" + this.currentCategory.name + "/" + this.card.audio;

    this.game.audio = playAudio(audioFile);
    this.game.audio.onended = function () {
      store.game.audio = false;
    };
  },
};
