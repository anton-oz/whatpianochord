import Nav from "./components/Nav";
import Piano from "./components/Piano/Piano";

export default function Home() {
  return (
    <main className="flex flex-col h-full w-screen bg-gradient-to-t from-zinc-50 to-zinc-100 bg-opacity-5">
      <Nav />
      <section className="h-screen w-screen flex flex-col justify-center items-center overflow-y-scroll overflow-x-hidden">
        <Piano />
      </section>
    </main>
  );
}
