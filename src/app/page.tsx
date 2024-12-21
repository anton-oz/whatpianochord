"use client";

import { usePianoContext } from "@/context/PianoContext";

import Nav from "@/components/Nav";
import Piano from "@/components/piano/Piano";
import KeyPicker from "@/components/KeyPicker";
import ChordType from "@/components/ChordType";

export default function Home() {
  const { keys } = usePianoContext();

  return (
    <main className="flex flex-col h-screen w-screen">
      <Nav />
      <section className="h-[91%] flex flex-col justify-center items-center">
        <div className="flex border-t border-black scale-[80%]">
          {[1, 2, 3, 4].map((_, i) => (
            <Piano key={"piano-component-" + i + 1} keyAttr={i} />
          ))}
        </div>
        <div className="flex items-start w-[75%] h-fit">
          <KeyPicker />
          <ChordType />
        </div>
      </section>
    </main>
  );
}
