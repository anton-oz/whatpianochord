import Nav from "./components/Nav";
import Piano from "./components/piano/Piano";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen">
      <Nav />
      <section className="h-[91%] flex flex-col justify-center items-center">
        <Piano octaves={3} />
      </section>
    </main>
  );
}
