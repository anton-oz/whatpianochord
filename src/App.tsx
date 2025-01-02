import Nav from "./components/Nav";
import Piano from "./components/piano/Piano";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-sky-50 bg-opacity-5">
      <Nav />
      <section className="h-[91%] flex flex-col justify-start items-center">
        <Piano />
      </section>
    </main>
  );
}
