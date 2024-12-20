export default function Piano() {
  const keys = [
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

  const fullPiano = [];

  let index = 9;
  while (fullPiano.length < 88) {
    fullPiano.push(keys[index]);
    index = (index + 1) % keys.length;
  }

  return (
    <div className="w-[1000px] h-[100px] flex border-2 border-black relative">
      {fullPiano.map((key, i) => (
        <>
          {key[1] === "#" ? (
            <div
              className={`w-[10px] h-[60%] bg-black absolute`}
              style={{left: ``}}
            ></div>
          ) : (
            <div className="h-full w-[40px] border border-black">{key}</div>
          )}
        </>
      ))}
    </div>
  );
}
