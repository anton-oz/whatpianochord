const chordBuilder = (
  currentKey: string | null,
  keys: string[],
  selectedChord: number | null,
  chords: string[],
  keyId: (key: string, octave: number) => string
): (string | null)[] => {
  const currentKeyOctave = currentKey
    ? currentKey[1] === "#"
      ? parseInt(currentKey[3])
      : parseInt(currentKey[2])
    : null;
    
  const currentKeyWithoutOctaveId = currentKey
    ? currentKey[1] === "#"
      ? currentKey[0] + currentKey[1]
      : currentKey[0]
    : null;
  let currentKeyIndex = keys.findIndex(
    (key) => key === currentKeyWithoutOctaveId
  );

  if (selectedChord !== null && chords[selectedChord] === "major") {
    const majorThird = 4;
    const minorThird = 3;

    const majorThirdIndex = (currentKeyIndex + majorThird) % keys.length;
    const minorThirdIndex = (majorThirdIndex + minorThird) % keys.length;

    let majorThirdKeyId = currentKeyOctave
      ? keyId(keys[majorThirdIndex], currentKeyOctave - 1)
      : null;
    let minorThirdKeyId = currentKeyOctave
      ? keyId(keys[minorThirdIndex], currentKeyOctave - 1)
      : null;

    if (currentKeyOctave) {
      if (currentKeyIndex > majorThirdIndex) {
        majorThirdKeyId = keyId(keys[majorThirdIndex], currentKeyOctave);
      }
      if (currentKeyIndex > minorThirdIndex) {
        minorThirdKeyId = keyId(keys[minorThirdIndex], currentKeyOctave);
      }
    }
    const majorChord = [currentKey, majorThirdKeyId, minorThirdKeyId];
    return majorChord;
    // setChordKeys(majorChord);
    // return;
  } else {
    // setChordKeys([]);
    if (selectedChord === null) {
      console.log("no chord selected\n");
      return [null];
    }
    console.log("unsupported chord type");
    return [null];
  }
};

export default chordBuilder;
