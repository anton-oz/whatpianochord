import { useContext } from "react";
import { PianoContext } from "../Context/PianoContext";

export default function DropDownMenu({ menuOpen }: { menuOpen: boolean }) {
  const piano = useContext(PianoContext);

  return (
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
      className={`flex absolute w-[72.5vw]  h-[30vh] bg-zinc-800 bg-opacity-85 top-[4.5rem] left-[13.5%] transition-all duration-300 rounded-b-lg ${
        menuOpen
          ? "opacity-100 scale-95 translate-y-0 blur-none"
          : "opacity-0 scale-[0.3] -translate-y-[50%] blur-sm"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-fit p-6">
        <h4 className="text-2xl px-4 py-1 rounded-t border-t-2 border-x-2 border-white bg-zinc-700 bg-opacity-80 text-zinc-50  font-semibold text-center place-self-center w-full h-fit">
          Note:
        </h4>
        <div className="w-full h-[50%] place-content-start ">
          {" "}
          <p className="rounded-b-lg text-black bg-zinc-50 px-4 py-2 font-semibold text-4xl text-center">
            {piano?.currentKey ? piano?.currentKey : "n/a"}
          </p>
        </div>
      </div>
      <div className="flex">
        <h4 className="m-2 px-3 py-1 rounded bg-sky-600 text-zinc-50 font-semibold text-start w-fit">
          other
        </h4>
      </div>
    </div>
  );
}
