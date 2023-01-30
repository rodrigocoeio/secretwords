export default {
  startGame() {
    this.game.started = true;
    this.game.openLetters = [];
    this.game.guessed = false;
    this.game.cardIndex = 0;
    this.game.typedWord = "";
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

  playCard() {
    this.stopAudios();

    console.log(this.card.audio);

    if (!this.card.audio || !this.isAllLettersOpened) return false;

    const store = this;
    const audioFile =
      "/cards/" + this.currentCategory.name + "/" + this.card.audio;

    this.game.audio = playAudio(audioFile);
    this.game.audio.onended = function () {
      store.game.audio = false;
    };
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
