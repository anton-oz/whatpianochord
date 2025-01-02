export default function Nav() {
  return (
    <nav className="h-[9%] flex justify-between items-center p-4 bg-nav">
      <div className="w-fit flex justify-center items-center space-x-2 bg-white p-2 rounded-lg">
        <h1 className="sm:text-2xl text-xl font-semibold">Kordify</h1>
        <img src="/kordify.svg" alt="kordify logo" width={32} />
      </div>
    </nav>
  );
}
