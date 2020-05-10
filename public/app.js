
let isAudioContextRegistered = false;
let isPlaying = false;
const soundFiles = ["https://firebasestorage.googleapis.com/v0/b/our-office-is-online.appspot.com/o/199896__qubodup__office-ambience.flac?alt=media&token=7196df8a-eca8-4364-82d1-a24f1e29f1ea"];
const soundFilesFormat = ["flac"]
let sound;
let btn;
let headerText;

const headerTexts = [
  "Your Co-worker is asking for stapler",
  "Did you ship to production on Friday?",
  "HR rejects your raise request with offering an Indian Desert",
  "Have you prepared that presentation?",
  "Remember that guy from marketing who was in Drama Society in College?",
  "Appraisal Season is coming",
  "Time for tea break",
  "Among Unrealistic Deadline and Extremely Unrealistic Deadline - which one do you choose?"
]


const registerAudioContext = () => {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    Howler.ctx = new AudioContext();
    console.log("loading...");
    configurePlayer();
    isAudioContextRegistered = true;
  } catch (e) {
    console.error(e);
    alert("Web Audio API is not supported in this browser");
  }
};

const startPlayingAction = () => {
  isPlaying = true;
  btn.classList.add("paused")
}

const stopPlayingAction = () => {
  isPlaying = false;
  btn.classList.remove("paused");
}

const configurePlayer = () => {
  sound = new Howl({
    src: soundFiles,
    format: soundFilesFormat,
    loop: true,
    html5: true,
  })

  sound.on('play', startPlayingAction);
  sound.on('pause', stopPlayingAction);
}

const togglePlayer = () => {
  if (isPlaying) {
    sound.pause();
  } else {
    sound.play();
  }
}

const registerButton = () => {
  btn = document.getElementById("button");
  btn.addEventListener("click", () => {
    if (!isAudioContextRegistered) {
      registerAudioContext();
    }
    togglePlayer();
  });
};

const headerSwapper = () => {
  if (isPlaying)
    headerText.innerText = headerTexts[Math.floor(Math.random() * headerTexts.length)];
}

const registerHeader = () => {
  headerText = document.getElementById("header-text");
  setInterval(headerSwapper, 4000);
}

document.addEventListener("DOMContentLoaded", function() {
  registerButton();
  registerHeader();
  // configurePlayer();
});
