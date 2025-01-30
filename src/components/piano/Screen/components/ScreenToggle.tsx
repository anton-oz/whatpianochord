import { useState, KeyboardEvent } from "react";

import { Power } from "lucide-react";

export default function ScreenToggle({
  screenOn,
  setScreenOn,
}: {
  screenOn: boolean;
  setScreenOn: (prevState: any) => void;
}) {
  const [_, setClicked] = useState<boolean>(false);

  const chevron = {
    size: 30,
    strokeWidth: 2,
    className: `transition-all duration-300 active:border-sky-500 rounded-full`,
  };

  const handleClick = () => {
    setScreenOn((prevState: boolean) => !prevState);
    setClicked((prevState) => !prevState);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  return (
    <>
      <div className={`  `}>
        <div
          aria-label="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          className={`absolute max-w-fit h-fit scale-[1.5] left-10 top-8 cursor-pointer flex items-center justify-center font-bold bg-white p-1 rounded border-black border-2 transition-all duration-100 bg-gradient-to-b hover:bg-gradient-to-br  focus:ring-2 active:ring-2 ring-sky-400 ${
            screenOn
              ? "border-b-[2px] border-r-[2.5px] border-t-[2px] from-white to-zinc-50 text-emerald-400 translate-x-[1px] translate-y-[1px]"
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
    </>
  );
}
