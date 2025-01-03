import { useState, KeyboardEvent } from "react";

import { Power } from "lucide-react";

import DropDownMenu from "./DropDownMenu";

export default function DropDownButton() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [_, setClicked] = useState<boolean>(false);

  const chevron = {
    size: 30,
    strokeWidth: 2,
    className: `transition-all duration-300 active:border-sky-500 rounded-full`,
  };

  const handleClick = () => {
    setMenuOpen((prevState) => !prevState);
    setClicked((prevState) => !prevState);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  return (
    <>
      <div
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`  `}
      >
        <div
          aria-label="button"
          className={`absolute max-w-fit h-fit scale-[1.5] left-10 top-8 cursor-pointer flex items-center justify-center font-bold bg-white p-1 rounded border-black border-2 transition-all duration-100 bg-gradient-to-b hover:bg-gradient-to-br  focus:ring-2 active:ring-2 ring-sky-400 ${
            menuOpen
              ? "border-b-[2px] border-r-[2.5px] border-t-[2px] from-white to-zinc-50 text-emerald-400"
              : "border-b-[6px] border-r-[4px] border-t-[2px]  hover:translate-x-[1px] hover:translate-y-[1px] hover:border-r-[3px] hover:border-b-[3px] from-white to-zinc-200 hover:from-sky-50"
          }`}
        >
          <Power
            size={chevron.size}
            strokeWidth={chevron.strokeWidth}
            className={chevron.className}
          />
        </div>
      </div>
      <div className="w-min">
        <DropDownMenu menuOpen={menuOpen} />
      </div>
    </>
  );
}
