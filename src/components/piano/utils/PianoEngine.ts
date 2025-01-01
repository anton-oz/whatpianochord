/* 
  types
*/

interface Note {
  note: string;
  index: number;
}

interface Intervals {
  [key: string]: number;
}

class PianoEngine {
  keys: string[];
  intervals: Intervals;
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
  /*
    Get note interval away from input note
  */
  private getNote(
    key: string,
    interval: number
  ): { note: string; index: number } {
    const index = (this.keys.indexOf(key) + interval) % this.keys.length;
    const note = this.keys[index];
    return { note, index };
  }
  /*
    return ID of input key on piano
  */
  keyId(key: string, keyOctave: number): string {
    return `${key}-${keyOctave + 1}`;
  }
  /* 
    methods to get array from this class
  */
  getKeys(): string[] {
    return this.keys;
  }
  getIntervals(): Intervals {
    return this.intervals;
  }
  getChords(): string[] {
    return this.chords;
  }
  /*
    ####################################
  */
  /*
    TODO: need to make responsive for inversion option
    
    currently returns the octave that the input key should be to be in 1st inversion
  */
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
  /* 
    returns an array of keys to highlight depending on chord selected
  */
  chord(currentKey: string, chord: string): (string | null)[] {
    let notes: (string | null)[] = [null];

    const first_note =
      currentKey[1] === "#" ? currentKey[0] + currentKey[1] : currentKey[0];
    const currentKeyOctave = currentKey[currentKey.length - 1];
    let second_note: Note;
    let third_note: Note;
    let fourth_note: Note | undefined;

    /* 
      To make this switch statement more concise I could have the chord array be
      an array of objects that have a name key and either an array or an object that 
      has the intervals neccesary to build the chord 
    */
    switch (chord) {
      case "major":
        second_note = this.getNote(first_note, this.intervals.majorThird);
        third_note = this.getNote(first_note, this.intervals.fifth);
        break;
      case "minor":
        second_note = this.getNote(first_note, this.intervals.minorThird);
        third_note = this.getNote(first_note, this.intervals.fifth);
        break;
      case "augmented":
        second_note = this.getNote(first_note, this.intervals.majorThird);
        third_note = this.getNote(first_note, this.intervals.augmentedFifth);
        break;
      case "diminished":
        second_note = this.getNote(first_note, this.intervals.minorThird);
        third_note = this.getNote(first_note, this.intervals.tritone);
        break;
      case "sus2":
        second_note = this.getNote(first_note, this.intervals.majorSecond);
        third_note = this.getNote(first_note, this.intervals.fifth);
        break;
      case "sus4":
        second_note = this.getNote(first_note, this.intervals.fourth);
        third_note = this.getNote(first_note, this.intervals.fifth);
        break;
      case "major 7th":
        second_note = this.getNote(first_note, this.intervals.majorThird);
        third_note = this.getNote(first_note, this.intervals.fifth);
        fourth_note = this.getNote(first_note, this.intervals.majorSeventh);
        break;
      case "minor 7th":
        second_note = this.getNote(first_note, this.intervals.minorThird);
        third_note = this.getNote(first_note, this.intervals.fifth);
        fourth_note = this.getNote(first_note, this.intervals.minorSeventh);
        break;
      case "dominant 7th":
        second_note = this.getNote(first_note, this.intervals.majorThird);
        third_note = this.getNote(first_note, this.intervals.fifth);
        fourth_note = this.getNote(first_note, this.intervals.minorSeventh);
        break;
      case "diminished 7th":
        second_note = this.getNote(first_note, this.intervals.minorThird);
        third_note = this.getNote(first_note, this.intervals.tritone);
        fourth_note = this.getNote(first_note, this.intervals.minorSeventh);
        break;
      default:
        return notes;
    }
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
    if (fourth_note) {
      notes.push(
        this.keyId(
          fourth_note.note,
          this.octave(first_note, fourth_note.note, currentKeyOctave)
        )
      );
    }
    return notes;
  }
}

export default PianoEngine;
