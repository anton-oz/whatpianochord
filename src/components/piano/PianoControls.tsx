import KeyPicker from "./pianoController/KeyPicker";
import ChordType from "./pianoController/ChordType";

export default function PianoControls({
  currentKey,
  currentChord,
  selectChord,
}: {
  currentKey: string | null;
  currentChord: string | null;
  selectChord: (chord: string) => void;
}) {
  return (
    <>
      <KeyPicker currentKey={currentKey} />
      <ChordType currentChord={currentChord} selectChord={selectChord} />
    </>
  );
}
