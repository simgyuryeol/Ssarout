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
    this.pageOut = false;


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
    
    // wrapper.appendChild(this.sharer.render());
    this.wrapper = wrapper;
    this.bindEvents();
    
    if (Object.keys(this.songId).length > 0){
      try {
        this.response = await Api.get('api/v1/song/info', { params: this.songId });
        console.log(this.response,'API', "성공!")
        this.response = this.response.data.data;
        console.log(this.response)
        this.songTitle = this.response.title
        this.singer = this.response.singer
        this.songLineList = this.response.songLineList
        this.songLineList = [{"startnode":0,"endnode":20,"starttime":0,"endtime":9000},
        {"startnode":21,"endnode":36,"starttime":9000,"endtime":13800},
        {"startnode":37,"endnode":49,"starttime":13800,"endtime":19200},
        {"startnode":50,"endnode":71,"starttime":19200,"endtime":28200},
        {"startnode":72,"endnode":87,"starttime":28200,"endtime":33000},
        {"startnode":88,"endnode":99,"starttime":33000,"endtime":37200},
        {"startnode":100,"endnode":114,"starttime":37200,"endtime":41400},
        {"startnode":115,"endnode":132,"starttime":41400,"endtime":46800},
        {"startnode":133,"endnode":147,"starttime":46800,"endtime":51000},
        {"startnode":148,"endnode":163,"starttime":51000,"endtime":57600},
        {"startnode":164,"endnode":184,"starttime":57600,"endtime":66600},
        {"startnode":185,"endnode":200,"starttime":66600,"endtime":71400},
        {"startnode":201,"endnode":212,"starttime":71400,"endtime":75600},
        {"startnode":213,"endnode":227,"starttime":75600,"endtime":79800},
        {"startnode":228,"endnode":245,"starttime":79800,"endtime":85200},
        {"startnode":246,"endnode":260,"starttime":85200,"endtime":89400},
        {"startnode":261,"endnode":276,"starttime":89400,"endtime":94200},
        {"startnode":277,"endnode":294,"starttime":94200,"endtime":99000},
        {"startnode":295,"endnode":302,"starttime":99000,"endtime":101400},
        {"startnode":303,"endnode":317,"starttime":101400,"endtime":106200},
        {"startnode":318,"endnode":327,"starttime":106200,"endtime":108900},
        {"startnode":328,"endnode":346,"starttime":108900,"endtime":114150},
        {"startnode":347,"endnode":361,"starttime":114150,"endtime":119100},
        {"startnode":362,"endnode":379,"starttime":119100,"endtime":123900},
        {"startnode":380,"endnode":417,"starttime":123900,"endtime":132900},
        {"startnode":418,"endnode":432,"starttime":132900,"endtime":137550},
        {"startnode":433,"endnode":450,"starttime":137550,"endtime":142350},
        {"startnode":451,"endnode":465,"starttime":142350,"endtime":147150},
        {"startnode":466,"endnode":481,"starttime":147150,"endtime":151500},
        {"startnode":482,"endnode":488,"starttime":151500,"endtime":154200},
        
        ]

        this.drawer.getLineLyrics(this.songLineList)
        // console.log(this.songTitle, this.singer)
        this.wrapper.appendChild(this.createSong(this.songTitle,this.singer))
        
        this.songEditor.setAudioURl(this.response.mrFile);
        // console.log(this.response);
      } catch (e) {
        console.error(e);
      }
      
    }
    const LineLyrics = document.createElement('p')
    LineLyrics.id = "lineLyrics"
    wrapper.appendChild(LineLyrics)
    LineLyrics.textContent = ""
    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(canvasContainer);

    wrapper.appendChild(this.songEditor.render());
  }

  createSong(songTitle,singer){
    const creatediv = document.createElement("div");
    const songInfo = songTitle +" - " + singer
    const newContent = document.createTextNode(songInfo);
    // newContent = document.createTextNode(songTitle);

    creatediv.appendChild(newContent)
    // creatediv.innerHTML(</br>)
    return creatediv
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
         const idx = JSON.parse(localStorage.getItem('ly'));

        //  this.songEditor.setStartTime((idx.startTime/1000)+9.1)
        this.playSong(idx.rerecordlyrics)
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
    if(this.local) this.detector.setResultLine()
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
    this.score = this.drawer.scores();
    if(this.score.length === 0){
      return
    }
    this.songEditor.mrStop();
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
      if(data.PitchScore === NaN){
        return
      }
      console.log(this.BlobUrl)
      data.songTitle = this.songTitle
      data.singer = this.singer
      // if(this.songEditor.score.length > 0){
        if(this.response.lyric.length > 0){
      
        window.localStorage.setItem("data", JSON.stringify(data))
        if(!this.pageOut){
        window.location.href="/analysis"
      }
      }});}
  }
  

  // @autobind 데코레이터를 제거하고 바인딩된 메소드를 정의합니다.
  onNote(note) {
    this.drawer.pushNote(note);
  }

  loop(time) {
    const stopRecord = this.drawer.getStopRecord();
    if(!(window.location.pathname.includes('/record')|| window.location.pathname.includes('/analysis') )&&!this.pageOut){
      this.pageOut = true;
      window.location.reload();
    }
    if (stopRecord) {
      //mr 끝났을때 녹음 완료
      this.stopSong();

    }

    const idx = JSON.parse(localStorage.getItem('ly'));

    if(idx) this.songEditor.setStartTime((idx.startTime/1000)+9.1)
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
