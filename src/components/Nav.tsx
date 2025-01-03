import { useState, KeyboardEvent } from "react";

import { ChevronDown } from "lucide-react";

import DropDownMenu from "./DropDownMenu";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [_, setClicked] = useState<boolean>(false);

  const publicFolderLocation = process.env.VITE_PRODUCTION
    ? "/kordify.svg"
    : "/kordify/kordify.svg";

  const chevron = {
    size: 30,
    strokeWidth: 1.75,
    className: `transition-all duration-300 active:border-sky-500`,
  };

  const handleClick = () => {
    setMenuOpen((prevState) => !prevState);
    setClicked((prevState) => !prevState);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  return (
    <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12 z-10 r">
      <div className=" flex items-center justify-center w-fit h-fit space-x-3 px-4 py-2 m-3 rounded-lg ">
        <div className="w-fit flex justify-center items-center space-x-2 bg-white p-2 rounded-lg border-2 border-black">
          <h1 className="sm:text-2xl text-xl font-semibold">Kordify</h1>
          <img
            src={publicFolderLocation /* this is for gh-pages config */}
            alt="kordify logo"
            width={32}
          />
        </div>
        <div
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`cursor-pointer flex items-center justify-center font-bold relative top-0 bg-white p-1 rounded border-black border-2 transition-all duration-100 bg-gradient-to-b hover:bg-gradient-to-br  focus:ring-2 active:ring-2 ring-sky-400 ${
            menuOpen
              ? "border-b-[2px] border-r-[2.5px] border-t-[2px]  from-sky-100 to-zinc-100 "
              : "border-b-[6px] border-r-[4px] border-t-[2px]  hover:translate-x-[1px] hover:translate-y-[1px] hover:border-r-[3px] hover:border-b-[3px] from-white to-zinc-200 hover:from-sky-50"
          }`}
        >
          Controls
          <ChevronDown
            size={chevron.size}
            strokeWidth={chevron.strokeWidth}
            className={chevron.className}
          />
        </div>
      </div>
      {/* 
        Side Menu ( seperate to component )
      */}
      <DropDownMenu menuOpen={menuOpen} />
    </nav>
  );
}
