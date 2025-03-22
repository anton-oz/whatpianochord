import { LogIn, Settings } from "lucide-react";
import { useState } from "react";
// import { useThemeContext } from "../Context/ThemeContext";

export default function Nav() {
  const [show, setShow] = useState(false);
  const publicFolderLocation = process.env.PRODUCTION
    ? "/kordem.svg"
    : "/kordem/kordem.svg";

  // const darkmode = useThemeContext();

  const dropdownItems = [
    {
      name: "Settings",
      icon: <Settings />,
      link: "/",
    },
    {
      name: "Login",
      icon: <LogIn />,
      link: "/",
    },
  ];

  return (
    <>
      <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12">
        <div
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className="absolute top-0 flex-col items-center justify-center w-fit h-[1rem] px-4 py-2 m-3 rounded-lg"
        >
          <div
            className={`w-fit relative top-4 flex justify-center items-center space-x-2 ${show ? "rounded-t-lg" : "rounded-lg"
              } p-2  border-2 border-black z-10 cursor-pointer transition-all duration-200 bg-white text-black hover:bg-black hover:text-white`}
          >
            <h1 className="sm:text-2xl text-xl font-semibold">Kordem</h1>
            <img
              src={publicFolderLocation /* this is for gh-pages config */}
              alt="Kordem logo"
              width={32}
            />
          </div>
          <div
            className={`z-0 relative transition-all duration-200 ${show
              ? "translate-y-[15%] opacity-100"
              : "-translate-y-[35%] opacity-0"
              }`}
          >
            <div
              className={`w-full relative -z-50 bg-white text-black top-[75%] border-2 border-black rounded-b-lg border-t-0`}
            >
              {dropdownItems.map((item, i) => (
                <a
                  href={item.link}
                  className={`py-3 w-full flex justify-evenly place-self-center ${i === dropdownItems.length - 1
                    ? "rounded-b-sm"
                    : "border-b-2 border-black"
                    } hover:bg-[#000000] hover:text-white`}
                  key={i}
                >
                  {item.name}
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
