import store from "$/store";

const listenKeyBoardEvents = function (e) {
  if (store.game.started) {
    if(!$('#typeWordInput').is(':focus') && store.game.letters.includes(e.key.toLowerCase()))
    {
      store.openLetter(e.key.toLowerCase());
    }

    // Open Guess Where box on space
    /* if (e.keyCode == 32) {
      store.playNextTip();
    }

    // On Enter
    if (e.keyCode == 13) {
      store.openCard();
    }
    */

    // Previous card on left arrow
    if (e.keyCode == 37) {
      store.previousCard();
    }

    // Next card on right arrow
    if (e.keyCode == 39) {
      store.nextCard();
    }
  }
};

window.addEventListener("keydown", listenKeyBoardEvents);
