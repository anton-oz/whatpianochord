export default function Nav() {
  const publicFolderLocation = process.env.VITE_PRODUCTION
    ? "/kordify.svg"
    : "/kordify/kordify.svg";

  return (
    <nav className="h-[9%] w-screen absolute top-0 flex justify-start items-center bg-opacity-0 px-8 py-12">
      <div className=" flex items-center justify-center w-fit h-fit space-x-3 px-4 py-2 m-3 rounded-lg ">
        <div className="w-fit flex justify-center items-center space-x-2 bg-white p-2 rounded-lg border-2 border-black z-50">
          <h1 className="sm:text-2xl text-xl font-semibold">Kordify</h1>
          <img
            src={publicFolderLocation /* this is for gh-pages config */}
            alt="kordify logo"
            width={32}
          />
        </div>
      </div>
      {/* 
        Side Menu ( seperate to component )
      */}
    </nav>
  );
}
