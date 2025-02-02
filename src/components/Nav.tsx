import { useState } from "react";
import { useThemeContext } from "../Context/themeContext";

export default function Nav() {
  const [show, setShow] = useState(false);
  const publicFolderLocation = process.env.PRODUCTION
    ? "/kordem.svg"
    : "/kordem/kordem.svg";

  const darkmode = useThemeContext();

  return (
    <>
      <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12">
        <div className=" flex items-center justify-center w-fit h-fit space-x-3 px-4 py-2 m-3 rounded-lg">
          <div
            onClick={() => setShow(!show)}
            className="w-fit flex justify-center items-center space-x-2 bg-white p-2 rounded-lg border-2 border-black z-50 cursor-pointer hover:scale-[1.02] hover:bg-black hover:text-white transition-all duration-200"
          >
            <h1 className="sm:text-2xl text-xl font-semibold">Kordem</h1>
            <img
              src={publicFolderLocation /* this is for gh-pages config */}
              alt="Kordem logo"
              width={32}
            />
          </div>
        </div>
        {/* 
        Side Menu ( seperate to component )
      */}
      </nav>
      {show ? (
        <div className="absolute w-screen h-screen flex justify-center items-center bg-opacity-0">
          <div
            className={`w-[90%] h-[90%] z-20 rounded-lg ${
              darkmode ? "bg-white" : "bg-black"
            } bg-opacity-40`}
          >
            {/* <ChatWindow /> */}
          </div>
        </div>
      ) : null}
    </>
  );
}
