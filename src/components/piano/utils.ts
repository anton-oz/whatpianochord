class Piano_Class {
  keys: string[];
  intervals: { [key: string]: number };
  chords: string[];
  constructor() {
    this.keys = [
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
    this.intervals = {
      minorSecond: 1, // half step
      majorSecond: 2, // whole step
      minorThird: 3,
      majorThird: 4,
      fourth: 5,
      tritone: 6, // also augmented fourth
      fifth: 7,
      augmentedFifth: 8, // also minor sixth
      majorSixth: 9,
      minorSeventh: 10,
      majorSeventh: 11,
      octave: 12,
    };
    this.chords = [
      "major",
      "minor",
      "augmented",
      "diminished",
      "sus2",
      "sus4",
      "major 7th",
      "minor 7th",
      "dominant 7th",
      "diminished 7th",
    ];
  }
  private getNote(
    key: string,
    interval: number
  ): { note: string; index: number } {
    const index = (this.keys.indexOf(key) + interval) % this.keys.length;
    const note = this.keys[index];
    return { note, index };
  }
  keyId(key: string, keyOctave: number): string {
    return `${key}-${keyOctave + 1}`;
  }
  getArray(
    arrayName: string
  ): (string | number)[] | typeof this.intervals | undefined {
    switch (arrayName) {
      case "keys":
        return this.keys;
      case "intervals":
        return this.intervals;
      case "chords":
        return this.chords;
      default:
        return undefined;
    }
  }
  octave(
    currentKey: string,
    compareKey: string,
    octave: number | string
  ): number {
    if (typeof octave === "string") {
      octave = parseInt(octave);
    }
    // console.log(currentKey, this.keys.indexOf(compareKey));
    if (this.keys.indexOf(currentKey) > this.keys.indexOf(compareKey)) {
      return octave;
    }
    return octave - 1;
  }
  chord(currentKey: string, chord: string): (string | null)[] {
    let notes: string[];
    const first_note =
      currentKey[1] === "#" ? currentKey[0] + currentKey[1] : currentKey[0];
    const currentKeyOctave = currentKey[currentKey.length - 1];
    let second_note;
    let third_note;
    let fourth_note;

    switch (chord) {
      case "major":
        second_note = this.getNote(first_note, this.intervals.majorThird);
        third_note = this.getNote(first_note, this.intervals.fifth);
        notes = [
          currentKey,
          this.keyId(
            second_note.note,
            this.octave(first_note, second_note.note, currentKeyOctave)
          ),
          this.keyId(
            third_note.note,
            this.octave(first_note, third_note.note, currentKeyOctave)
          ),
        ];
        return notes;
      case "minor":
        second_note = this.getNote(first_note, this.intervals.minorThird);
        third_note = this.getNote(first_note, this.intervals.fifth);
        notes = [
          currentKey,
          this.keyId(
            second_note.note,
            this.octave(first_note, second_note.note, currentKeyOctave)
          ),
          this.keyId(
            third_note.note,
            this.octave(first_note, third_note.note, currentKeyOctave)
          ),
        ];
        return notes;
      case "augmented":
        second_note = this.getNote(first_note, this.intervals.majorThird);
        third_note = this.getNote(first_note, this.intervals.augmentedFifth);
        notes = [
          currentKey,
          this.keyId(
            second_note.note,
            this.octave(first_note, second_note.note, currentKeyOctave)
          ),
          this.keyId(
            third_note.note,
            this.octave(first_note, third_note.note, currentKeyOctave)
          ),
        ];
        return notes;
      case "diminished":
        second_note = this.getNote(first_note, this.intervals.minorThird);
        third_note = this.getNote(first_note, this.intervals.tritone);
        notes = [
          currentKey,
          this.keyId(
            second_note.note,
            this.octave(first_note, second_note.note, currentKeyOctave)
          ),
          this.keyId(
            third_note.note,
            this.octave(first_note, third_note.note, currentKeyOctave)
          ),
        ];
        return notes;
      default:
        return [null];
    }
  }
  //
}

export default Piano_Class;
