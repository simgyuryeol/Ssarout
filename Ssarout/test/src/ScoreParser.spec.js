const { Note, parseScore } = require('./ScoreParser');

const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

describe('ScoreParser', () => {
    let _notestart = 0;

    function getNote(ch) {
        return noteStrings.indexOf(ch.toUpperCase());
    }
    function makeNote(data) {
        const note = {
            note: data.note || 0,
            length: data.length || 0,
            octav: data.octav || 4,
            start: _notestart
        };
        if (data.lylic) {
            note.lylic = data.lylic;
        }
        _notestart += data.length || 0;
        return note;
    }

    function resetNote() {
        _notestart = 0;
    }

    beforeEach(() => {
        resetNote();
    });

    it('empty string returns empty array', () => {
        const input = '';

        const result = parseScore(input);

        expect(result).toEqual([]);
    });

    it('check default values', () => {
        const input = 'a';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 9, length: 500, octav: 4, start: 0 }
        ]);
    });

    it('change tempo', () => {
        const input = 't60 a';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 9, length: 1000, octav: 4, start: 0 }
        ]);
    });

    it('change octav', () => {
        const input = 'o3 a o4 a o0 a >a <a';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 9, length: 500, octav: 3, start: 0 },
            { note: 9, length: 500, octav: 4, start: 500 },
            { note: 9, length: 500, octav: 0, start: 1000 },
            { note: 9, length: 500, octav: 1, start: 1500 },
            { note: 9, length: 500, octav: 0, start: 2000 },
        ]);
    });

    it('change length', () => {
        const input = 'l8 a l4 a l16 a';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 9, length: 250, octav: 4, start: 0 },
            { note: 9, length: 500, octav: 4, start: 250 },
            { note: 9, length: 125, octav: 4, start: 750 },
        ]);
    });

    it('dots', () => {
        const input = 'a. a.. a... a8. a16.';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 9, length: 500 + 250, octav: 4, start: 0 },
            { note: 9, length: 500 + 250 + 125, octav: 4, start: 750 },
            { note: 9, length: 500 + 250 + 125 + 62.5, octav: 4, start: 750 + 875 },
            { note: 9, length: 250 + 125, octav: 4, start: 750 + 875 + 937.5 },
            { note: 9, length: 125 + 62.5, octav: 4, start: 750 + 875 + 937.5 + 375 },
        ])
    });

    it('plus', () => {
        const input = 'a+ a++ a+++';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 10, length: 500, octav: 4, start: 0 },
            { note: 11, length: 500, octav: 4, start: 500 },
            { note: 0, length: 500, octav: 5, start: 1000 },
        ])
    });

    it('minus', () => {
        const input = 'd- d-- d---';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 1, length: 500, octav: 4, start: 0 },
            { note: 0, length: 500, octav: 4, start: 500 },
            { note: 11, length: 500, octav: 3, start: 1000 },
        ]);
    });

    it('number length', () => {
        const input = 'c1 c2 c3 c4 c8 c16 c32 c64';

        const result = parseScore(input);

        expect(result).toEqual([
            makeNote({ length: 2000 }),
            makeNote({ length: 1000 }),
            makeNote({ length: 2000 / 3 }),
            makeNote({ length: 500 }),
            makeNote({ length: 250 }),
            makeNote({ length: 125 }),
            makeNote({ length: 62.5 }),
            makeNote({ length: 31.25 }),
        ]);
    });

    it('ignore illegal characters', () => {
        const input = 'hi? c안녕하세요';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 0, length: 500, octav: 4, start: 0 }
        ]);
    });

    it('legato makes two same note to one', () => {
        const input = 'c&c8';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 0, length: 750, octav: 4, start: 0 }
        ]);
    });

    it('legato does not make two different note to one', () => {
        const input = 'c&d8';

        const result = parseScore(input);

        expect(result).toEqual([
            { note: 0, length: 500, octav: 4, start: 0 },
            { note: 2, length: 250, octav: 4, start: 500 },
        ]);
    });

    it('lylic string', () => {
        const input = 'abc&cd[가나다라]';

        const result = parseScore(input);

        expect(result).toEqual([
            makeNote({ note: getNote('a'), lylic: '가', length: 500 }),
            makeNote({ note: getNote('b'), lylic: '나', length: 500 }),
            makeNote({ note: getNote('c'), lylic: '다', length: 1000 }),
            makeNote({ note: getNote('d'), lylic: '라', length: 500 }),
        ]);
    });

    it('cut off lylics longer than notes', () => {
        const input = 'abc&cd[가나다라마바사]';

        const result = parseScore(input);

        expect(result).toEqual([
            makeNote({ note: getNote('a'), lylic: '가', length: 500 }),
            makeNote({ note: getNote('b'), lylic: '나', length: 500 }),
            makeNote({ note: getNote('c'), lylic: '다', length: 1000 }),
            makeNote({ note: getNote('d'), lylic: '라', length: 500 }),
        ]);

    });

    it('only correct notes takes the lylics', () => {
        const input = 'abc&cd[가나]';

        const result = parseScore(input);

        expect(result).toEqual([
            makeNote({ note: getNote('a'), length: 500 }),
            makeNote({ note: getNote('b'), length: 500 }),
            makeNote({ note: getNote('c'), lylic: '가', length: 1000 }),
            makeNote({ note: getNote('d'), lylic: '나', length: 500 }),
        ]);

    });

    it('skip slient note for lylics string', () => {
        const input = '>c4<ef&f4rf[이대로널]';
        const result = parseScore(input);

        expect(result).toEqual([
            { note: 0, octav: 5, length: 500, start: 0, lylic: '이' },
            { note: 4, octav: 4, length: 500, start: 500, lylic: '대' },
            { note: 5, octav: 4, length: 1000, start: 1000, lylic: '로' },
            { note: -1, octav: 4, length: 500, start: 2000 },
            { note: 5, octav: 4, length: 500, start: 2500, lylic: '널' }
        ]);

        console.log(result);
    });
});
