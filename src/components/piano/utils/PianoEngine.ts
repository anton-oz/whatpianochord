interface Note {
  note: string;
  index: number;
}

type ChordType = {
  intervals: number[];
  name: string;
};

class PianoEngine {
  private readonly keys = [
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

  private readonly intervals = {
    minorSecond: 1,
    majorSecond: 2,
    minorThird: 3,
    majorThird: 4,
    fourth: 5,
    tritone: 6,
    fifth: 7,
    augmentedFifth: 8,
    majorSixth: 9,
    minorSeventh: 10,
    majorSeventh: 11,
    octave: 12,
  } as const;

  private readonly chordDefinitions: Record<string, ChordType> = {
    major: {
      intervals: [0, this.intervals.majorThird, this.intervals.fifth],
      name: "major",
    },
    minor: {
      intervals: [0, this.intervals.minorThird, this.intervals.fifth],
      name: "minor",
    },
    augmented: {
      intervals: [0, this.intervals.majorThird, this.intervals.augmentedFifth],
      name: "augmented",
    },
    diminished: {
      intervals: [0, this.intervals.minorThird, this.intervals.tritone],
      name: "diminished",
    },
    sus2: {
      intervals: [0, this.intervals.majorSecond, this.intervals.fifth],
      name: "sus2",
    },
    sus4: {
      intervals: [0, this.intervals.fourth, this.intervals.fifth],
      name: "sus4",
    },
    "major 7th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.majorSeventh,
      ],
      name: "major 7th",
    },
    "minor 7th": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
      ],
      name: "minor 7th",
    },
    "dominant 7th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
      ],
      name: "dominant 7th",
    },
    "diminished 7th": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.tritone,
        this.intervals.minorSeventh,
      ],
      name: "diminished 7th",
    },
  };

  getKeys(): readonly string[] {
    return this.keys;
  }

  getIntervals(): Readonly<typeof this.intervals> {
    return this.intervals;
  }

  getChords(): string[] {
    return Object.keys(this.chordDefinitions);
  }

  public getNote(key: string, interval: number): Note {
    const index = (this.keys.indexOf(key) + interval) % this.keys.length;
    return { note: this.keys[index], index };
  }

  public keyId(key: string, keyOctave: number): string {
    return `${key}-${keyOctave + 1}`;
  }

  private calculateOctave(
    currentKey: string,
    compareKey: string,
    octave: number | string,
    inversion?: number,
    index?: number
  ): number {
    const numericOctave =
      typeof octave === "string" ? parseInt(octave) : octave;
    if (inversion === 2 && index === 0) {
      return numericOctave;
    }
    return this.keys.indexOf(currentKey) > this.keys.indexOf(compareKey)
      ? numericOctave
      : numericOctave - 1;
  }

  chord(currentKey: string, chordName: string, inversion?: number): string[] {
    const chordDef = this.chordDefinitions[chordName];
    if (!chordDef) return [];

    const rootNote = currentKey.includes("#")
      ? currentKey.slice(0, 2)
      : currentKey[0];
    const currentKeyOctave = parseInt(currentKey[currentKey.length - 1]);

    const chordNotes = chordDef.intervals.map((interval, index) => {
      const noteInfo = this.getNote(rootNote, interval);
      const noteOctave = this.calculateOctave(
        rootNote,
        noteInfo.note,
        currentKeyOctave,
        inversion,
        index
      );
      return this.keyId(noteInfo.note, noteOctave);
    });
    console.log(" current key: ", currentKey, "\n", "built: ", chordNotes);
    return chordNotes;
  }
}

export default PianoEngine;
