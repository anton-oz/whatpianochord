import { useState } from "react";

import Piano from "./piano/Piano";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const chevron = {
    size: 30,
    strokeWidth: 1.75,
    className: `transition-all duration-300`,
  };

  return (
    <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12 z-10">
      <div className=" flex items-center justify-center cursor-pointer w-fit h-fit space-x-3 px-4 py-2 m-3 rounded-lg ">
        <div className="w-fit flex justify-center items-center space-x-2 bg-white p-2 rounded-lg border-2 border-black">
          <h1 className="sm:text-2xl text-xl font-semibold">Kordify</h1>
          <img src="/kordify.svg" alt="kordify logo" width={32} />
        </div>
        <div
          onClick={() => setMenuOpen((prevState) => !prevState)}
          className={`relative top-0 bg-white p-1 rounded border-black border-2 transition-all duration-100 bg-gradient-to-b  hover:bg-gradient-to-br hover:scale-[0.96] ${
            menuOpen
              ? "border-b-[2px] border-r-[2.5px] border-t-[2px] translate-x-[1px] translate-y-[1px]  hover:border-r-[3px] hover:border-b-[3px] from-amber-50 to-zinc-100 hover:from-rose-100 hover:to-amber-50"
              : "border-b-[6px] border-r-[4px] border-t-[2px]  hover:translate-x-[1px] hover:translate-y-[1px] hover:border-r-[3px] hover:border-b-[3px] from-white to-zinc-200 hover:from-emerald-100"
          }`}
        >
          {menuOpen ? (
            <ChevronUp
              size={chevron.size}
              strokeWidth={chevron.strokeWidth}
              className={chevron.className}
            />
          ) : (
            <ChevronDown
              size={chevron.size}
              strokeWidth={chevron.strokeWidth}
              className={chevron.className}
            />
          )}
        </div>
      </div>
      {/* 
        Side Menu ( seperate to component )
      */}
      <div
        /*
          For the following function decide between having it open all the time and when it should auto close

          for now you have to click the menu button to toggle visibility
        */
        // onMouseLeave={() => {
        //   if (menuOpen) {
        //     setMenuOpen((prevState) => !prevState);
        //   }
        // }}
        className={`absolute w-[20vw] h-screen bg-zinc-800 bg-opacity-85 top-24 left-0 transition-opacity duration-300 rounded-tr-lg ${
          menuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* <hr className="border-t-2 border-red-500 w-[100%] rounded-tr-lg place-self-center" /> */}
        <h4 className="m-2 px-3 py-1 rounded bg-sky-600 text-zinc-50 font-semibold text-center">
          Going to put chord settings here
        </h4>
        <div className="border-2 border-black rounded w-fit max-w-full h-fit flex flex-col">
          {" "}
          <Piano whatToReturn={"controls"} />
        </div>
      </div>
    </nav>
  );
}
