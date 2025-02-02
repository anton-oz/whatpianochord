import { useThemeContext } from "./Context/themeContext";
import Nav from "./components/Nav";
import Piano from "./components/Piano/Piano";

export default function Home() {
  const theme = useThemeContext();

  return (
    <main
      className={`flex flex-col h-full w-screen bg-gradient-to-t ${
        theme ? "from-zinc-800 to-zinc-600" : "from-zinc-50 to-zinc-100 "
      }`}
    >
      <Nav />
      <section className="h-screen w-screen flex flex-col justify-center items-center overflow-y-scroll overflow-x-hidden">
        <Piano />
      </section>
    </main>
  );
}
