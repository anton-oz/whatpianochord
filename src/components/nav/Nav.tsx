import { LogIn, Settings } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/modal/Modal";

export default function Nav() {
  const [showMenuLinks, setShowMenuLinks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalName, setModalName] = useState("");

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
    setModalName(name);
  };
  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12">
        {/* NOTE: this div is here to contain the main drop down menu */}
        <div
          onMouseEnter={toggleMenu}
          onMouseLeave={toggleMenu}
          className="absolute top-0 flex-col items-center justify-center w-fit h-[1rem] px-4 py-2 m-3 rounded-lg"
        >
          <div
            className={`w-fit relative top-4 flex justify-center items-center space-x-2 ${
              showMenuLinks ? "rounded-t-lg" : "rounded-lg"
            } p-2  border-2 border-black z-50 cursor-pointer transition-all duration-200 bg-white text-black hover:bg-black hover:text-white`}
          >
            {document.body.clientWidth < 850 ? null : (
              <h1 className="sm:text-2xl text-xl font-semibold">
                <a href="/">What Piano Chord</a>
              </h1>
            )}
            <img
              src="/whatpianochord.svg"
              alt="What Piano Chord logo"
              width={32}
            />
          </div>
          <div
            className={`z-20 relative transition-all duration-200 ${
              showMenuLinks
                ? "translate-y-[15%] opacity-100"
                : "-translate-y-[35%] opacity-0"
            }`}
          >
            <div
              className={`w-full relative bg-white text-black top-[75%] border-2 border-black rounded-b-lg border-t-0`}
            >
              {dropdownItems.map((item, i) => (
                <button
                  onClick={(e) => {
                    updateModalName(e);
                    toggleModal();
                  }}
                  data-name={item.name}
                  className={`flex justify-center place-self-center py-3 w-full hover:bg-[#000000] hover:text-white ${
                    i === dropdownItems.length - 1
                      ? "rounded-b-sm"
                      : "border-b-2 border-black"
                  }`}
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
