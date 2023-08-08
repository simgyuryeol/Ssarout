const noteFreq = [262, 278, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494];

class ToneGenerator {
  constructor(ctx) {
    this._ctx = ctx;
    this._oscillator = this._ctx.createOscillator();
    this._oscillator.type = "sine";
    this._oscillator.frequency.setValueAtTime(0, this._ctx.currentTime);
    this._oscillator.start();

    this._gain = this._ctx.createGain();
    this._oscillator.connect(this._gain);

    this._gain.gain.value = 0.5;
    this._gain.connect(this._ctx.destination);
  }

  setVolume(v) {
    this._gain.gain.value = v;
  }

  getVolume() {
    return this._gain.gain.value;
  }

  playTone(freq) {
    this._oscillator.frequency.setValueAtTime(freq, this._ctx.currentTime);
  }

  playNote(note, modifierKey = 0) {
    const freq = this._noteToFreq(note, modifierKey);
    this.playTone(freq);
  }

  _noteToFreq(note, modifierKey) {
    if (!note) return 0;

    let n = note.note + modifierKey;
    let octav = note.octav;
    while (n < 0) {
      n += 12;
      octav--;
    }

    while (n > 11) {
      n -= 12;
      octav++;
    }
    let result = noteFreq[n];

    if (octav < 4) {
      for (let i = octav; i < 4; i++) {
        result = (result / 2) | 0;
      }
    } else if (octav > 4) {
      for (let i = 4; i < octav; i++) {
        result *= 2;
      }
    }
    return result;
  }
}

export default ToneGenerator;
