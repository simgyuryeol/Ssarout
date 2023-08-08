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
