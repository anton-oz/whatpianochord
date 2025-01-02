import Piano from "./piano/Piano";

export default function SideMenu({ menuOpen }: { menuOpen: boolean }) {
  //   if (!menuOpen) {
  //     return;
  //   }
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
  );
}
