import { ScoreDrawer } from './ScoreDrawer';
import ToneDetector from './ToneDetector';
import ToneGenerator from './ToneGenerator';
import { Note, parseScore } from './ScoreParser';
import Sharer from './Sharer';

import SongEditor from './SongEditor';
import createElem from './DOMUtil';
import Api from '../Api/Api';
import { json } from 'react-router-dom';

const UPDATE_INTERVAL = 1000 / 60;

export class Test {
  constructor(appContainer,songId,rerecordlyrics,mrFile) {
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
    this.songId = songId
    this.createElements();
    appContainer.appendChild(this.wrapper);
    requestAnimationFrame(this.loop);
    this.score = [];
    this.soundFile = null;
    this.BlobUrl = ""
    this.rerecordlyrics = rerecordlyrics
    this.lyric = (this.response ?this.response.lyric  : rerecordlyrics );
    this.local = JSON.parse(localStorage.getItem('data'))
    
    if (this.local !== null){
      if(this.local.mrUrl){
        console.log(this.local.mrUrl,"this.local")
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

    wrapper.appendChild(canvasContainer);

    wrapper.appendChild(this.songEditor.render());
    wrapper.appendChild(this.sharer.render());
    this.wrapper = wrapper;
    this.bindEvents();
    // document.body.appendChild(this.blind);
    console.log('그때로 돌아가', this.songId)
    if (Object.keys(this.songId).length > 0){
      try {
        this.response = await Api.get('api/v1/song/info', { params: this.songId });
        this.response = this.response.data.data;
  
        this.songEditor.setAudioURl(this.response.mrFile);
        // console.log(this.response);
      } catch (e) {
        console.error(e);
      }

    }
  }

  bindEvents() {
    this.sharer.on('song-select', this.songSelected.bind(this));

    this.songEditor.on('play', async () => {
      await this.init();
      if (!this.inited) return;
      this.detector.recording(); // 녹음 시작
      // setTimeout(() => { // 노래 시간에 따라 맞춰야함
      // 서버 될때는 이걸로
      console.log(this.songEditor.score.length)
      // if(this.songEditor.score.length > 0){
        console.log(this.response)
      if(this.response){
      
        this.playSong(parseScore(this.response.lyric));
        // 로컬서버든 뭐든 서버 안될때는 이걸로 
        // this.playSong(parseScore(this.songEditor.score))
        // }, 9100);
      } else {
        this.playSong(this.rerecordlyrics)
      }
    });
    this.songEditor.on('stop', this.stopSong.bind(this));
    this.songEditor.on('key-up', this.keyUp.bind(this));
    this.songEditor.on('key-down', this.keyDown.bind(this));
    this.songEditor.on('change', (prop, value) => {
      switch (prop) {
        case 'melody':
          this.toggleSound(value);
          break;
        case 'volume':
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
    // this.player = new ToneGenerator(this.audio);

    this.detector.on('note', this.onNote.bind(this));
    await this.detector.init();
    this.inited = true;
    this.drawer.inited();
  }

  playSong(notes) {
    console.log(notes,"d요기요기요기")
    this.drawer.start(notes);
  }
  getBlobUrl(data) {
    this.detector.recording(data);
    setTimeout(() => {
      this.BlobUrl = this.detector.Url;
    },10);
  }
  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  stopSong() {
    console.log('ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄻㄴㅇㄹ')
    this.score = this.drawer.scores();
    
    let data = this.drawer.stop();
    
    // 서버에서 실행 할 때는 주석해제 
    console.log(this.songId,"표식표식표식")
    setTimeout(() => {
      this.drawer.setStopRecord(false);
    });
    if(Object.keys(this.songId).length > 0){
    data.notes = parseScore(this.response.lyric)
    
    // console.log(parseScore(this.songEditor.score))
    // data.notes = parseScore(this.songEditor.score)
    data.songId = this.songId.songId
    data.mrUrl = this.response.mrFile

    // this.drawer.start([]);
    // this.detector.recording();
    this.getBlobUrl(data);
    setTimeout(() => {
      console.log(this.BlobUrl)
      data.BlobUrl = this.BlobUrl
      // if(this.songEditor.score.length > 0){
        if(this.response.lyric.length > 0){
      
        window.localStorage.setItem("data", JSON.stringify(data))
        window.location.href="/analysis"
      }});}
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
