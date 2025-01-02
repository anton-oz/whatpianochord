import { useState } from "react";

import Piano from "./piano/Piano";

import { Menu, X } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12 z-10">
      <div
        onMouseEnter={() => setMenuOpen(true)}
        className="cursor-pointer w-fit h-fit bg-sky-400 px-8 py-3 m-2 rounded-lg "
      >
        <div className="w-fit flex justify-center items-center space-x-2 bg-white p-2 rounded-lg border-2 border-black">
          <h1 className="sm:text-2xl text-xl font-semibold">Kordify</h1>
          <img src="/kordify.svg" alt="kordify logo" width={32} />
        </div>
        {/* <div
          className="border-2 border-black rounded-lg p-1 cursor-pointer"
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          {menuOpen ? (
            <X size={25} strokeWidth={2} />
          ) : (
            <Menu size={25} strokeWidth={2} />
          )}
        </div> */}
      </div>
      {/* 
        Side Menu ( seperate to component )
      */}
      <div
        onMouseLeave={() => {
          if (menuOpen) {
            setMenuOpen((prevState) => !prevState);
          }
        }}
        className={`absolute w-[20vw] h-screen bg-zinc-50 bg-opacity-95 top-24 left-0 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <hr className="h-[3px] w-[70%] bg-black place-self-center" />
        {/* <div className="bg-sky-500 rounded w-[80%] p-3 relative place-self-center"> */}
        <h4 className="m-2 px-3 py-1 rounded bg-sky-600 text-zinc-50 font-semibold text-center">
          Going to put chord settings here
        </h4>
        <div className="border-2 border-black rounded w-fit max-w-full h-fit flex flex-col">
          {" "}
          <Piano whatToReturn={"controls"} />
        </div>
        {/* </div> */}
      </div>
    </nav>
  );
}
