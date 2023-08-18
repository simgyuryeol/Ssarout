import createElem from "./DOMUtil";
import EventEmitter from "./EventEmitter";
import mr from "../mr.mp3";
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
    // this.btnSave = cBtn("Save");
    // this.btnUpload = cBtn("Upload");
    // this.btnKeyUp = cBtn("Key Up");
    // this.btnKeyDown = cBtn("Key Down");

    // this.inKey = createElem("input", { type: "number", value: "0" });

    // this.chkMelody = createElem("input", { type: "checkbox", checked: true });
    // const chkLabel = createElem("label", {}, "play melody");
    // chkLabel.appendChild(this.chkMelody);

    // this.inVolume = createElem("input", {
    //   type: "range",
    //   min: 0,
    //   max: 100,
    //   value: 30,
    //   step: 1,
    // });

    this.inScore = createElem("textarea", { class: "inScore" });

    this.element = createElem("div", { class: "song-editor" }, [
      // chkLabel,
      // this.inVolume,
      // this.btnKeyDown,
      // this.btnKeyUp,
      // this.inScore,
      this.btnPlay,
      this.btnStop,
      // this.btnSave,
      // this.btnUpload,
    ]);

    // const musicStop = () => {
    //   if(this.audio){
    //     this.audio.pause();
    //     this.audio = null;
    //   }

    // };
    this.btnPlay.addEventListener("click", (e) => {
      if (this.audio != null) this.audio.pause();
      this.audio = new Audio(this.audioUrl);
      // this.audio = new Audio(mr);
      this.audio.currentTime = this.startTime + 1;
      setTimeout(() => {
        this.audio.play();
      }, 1000);

      this._clickHandler("play");
    });
    this.btnStop.addEventListener("click", (e) => {
      // musicStop();
      this._clickHandler("stop");
    });
    // this.btnKeyDown.addEventListener("click", (e) => {
    //   this._clickHandler("key-down");
    // });
    // this.btnKeyUp.addEventListener("click", (e) => {
    //   this._clickHandler("key-up");
    // });

    // this.chkMelody.addEventListener("input", (e) => {
    //   this.emit("change", "melody", this.chkMelody.checked);
    // });
    // this.inVolume.addEventListener("input", (e) => {
    //   this.emit("change", "volume", parseInt(this.inVolume.value, 10) / 100);
    // });
  }

  // get key() {
  //   return parseInt(this.inKey.value, 10);
  // }

  // set key(v) {
  //   this.inKey.value = v.toString();
  // }

  setStartTime(startTime) {
    this.startTime = startTime;
    console.log("스타트타임 : ", startTime);
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
