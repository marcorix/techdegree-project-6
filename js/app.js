const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");

const hearts = document.querySelectorAll("img");
const startButton = document.querySelector(".btn__reset");
const overlayDiv = document.querySelector("#overlay");
const ul = document.querySelector("#phrase");

let missed = 0;

let phrases = [
  "better late than never",
  "no pain no gain",
  "she is in the pink",
  "it is raining cats and dogs",
  "all i need is love",
];

//START GAME -- BUTTON FUNCTION//

startButton.addEventListener("click", () => {
  overlayDiv.style.display = "none";
});

//RETURN RANDOM PHRASE FROM ARRAY//

function getRandomPhraseAsArray(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  const randomPhrase = arr[randomNumber];
  const charactersPhrase = randomPhrase.split("");
  return charactersPhrase; // return an array of characters
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

//ADD THE LETTERS OF A STRING TO THE DISPLAY//

function addPhraseToDisplay(arr) {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");

    li.textContent = arr[i];

    if (li.textContent !== " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
    ul.appendChild(li);
  }
}

//CHECK IF A LETTER IS IN THE PHRASE //

function checkLetter(letter) {
  const letters = document.querySelectorAll(".letter");
  let match = null;

  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === letter.textContent) {
      letters[i].classList.add("show");
      match += letter.textContent;
    }
  }
  return match;
}

//LISTEN FOR THE ONSCREEN KEYBOARD TO BE CLICKED//

qwerty.addEventListener("click", (e) => {
  const element = e.target;

  if (element.tagName === "BUTTON") {
    if (element.className !== "chosen") {
      element.classList.add("chosen");
      element.disabled = true;
      const letterFound = checkLetter(element);
      if (letterFound === null) {
        hearts[hearts.length - 1 - missed].src = "images/lostHeart.png";
        missed++;
      }
    }
    checkWin();
  }
});

// CHECK IF THE GAME HAS BEEN WON OR LOST//

function checkWin() {
  const letterClass = document.querySelectorAll(".letter");
  const showClass = document.querySelectorAll(".show");

  if (letterClass.length === showClass.length) {
    overlayDiv.className = "win";
    overlayDiv.style.display = "flex";
    overlayDiv.firstElementChild.innerHTML = "COGRATULATION <br> YOU WON!";
    resetGame();
  } else if (missed > 4) {
    overlayDiv.className = "lose";
    overlayDiv.style.display = "flex";
    overlayDiv.firstElementChild.innerHTML = "I AM SORRY <br> YOU LOST!";
    resetGame();
  }
}

function resetGame() {
  ul.innerHTML = "";
  const newPhraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(newPhraseArray);

  const chosenButtons = document.querySelectorAll(".chosen");

  for (let i = 0; i < chosenButtons.length; i++) {
    const element = chosenButtons[i];
    element.className = "";
    element.disabled = false;
  }

  for (let i = 0; i < hearts.length; i++) {
    const element = hearts[i];
    element.src = "images/liveHeart.png";
  }

  missed = 0;

  startButton.textContent = "Play Again";
}
