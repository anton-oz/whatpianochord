"use client";
import { MouseEventHandler, useState } from "react";

import Nav from "@/components/Nav";
import Piano from "@/components/piano/Piano";

export default function Home() {
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

  const keyButtonPress = (event: Event) => {
    const currentButton = event.target;
    if (currentButton) {
      console.log(currentButton);
    }
  };

  return (
    <main className="flex flex-col h-screen w-screen">
      <Nav />
      <section className="h-[91%] flex flex-col justify-center items-center">
        <div className="flex border-t border-black scale-[80%]">
          {[1, 2, 3, 4].map((_, i) => (
            <Piano key={"piano-component-" + i + 1} keyAttr={i} keys={keys} />
          ))}
        </div>
        <div className="flex items-center w-[75%]">
          <div className="w-[33%] flex flex-col justify-center items-center">
            <p className="text-center">
              Pick a key to start building a chord:{" "}
            </p>
            <div className="w-[75%] flex flex-wrap justify-center ">
              {keys.map((key, i) => (
                <button
                  key={i}
                  className={`border-2 border-black rounded-lg px-2 m-1 w-fit`}
                  // onClick={keyButtonPress}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
