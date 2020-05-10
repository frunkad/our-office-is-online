
let isAudioContextRegistered = false;
let isPlaying = false;
const soundFiles = ["https://firebasestorage.googleapis.com/v0/b/our-office-is-online.appspot.com/o/199896__qubodup__office-ambience.flac?alt=media&token=7196df8a-eca8-4364-82d1-a24f1e29f1ea"];
const soundFilesFormat = ["flac"]
let sound;


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

const configurePlayer = () => {
  sound = new Howl({
    src: soundFiles,
    format: soundFilesFormat,
    loop: true,
    html5: true,
  })
}
const startPlaying = () => {
  sound.play();
  isPlaying = true;
}

const stopPlaying = () => {
  sound.pause();
  isPlaying = false;
}

const togglePlayer = () => {
  if (isPlaying) {
    stopPlaying();
  } else {
    startPlaying();
  }
}

const registerButton = () => {
  const btn = document.getElementById("button");
  btn.addEventListener("click", () => {
    if (!isAudioContextRegistered) {
      registerAudioContext();
    }
    btn.classList.toggle("paused");
    togglePlayer();
  });
};

document.addEventListener("DOMContentLoaded", function() {
  registerButton();
  // configurePlayer();
});
