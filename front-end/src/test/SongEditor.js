import createElem from "./DOMUtil";
import EventEmitter from "./EventEmitter";
import "./SongEditor.css";

function cBtn(text) {
  return createElem("button", {}, text);
}

class SongEditor extends EventEmitter {
  constructor() {
    super();
    this.btnPlay = cBtn("PLAY");
    this.btnStop = cBtn("STOP");
    this.audio = null;
    this.audioUrl = null;
    this.startTime = 0;

    this.inScore = createElem("textarea", { class: "inScore" });

    this.element = createElem("div", { class: "song-editor" }, [
      this.btnPlay,
      this.btnStop,
    ]);

    this.btnPlay.addEventListener("click", (e) => {
      if (this.audio != null) this.audio.pause();
      this.audio = new Audio(this.audioUrl);
      this.audio.currentTime = this.startTime;
      this.audio.play();

      this._clickHandler("play");
    });
    this.btnStop.addEventListener("click", (e) => {
      this._clickHandler("stop");
    });
  }

  setStartTime(startTime) {
    this.startTime = startTime;
  }
  mrStop() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  setAudioURl(audioUrl) {
    this.audioUrl = audioUrl;
  }
  _clickHandler(type) {
    this.emit(type);
  }

  render() {
    return this.element;
  }

  get score() {
    return this.inScore.value;
  }

  set score(v) {
    this.inScore.value = v;
  }
}

export default SongEditor;
