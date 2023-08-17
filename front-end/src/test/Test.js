import { ScoreDrawer } from "./ScoreDrawer";
import ToneDetector from "./ToneDetector";
import ToneGenerator from "./ToneGenerator";
import { Note, parseScore } from "./ScoreParser";
import Sharer from "./Sharer";

import SongEditor from "./SongEditor";
import createElem from "./DOMUtil";
import Api from "../Api/Api";
import { json } from "react-router-dom";

const UPDATE_INTERVAL = 1000 / 60;

export class Test {
  constructor(appContainer, songId, rerecordlyrics, mrFile) {
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
    // this.blind = null;
    this.response = null;
    this.loop = this.loop.bind(this);
    this.drawer = new ScoreDrawer();
    this.songId = songId;
    this.createElements();
    appContainer.appendChild(this.wrapper);
    requestAnimationFrame(this.loop);
    this.score = [];
    this.soundFile = null;
    this.BlobUrl = "";
    this.rerecordlyrics = rerecordlyrics;
    this.lyric = this.response ? this.response.lyric : rerecordlyrics;
    this.local = JSON.parse(localStorage.getItem("data"));
    this.pageOut = false;
    this.startTiming = 0;

    if (this.local !== null) {
      if (this.local.mrUrl) {
        this.songEditor.setAudioURl(this.local.mrUrl);
      }
    }
  }

  async createElements() {
    // this.blind = createElem("div", { class: "blind" }, "Click to start app");
    const wrapper = createElem("div", {});
    const canvasContainer = createElem("div", {});
    const canvas = this.drawer.renderElement();
    canvasContainer.appendChild(canvas);
    this.drawer.start([]);

    // wrapper.appendChild(this.sharer.render());
    this.wrapper = wrapper;
    this.bindEvents();

    if (Object.keys(this.songId).length > 0) {
      try {
        this.response = await Api.get("api/v1/song/info", {
          params: this.songId,
        });
        console.log(this.response, "API", "성공!");
        this.response = this.response.data.data;
        console.log(this.response);
        this.songTitle = this.response.title;
        this.singer = this.response.singer;
        this.startTiming = this.response.startTiming;

        // 여기가 SongLineList 넣는곳
        this.songLineList = this.response.songLineList;

        this.drawer.getLineLyrics(this.songLineList);
        // console.log(this.songTitle, this.singer)
        this.wrapper.appendChild(this.createSong(this.songTitle, this.singer));

        this.songEditor.setAudioURl(this.response.mrFile);
        // console.log(this.response);
      } catch (e) {
        console.error(e);
      }
    }
    const LineLyrics = document.createElement("p");
    LineLyrics.id = "lineLyrics";
    wrapper.appendChild(LineLyrics);
    LineLyrics.textContent = "가사가 여기에 표시됩니다";
    // wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(canvasContainer);

    wrapper.appendChild(this.songEditor.render());
  }

  createSong(songTitle, singer) {
    const creatediv = document.createElement("div");
    const songInfo = songTitle + " - " + singer;
    const newContent = document.createTextNode(songInfo);
    // newContent = document.createTextNode(songTitle);

    creatediv.appendChild(newContent);
    console.log(creatediv);
    creatediv.id = "songTitleNSinger";
    // creatediv.innerHTML(</br>)
    return creatediv;
  }

  bindEvents() {
    this.sharer.on("song-select", this.songSelected.bind(this));

    this.songEditor.on("play", async () => {
      await this.init();
      if (!this.inited) return;
      this.detector.recording(); // 녹음 시작

      // 서버 될때는 이걸로
      console.log(this.songEditor.score.length);
      // if(this.songEditor.score.length > 0){
      console.log(this.response);
      if (this.response) {
        setTimeout(() => {
          // 노래 시간에 따라 맞춰야함
          this.playSong(parseScore(this.response.lyric));
          // 로컬서버든 뭐든 서버 안될때는 이걸로
          // this.playSong(parseScore(this.songEditor.score))
        }, this.startTiming);
      } else {
        const idx = JSON.parse(localStorage.getItem("ly"));

        //  this.songEditor.setStartTime((idx.startTime/1000)+9.1)
        this.playSong(idx.rerecordlyrics);
      }
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

    // this.blind.addEventListener('click', async () => {
    //   await this.init();
    //   this.blind.style.display = 'none';
    // });
  }

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  songSelected(song) {
    this.songEditor.score = song.score;
  }

  async init() {
    this.audio = new (window.AudioContext || window.webkitAudioContext)();
    this.detector = new ToneDetector(this.audio);
    if (this.local) this.detector.setResultLine();
    // this.player = new ToneGenerator(this.audio);

    this.detector.on("note", this.onNote.bind(this));
    await this.detector.init();
    this.inited = true;
    this.drawer.inited();
  }

  playSong(notes) {
    console.log(notes, "d요기요기요기");
    this.drawer.start(notes);
  }
  getBlobUrl(data) {
    this.detector.recording(data);
    setTimeout(() => {
      this.BlobUrl = this.detector.Url;
    }, 10);
  }
  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  stopSong() {
    this.score = this.drawer.scores();
    if (this.score.length === 0) {
      return;
    }
    this.songEditor.mrStop();
    let data = this.drawer.stop();

    // 서버에서 실행 할 때는 주석해제
    console.log(this.songId, "표식표식표식");
    setTimeout(() => {
      this.drawer.setStopRecord(false);
    });
    if (Object.keys(this.songId).length > 0) {
      data.notes = parseScore(this.response.lyric);

      // console.log(parseScore(this.songEditor.score))
      // data.notes = parseScore(this.songEditor.score)
      data.songId = this.songId.songId;
      data.mrUrl = this.response.mrFile;

      this.drawer.start([]);
      // this.detector.recording();
      this.getBlobUrl(data);
      setTimeout(() => {
        if (data.PitchScore === NaN) {
          return;
        }
        data.lyricsTime = this.songLineList;
        data.songTitle = this.songTitle;
        data.singer = this.singer;
        data.startTiming = this.startTiming;
        // if(this.songEditor.score.length > 0){
        if (this.response.lyric.length > 0) {
          window.localStorage.setItem("data", JSON.stringify(data));
          if (!this.pageOut) {
            setTimeout(() => {
              window.location.href = "/analysis";
            }, 100);
          }
        }
      });
    }
  }

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  onNote(note) {
    this.drawer.pushNote(note);
  }

  loop(time) {
    const stopRecord = this.drawer.getStopRecord();
    if (
      !(
        window.location.pathname.includes("/record") ||
        window.location.pathname.includes("/analysis")
      ) &&
      !this.pageOut
    ) {
      this.pageOut = true;
      window.location.reload();
    }
    if (stopRecord) {
      //mr 끝났을때 녹음 완료
      this.stopSong();
    }

    const idx = JSON.parse(localStorage.getItem("ly"));

    if (idx)
      this.songEditor.setStartTime(
        idx.startTime / 1000 + this.local.startTiming / 1000
      );
    // const idx = localStorage.getItem('idx');
    // if(idx){
    //   this.lyric = rerecordlyrics[idx];
    // }

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
