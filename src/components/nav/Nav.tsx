import { LogIn, Settings } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";
// import { useThemeContext } from "../Context/ThemeContext";

export default function Nav() {
  const [showMenuLinks, setShowMenuLinks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState("");
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

  const toggleMenu = () => {
    setShowMenuLinks((prevState) => !prevState);
  };

  const updateModalName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      console.error(`ERROR: e.target is not a HTMLButton Element`);
      return;
    }
    const name = e.target.dataset.name;
    if (!name) {
      console.error(`ERROR: e.target.dataset.name is ${name}`);
      return;
    }
    console.log(e.target.dataset.name);
    setModalName(name);
  };
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12">
        <div
          onMouseEnter={toggleMenu}
          onMouseLeave={toggleMenu}
          className="absolute top-0 flex-col items-center justify-center w-fit h-[1rem] px-4 py-2 m-3 rounded-lg"
        >
          <div
            className={`w-fit relative top-4 flex justify-center items-center space-x-2 ${
              showMenuLinks ? "rounded-t-lg" : "rounded-lg"
            } p-2  border-2 border-black z-10 cursor-pointer transition-all duration-200 bg-white text-black hover:bg-black hover:text-white`}
          >
            <h1 className="sm:text-2xl text-xl font-semibold">
              <a href="/">Kordem</a>
            </h1>
            <img
              src={publicFolderLocation /* this is for gh-pages config */}
              alt="Kordem logo"
              width={32}
            />
          </div>
          <div
            className={`z-0 relative transition-all duration-200 ${
              showMenuLinks
                ? "translate-y-[15%] opacity-100"
                : "-translate-y-[35%] opacity-0"
            }`}
          >
            <div
              className={`w-full relative -z-50 bg-white text-black top-[75%] border-2 border-black rounded-b-lg border-t-0`}
            >
              {dropdownItems.map((item, i) => (
                <button
                  onClick={(e) => {
                    updateModalName(e);
                    toggleModal();
                  }}
                  data-name={item.name}
                  className={`py-3 w-full flex justify-evenly place-self-center ${
                    i === dropdownItems.length - 1
                      ? "rounded-b-sm"
                      : "border-b-2 border-black"
                  } hover:bg-[#000000] hover:text-white`}
                  key={i}
                >
                  {item.name}
                  {item.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <Modal
        showModal={showModal}
        modalName={modalName}
        toggleModal={toggleModal}
      />
    </>
  );
}
