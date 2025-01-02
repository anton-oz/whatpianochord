import Nav from "./components/Nav";
import Piano from "./components/piano/Piano";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-screen bg-sky-50 bg-opacity-5">
      <Nav />
      <section className="h-screen w-screen flex flex-row-reverse justify-center items-center overflow-y-scroll overflow-x-hidden">
        <Piano />
      </section>
    </main>
  );
}
