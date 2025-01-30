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
    root: 0, // Root note, always 0 semitones
    minorSecond: 1, // 1 semitone
    majorSecond: 2, // 2 semitones
    minorThird: 3, // 3 semitones
    majorThird: 4, // 4 semitones
    fourth: 5, // Perfect fourth, 5 semitones
    tritone: 6, // Augmented fourth / diminished fifth, 6 semitones
    fifth: 7, // Perfect fifth, 7 semitones
    augmentedFifth: 8, // Augmented fifth, 8 semitones
    minorSixth: 8, // Minor sixth (enharmonic equivalent of augmented fifth)
    majorSixth: 9, // Major sixth, 9 semitones
    diminishedSeventh: 9, // Diminished seventh (enharmonic equivalent of major sixth)
    minorSeventh: 10, // Minor seventh, 10 semitones
    majorSeventh: 11, // Major seventh, 11 semitones
    octave: 12, // Octave, 12 semitones
    flatNinth: 13, // Flat ninth, 13 semitones
    ninth: 14, // Ninth (octave + major second), 14 semitones
    sharpNinth: 15, // Sharp ninth, 15 semitones
    eleventh: 17, // Eleventh (octave + perfect fourth), 17 semitones
    sharpEleventh: 18, // Sharp eleventh, 18 semitones
    flatThirteenth: 20, // Flat thirteenth, 20 semitones
    thirteenth: 21, // Thirteenth (octave + major sixth), 21 semitones
  };

  private readonly chordDefinitions: Record<string, ChordType> = {
    // Basic triads
    major: {
      intervals: [0, this.intervals.majorThird, this.intervals.fifth],
      name: "major",
    },
    minor: {
      intervals: [0, this.intervals.minorThird, this.intervals.fifth],
      name: "minor",
    },
    diminished: {
      intervals: [0, this.intervals.minorThird, this.intervals.tritone],
      name: "diminished",
    },
    augmented: {
      intervals: [0, this.intervals.majorThird, this.intervals.augmentedFifth],
      name: "augmented",
    },

    // Suspended chords
    sus2: {
      intervals: [0, this.intervals.majorSecond, this.intervals.fifth],
      name: "sus2",
    },
    sus4: {
      intervals: [0, this.intervals.fourth, this.intervals.fifth],
      name: "sus4",
    },

    // Seventh chords
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
        this.intervals.diminishedSeventh,
      ],
      name: "diminished 7th",
    },
    "major 7th flat 5": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.tritone,
        this.intervals.majorSeventh,
      ],
      name: "major 7th flat 5",
    },
    "half-diminished 7th": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.tritone,
        this.intervals.minorSeventh,
      ],
      name: "half-diminished 7th",
    },
    "minor major 7th": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.fifth,
        this.intervals.majorSeventh,
      ],
      name: "minor major 7th",
    },

    // Ninth chords
    "major 9th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.majorSeventh,
        this.intervals.ninth,
      ],
      name: "major 9th",
    },
    "minor 9th": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.ninth,
      ],
      name: "minor 9th",
    },
    "dominant 9th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.ninth,
      ],
      name: "dominant 9th",
    },
    "dominant 7th flat 9": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.flatNinth,
      ],
      name: "dominant 7th flat 9",
    },
    "dominant 7th sharp 9": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.sharpNinth,
      ],
      name: "dominant 7th sharp 9",
    },

    // Eleventh chords
    "major 11th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.majorSeventh,
        this.intervals.ninth,
        this.intervals.eleventh,
      ],
      name: "11th",
    },
    "minor 11th": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.ninth,
        this.intervals.eleventh,
      ],
      name: "minor 11th",
    },
    "dominant 11th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.ninth,
        this.intervals.eleventh,
      ],
      name: "dominant 11th",
    },

    // Thirteenth chords
    "major 13th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.majorSeventh,
        this.intervals.ninth,
        this.intervals.eleventh,
        this.intervals.thirteenth,
      ],
      name: "major 13th",
    },
    "minor 13th": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.ninth,
        this.intervals.eleventh,
        this.intervals.thirteenth,
      ],
      name: "minor 13th",
    },
    "dominant 13th": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.ninth,
        this.intervals.eleventh,
        this.intervals.thirteenth,
      ],
      name: "dominant 13th",
    },

    // Altered chords
    "dominant 7th flat 5": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.tritone,
        this.intervals.minorSeventh,
      ],
      name: "dominant 7th flat 5",
    },
    "dominant 7th sharp 5": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.augmentedFifth,
        this.intervals.minorSeventh,
      ],
      name: "dominant 7th sharp 5",
    },
    "7th flat 13": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.flatThirteenth,
      ],
      name: "7th flat 13",
    },
    "7th sharp 11": {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.minorSeventh,
        this.intervals.sharpEleventh,
      ],
      name: "7th sharp 11",
    },

    // Exotic chords
    add4: {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fourth,
        this.intervals.fifth,
      ],
      name: "add4",
    },
    add6: {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.majorSixth,
      ],
      name: "add6",
    },
    add9: {
      intervals: [
        0,
        this.intervals.majorThird,
        this.intervals.fifth,
        this.intervals.ninth,
      ],
      name: "add9",
    },
    "minor add9": {
      intervals: [
        0,
        this.intervals.minorThird,
        this.intervals.fifth,
        this.intervals.ninth,
      ],
      name: "minor add9",
    },
  };

  // private readonly octaves: number;

  // private readonly startingOctave: number;

  private totalKeys: string[];

  constructor(octaves: number, startingOctave: number) {
    // this.octaves = octaves;
    // this.startingOctave = startingOctave;
    this.totalKeys = [];
    for (let i = 0; i < octaves; i++) {
      let keyIds = this.keys.map((key) => this.keyId(key, i + startingOctave));
      this.totalKeys.push(...keyIds);
    }
  }

  getKeys(): readonly string[] {
    return this.keys;
  }

  getIntervals(): Readonly<typeof this.intervals> {
    return this.intervals;
  }

  getChords(): string[] {
    return Object.keys(this.chordDefinitions);
  }

  getTotalKeys(): string[] {
    return this.totalKeys;
  }

  getChordIntervals(chord: string): number[] | undefined {
    const chordIntervals = this.chordDefinitions[chord];
    return chordIntervals.intervals;
  }

  public getNote(key: string, interval: number): Note {
    const index = (this.keys.indexOf(key) + interval) % this.keys.length;
    return { note: this.keys[index], index };
  }

  public keyId(key: string, keyOctave: number): string {
    return `${key}-${keyOctave + 1}`;
  }

  private nextKeyInChord(
    rootKeyId: string,
    interval: number,
    intervalIndex: number, // the index of the current note interval, used when inverting chords
    inversion?: number
  ): string {
    const rootKeyIndex = this.totalKeys.indexOf(rootKeyId);
    const nextkeyIndex = rootKeyIndex + interval;
    if (inversion) {
      if (inversion > intervalIndex) {
        return this.totalKeys[nextkeyIndex + 12];
      }
    }
    return this.totalKeys[nextkeyIndex];
  }

  chord(currentKey: string, chordName: string, inversion?: number): string[] {
    const chordDef = this.chordDefinitions[chordName];
    if (!chordDef) return [];

    const chordNotes = chordDef.intervals.map((interval, index) => {
      return this.nextKeyInChord(currentKey, interval, index, inversion);
    });
    console.log("chordNotes", chordNotes);
    return chordNotes;
  }
}

export default PianoEngine;
