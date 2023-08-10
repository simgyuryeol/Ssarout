import createElem from './DOMUtil';
import EventEmitter from './EventEmitter';

function cBtn(text) {
  return createElem('button', {}, text);
}

class SongEditor extends EventEmitter {
  constructor() {
    super();
    this.btnPlay = cBtn('Play');
    this.btnStop = cBtn('Stop');
    this.audio = null;
    this.audioUrl = null;
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

    this.inScore = createElem('textarea', { class: 'inScore' });

    this.element = createElem('div', { class: 'song-editor' }, [
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

    const musicStop = () => {
      this.audio.pause();
      this.audio = null;
    };
    this.btnPlay.addEventListener('click', (e) => {
      if (this.audio != null) this.audio.pause();
      this.audio = new Audio(this.audioUrl);
      this.audio.load();
      this.audio.play();
      this._clickHandler('play');
    });
    this.btnStop.addEventListener('click', (e) => {
      musicStop();
      this._clickHandler('stop');
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
