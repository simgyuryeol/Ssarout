import Api from "../Api/Api";
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  emit(eventName, ...args) {
    const listeners = this.events[eventName];
    if (listeners) {
      listeners.forEach((listener) => {
        listener(...args);
      });
    }
  }
}

function noteFromPitch(frequency) {
  var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
  // ... (implementation of noteFromPitch function goes here)
}

class ToneDetector extends EventEmitter {
  constructor(ctx) {
    super();
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.ctx.createAnalyser();
    this.buf = new Float32Array(2048);
    this.pitch = -1;
    this.note = 0;
    this.octav = 0;
    this.inited = false;
    this.audioArray = [];
    this.isRecording = false;
    this.sound = null;
    this.Url = ""
    this.data = Object()
  }

  async init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.stream = await this.getUserMedia();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 2048;
      const source = this.ctx.createMediaStreamSource(this.stream);
      source.connect(this.analyser);
      this.inited = true;
      this.emit("inited");
    } catch (error) {
      console.error("Error initializing ToneDetector:", error);
    }
  }

  recording(data) {
    this.data = data
    console.log(this.data)
    if (!this.isRecording) {
      this.mediaRecorder = new MediaRecorder(this.stream);
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioArray.push(event.data); // 오디오 데이터가 취득될 때마다 배열에 담아둔다.
      };
      
      // 이벤트핸들러: 녹음 종료 처리 & 재생하기
      this.mediaRecorder.onstop = async (event) => {
        // 녹음이 종료되면, 배열에 담긴 오디오 데이터(Blob)들을 합친다: 코덱도 설정해준다.
        const blob = new Blob(this.audioArray, { type: "audio/wav" });
        this.audioArray.splice(0); // 기존 오디오 데이터들은 모두 비워 초기화한다.

        // Blob 데이터에 접근할 수 있는 주소를 생성한다.
        const blobURL = window.URL.createObjectURL(blob);
        this.sound = new File([blob], "soundBlob", {
          lastModified: new Date().getTime(),
          type: "audio",
        });
        // console.log(blobURL);
        // console.log("sound : ", this.sound);
        // 여기에 로그인 중인지 아닌지 확인하는 조건문 필요
        this.Url = blobURL
        let finalScore = Math.ceil((this.data.PitchScore+this.data.beatScore)/2)
        let songId = this.data.songId
        if(localStorage.getItem('token')){
        try {
          //결과, 녹음파일 서버에 저장
          const formData = new FormData();
          console.log(finalScore)
          formData.append("songId", songId);
          formData.append("accuracy", finalScore);
          formData.append("recordFile", this.sound);
          
          //서버에 녹음 파일 전송 할려면 주석 지워주세요
          // await Api.post("/api/v1/result", formData, {
          //   headers: { "Content-Type": "multipart/form-data" },
          // }).then((response) => {
          //   console.log(response);
          // });
        } catch (error) {
          alert.error(error);
        }
      }};

      this.mediaRecorder.start();
      this.isRecording = true;
    } else {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }

  getSound() {
    return this.sound;
  }
  getMediaRecorder() {
    return this.mediaRecorder;
  }
  getAudioArray() {
    return this.audioArray;
  }
  start() {
    if (!this.inited) {
      if (!this.analyser) {
        console.error("Analyser not created.");
        return;
      }
      if (!this.stream) {
        console.error("MediaStream not available.");
        return;
      }

      const source = this.ctx.createMediaStreamSource(this.stream);
      this.analyser.connect(this.ctx.destination);
      source.connect(this.analyser);
      this.inited = true;
    }
  }

  async getUserMedia() {
    const constraints = { audio: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      return stream;
    } catch (error) {
      console.error("Error getting user media:", error);
      throw error;
    }
  }

  update(delta) {
    if (!this.inited) return;

    this.analyser.getFloatTimeDomainData(this.buf);
    //   console.log(this.buf);

    const ac = this.correlate(this.buf, this.ctx.sampleRate);

    this.pitch = ac;
    if (ac === -1) {
      this.note = -1;
    } else {
      this.note = noteFromPitch(ac);
      this.octav = Math.floor(this.note / 12) - 1;
    }
    //   console.log('Microphone Input Data:', this.buf.slice(0, 10));
    //   console.log(this.note)
    this.emit("note", this.note);
  }

  correlate(buffer, sampleRate) {
    if (this.isSilentBuffer(buffer)) return -1;

    const threshold = 0.2;
    const buf = this.trimBuffer(buffer, threshold);
    const size = buf.length;

    const c = new Array(size).fill(0);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size - i; j++) {
        c[i] = c[i] + buf[j] * buf[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1,
      maxpos = -1;

    for (let i = d; i < size; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    let T0 = maxpos;
    const x1 = c[T0 - 1],
      x2 = c[T0],
      x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  }

  isSilentBuffer(buf) {
    const size = buf.length;
    let soundLevel = 0;

    for (let i = 0; i < size; i++) {
      soundLevel += buf[i] * buf[i];
    }
    soundLevel = Math.sqrt(soundLevel / size);

    return soundLevel < 0.01;
  }

  trimBuffer(buf, threshold = 0.2) {
    const size = buf.length;
    let r1 = 0,
      r2 = size - 1,
      thres = 0.2;
    for (let i = 0; i < size / 2; i++) {
      if (Math.abs(buf[i]) < thres) {
        r1 = i;
        break;
      }
    }
    for (let i = 1; i < size / 2; i++) {
      if (Math.abs(buf[size - i]) < thres) {
        r2 = size - i;
        break;
      }
    }
    return buf.slice(r1, r2);
  }
}

export default ToneDetector;
