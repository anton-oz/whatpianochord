export default function Nav() {
  return (
    <>
      <nav className="h-[9%] w-screen absolute top-0 flex justify-center items-center bg-opacity-0 px-8 py-12">
        {/* NOTE: this div is here to contain the main drop down menu */}
        <div className="absolute top-0 flex-col items-center justify-center w-fit h-[1rem] px-4 py-2 m-3 rounded-lg">
          <div
            className={`w-fit relative top-4 flex justify-center items-center space-x-2 p-2 z-50 transition-all duration-200`}
          >
            {document.body.clientWidth < 850 ? null : (
              <h1 className="text-[5em] font-semibold">What Piano Chord</h1>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
