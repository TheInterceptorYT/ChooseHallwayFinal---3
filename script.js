// ---------------- SEQUENCE PUZZLE ---------------- //
const correctSequence = ["cupcake", "pizza", "partyhat", "paperplate"];
let playerSequence = [];
let tableItems = [null, null, null, null, null];

function placeItem(itemId) {
  const tableRow = document.getElementById("tableRow");

  for (let i = 0; i < tableItems.length; i++) {
    if (!tableItems[i]) {
      tableItems[i] = itemId;

      const img = document.createElement("img");
      img.src = `images/${itemId}.png`;
      img.classList.add("contain-image");
      tableRow.children[i].appendChild(img);
      break;
    }
  }

  playerSequence.push(itemId);

  for (let i = 0; i < playerSequence.length; i++) {
    if (playerSequence[i] !== correctSequence[i]) {
      playerSequence = [];
      return;
    }
  }

  if (playerSequence.length === correctSequence.length) {
    moveKeyToNotepad();
    playerSequence = [];
  }
}

function moveKeyToNotepad() {
  const notepad = document.getElementById("notepad");
  if (notepad) {
    const img = document.createElement("img");
    img.src = "images/key1.png";
    img.classList.add("contain-image");
    const parentBox = notepad.parentElement;
    parentBox.innerHTML = "";
    parentBox.appendChild(img);
    notepad.remove();
  }
}

// ---------------- MODALS ---------------- //
function openNotepad() {
  const notepad = document.getElementById("notepad");
  if (!notepad) return;

  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = "images/stickynote.png";
  modal.style.display = "flex";

  setTimeout(() => {
    if (modalImage.src.includes("stickynote.png")) {
      notepad.remove();
    }
  }, 500);
}

function showModal(imageElement) {
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  modalImage.src = imageElement.src;
  modal.style.display = "flex";
}

function hideModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) hideModal();
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") hideModal();
});

// Ensure modal hidden on load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("myModal").style.display = "none";
});

// ---------------- INVENTORY ---------------- //
function toggleBottomRow() {
  document.getElementById("bottomRow").classList.toggle("hidden");
}

// ---------------- ROOM NAVIGATION ---------------- //
function leaveRoom() {
  // Clear Freddy timer and remove images if present
  clearInterval(witheredTimer);
  const freddy = document.getElementById("witheredFreddy");
  if (freddy) freddy.remove();
  const timerDiv = document.getElementById("witheredTimer");
  if (timerDiv) timerDiv.remove();
}

function goUp() {
  leaveRoom();
  window.location.href = "https://89d8dh.csb.app/";
}

function goLeft() {
  leaveRoom();
  window.location.href = "https://796nw7.csb.app/";
}

function goRight() {
  leaveRoom();
  window.location.href = "https://mycgl4.csb.app/";
}

// ------------------ WITHERED FREDDY RANDOM SPAWN ------------------ //
const witheredChance = 0.3; // 30% chance to spawn
const witheredDuration = 10000; // 10 seconds
let witheredTimer;

// ---------------- AUDIO UNLOCK ---------------- //
let audioUnlocked = false;
function unlockAudio() {
  const jumpscareAudio = document.getElementById("jumpscareAudio");
  jumpscareAudio
    .play()
    .then(() => {
      jumpscareAudio.pause();
      jumpscareAudio.currentTime = 0;
    })
    .catch(() => {});
  audioUnlocked = true;
  document.removeEventListener("click", unlockAudio);
}
document.addEventListener("click", unlockAudio);

// ---------------- SPAWN FREDDY ---------------- //
function maybeSpawnWithered() {
  if (Math.random() < witheredChance) {
    spawnWithered();
  }
}

function spawnWithered() {
  // Freddy in middle
  const freddy = document.createElement("img");
  freddy.id = "witheredFreddy";
  freddy.src = "images/witheredfreddy.png";
  freddy.style.position = "fixed";
  freddy.style.top = "70%";
  freddy.style.left = "50%";
  freddy.style.transform = "translate(-50%, -50%)";
  freddy.style.zIndex = "15";
  freddy.style.maxWidth = "10000px";
  freddy.style.maxHeight = "10000px";
  document.body.appendChild(freddy);

  // Timer display
  const timerDiv = document.createElement("div");
  timerDiv.id = "witheredTimer";
  timerDiv.style.position = "fixed";
  timerDiv.style.top = "10px";
  timerDiv.style.left = "10px";
  timerDiv.style.zIndex = "20";
  timerDiv.style.padding = "10px 20px";
  timerDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
  timerDiv.style.color = "#fff";
  timerDiv.style.fontSize = "100px";
  timerDiv.style.fontWeight = "bold";
  timerDiv.innerText = "10";
  document.body.appendChild(timerDiv);

  let timeLeft = 5;
  witheredTimer = setInterval(() => {
    timeLeft--;
    timerDiv.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(witheredTimer);
      triggerFreddyJump();
    }
  }, 1000);
}

// ---------------- TRIGGER JUMPSCARE + GAME OVER ---------------- //
function triggerFreddyJump() {
  const freddy = document.getElementById("witheredFreddy");
  if (freddy) freddy.src = "gifs/witheredfreddyjump.gif";

  const jumpscareOverlay = document.getElementById("jumpscareOverlay");
  const jumpscareAudio = document.getElementById("jumpscareAudio");

  jumpscareOverlay.style.display = "flex";

  if (audioUnlocked) {
    jumpscareAudio.currentTime = 0;
    jumpscareAudio.play();
  }

  setTimeout(() => {
    jumpscareOverlay.style.display = "none";
    document.getElementById("gameOverScreen").style.display = "flex";
  }, 2000);
}

// ---------------- RESTART ---------------- //
document.getElementById("restartBtn").addEventListener("click", () => {
  location.reload();
});

// ---------------- INIT ---------------- //
window.addEventListener("DOMContentLoaded", maybeSpawnWithered);
