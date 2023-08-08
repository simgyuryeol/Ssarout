var noteStrings = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

function getNoteIndex(ch) {
  return noteStrings.indexOf(ch.toUpperCase());
}

function makeNote(data) {
  return {
    note: data.note || 0,
    octav: data.octav || 4,
    length: data.length || 0,
    start: data.start || 0,
    lylic: data.lylic || undefined,
  };
}

function parseScore(txt) {
  let octav = 4;
  let ch;
  let tempo = 120;
  let timeDelta = (60 * 1000) / tempo;
  let defaultBit = 4;
  let defaultLength = timeDelta;
  let i = 0;
  txt = txt.toUpperCase().replace(/\b/g, "");
  let len = txt.length;

  let curTime = 0;

  let tmp = "";

  let lastNote = null;

  const results = [];

  function next() {
    i++;
    ch = txt[i];
  }

  function parseNote() {
    let note = makeNote({
      note: getNoteIndex(ch),
      octav: octav,
      length: defaultLength,
      start: curTime,
    });

    let dots = [1];
    let legato = false;
    next();

    while (i < len) {
      if (["+", "#", "-"].includes(ch)) {
        note.note += ch !== "-" ? 1 : -1;
        if (note.note < 0) {
          note.octav--;
          note.note += 12;
        } else if (note.note > 11) {
          note.octav++;
          note.note -= 12;
        }
        next();
      } else if (/[0-9]/.test(ch)) {
        tmp = "";
        while (/[0-9]/.test(ch)) {
          tmp += ch;
          next();
        }
        if (tmp.length > 0) {
          note.length = (timeDelta * 4) / parseInt(tmp, 10);
        }
      } else if (ch === ".") {
        dots.push(dots[dots.length - 1] / 2);
        next();
      } else if (/['"]/.test(ch)) {
        next();
        tmp = "";
        while (!/['"]/.test(ch)) {
          tmp += ch;
          next();
        }
        note.lylic = tmp;
        tmp = "";
        next();
      } else if (ch === "&") {
        legato = true;
        next();
      } else {
        break;
      }
    }
    let notelen = 0;
    dots.forEach((l) => {
      notelen += l * note.length;
    });
    note.length = notelen;

    if (
      lastNote &&
      lastNote.note === note.note &&
      lastNote.octav === note.octav
    ) {
      lastNote.length += note.length;
      note = lastNote;
    } else {
      results.push(note);
    }
    lastNote = null;

    if (legato) {
      lastNote = note;
    }

    curTime += notelen;
    console.log(note);
  }

  function parseStringLylic() {
    tmp = "";
    next();
    while ("]" !== ch) {
      tmp += ch;
      next();
    }
    const len = tmp.length;
    if (len === 0) return;
    let cnt = 0;
    let start = 0;
    for (let i = results.length - 1; i >= 0; i--) {
      if (results[i].note !== -1) {
        cnt++;
      }
      if (cnt === len) {
        start = i;
        break;
      }
    }
    for (let i = start, cur = 0; cur < len && i < results.length; i++) {
      if (results[i].note === -1) continue;
      results[i].lylic = tmp[cur];
      cur++;
    }
    tmp = "";
  }

  function parseTempo() {
    tmp = "";
    next();
    while (/[0-9]/.test(ch)) {
      tmp += ch;
      i++;
      ch = txt[i];
    }
    tempo = parseInt(tmp, 10);
    timeDelta = (60 * 1000) / tempo;
    defaultLength = (timeDelta * 4) / defaultBit;
    tmp = "";
  }

  function parseDefaultLength() {
    i++;
    tmp = "";
    while (/[0-9]/.test(txt[i])) {
      tmp += txt[i];
      i++;
    }
    defaultBit = parseInt(tmp, 10);
    defaultLength = (timeDelta * 4) / defaultBit;
  }

  while (i < len) {
    ch = txt[i];
    switch (ch) {
      case "T":
        parseTempo();
        break;
      case "C":
      case "D":
      case "E":
      case "F":
      case "G":
      case "A":
      case "B":
      case "R":
        parseNote();
        break;
      case ">":
        octav = Math.min(8, octav + 1);
        i++;
        break;
      case "<":
        octav = Math.max(0, octav - 1);
        i++;
        break;
      case "O":
        i++;
        ch = txt[i];
        octav = parseInt(ch, 10);
        break;
      case "L":
        parseDefaultLength();
        break;
      case "[":
        parseStringLylic();
        break;
      default:
        i++;
        break;
    }
  }
  return results;
}

module.exports = {
  noteStrings,
  parseScore,
  getNoteIndex,
  makeNote,
};
