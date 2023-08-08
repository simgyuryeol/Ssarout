import { ScoreDrawer } from "./ScoreDrawer";
import ToneDetector from "./ToneDetector";
import ToneGenerator from "./ToneGenerator";
import { Note, parseScore } from "./ScoreParser";
import Sharer from "./Sharer";

import SongEditor from "./SongEditor";
import createElem from "./DOMUtil";

const UPDATE_INTERVAL = 1000 / 60;

export class Test {
  constructor(appContainer) {
    this.detector = null;
    this.drawer = null;
    // this.player = null;
    this.wrapper = null;
    this.lastTime = 0;
    this.elapsed = 0;
    this.audio = null;
    this.inited = false;
    this.key = 0;
    this.playMusic = true;
    this.sharer = new Sharer();
    this.songEditor = new SongEditor();
    this.blind = null;
    this.loop = this.loop.bind(this);
    this.drawer = new ScoreDrawer();
    this.createElements();
    appContainer.appendChild(this.wrapper);
    requestAnimationFrame(this.loop);
    this.score = [];
    this.soundFile = null;
  }

  createElements() {
    this.blind = createElem("div", { class: "blind" }, "Click to start app");
    const wrapper = createElem("div", {});

    const canvasContainer = createElem("div", {});
    const canvas = this.drawer.renderElement();
    canvasContainer.appendChild(canvas);
    this.drawer.start([]);

    wrapper.appendChild(canvasContainer);

    wrapper.appendChild(this.songEditor.render());
    wrapper.appendChild(this.sharer.render());
    this.wrapper = wrapper;
    this.bindEvents();
    document.body.appendChild(this.blind);
  }

  bindEvents() {
    this.sharer.on("song-select", this.songSelected.bind(this));

    this.songEditor.on("play", async () => {
      if (!this.inited) return;
      this.detector.recording(); // 녹음 시작
      // setTimeout(() => { // 노래 시간에 따라 맞춰야함
      this.playSong(parseScore(this.songEditor.score));
      // }, 9100);
    });
    this.songEditor.on("stop", this.stopSong.bind(this));
    this.songEditor.on("key-up", this.keyUp.bind(this));
    this.songEditor.on("key-down", this.keyDown.bind(this));
    this.songEditor.on("change", (prop, value) => {
      switch (prop) {
        case "melody":
          this.toggleSound(value);
          break;
        case "volume":
          this.setVolume(value);
          break;
      }
    });

    this.blind.addEventListener("click", async () => {
      await this.init();
      this.blind.style.display = "none";
    });
  }

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  songSelected(song) {
    this.songEditor.score = song.score;
  }

  async init() {
    this.audio = new (window.AudioContext || window.webkitAudioContext)();
    this.detector = new ToneDetector(this.audio);
    // this.player = new ToneGenerator(this.audio);

    this.detector.on("note", this.onNote.bind(this));
    await this.detector.init();
    this.inited = true;
    this.drawer.inited();
  }

  playSong(notes) {
    this.drawer.start(notes);
    console.log(notes);
  }

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  stopSong() {
    this.score = this.drawer.scores();

    this.drawer.stop();
    this.drawer.start([]);
    this.detector.recording();
    this.drawer.setStopRecord(false);
  }

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  onNote(note) {
    this.drawer.pushNote(note);
  }

  loop(time) {
    const stopRecord = this.drawer.getStopRecord();

    if (stopRecord) {
      //mr 끝났을때 녹음 완료
      this.stopSong();
    }

    if (this.lastTime === 0) {
      this.lastTime = time;
    }
    const delta = time - this.lastTime;
    this.elapsed += delta;
    this.lastTime = time;

    while (this.elapsed > UPDATE_INTERVAL) {
      this.update(UPDATE_INTERVAL);
      this.elapsed -= UPDATE_INTERVAL;
    }

    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    if (!this.inited) return;

    this.detector.update(delta);
    this.drawer.update(delta);
    if (this.playMusic) {
      const note = this.drawer.getCurrentNote();
      // this.player.playNote(note, this.key);
    }
  }

  render() {
    this.drawer.render();
  }

  // setVolume(v) {
  //   this.player.setVolume(v);
  // }

  toggleSound(force) {
    if (force === undefined) {
      this.playMusic = !this.playMusic;
    } else {
      this.playMusic = force;
    }
    // if (!this.playMusic) {
    //   this.player.playTone(0);
    // }
  }

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  keyUp() {
    this.setKey(this.key + 1);
  }

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  keyDown() {
    this.setKey(this.key - 1);
  }

  setKey(key) {
    this.key = key;
    this.songEditor.key = key;
    this.drawer.octav = this.key;
  }
}

export default Test;
