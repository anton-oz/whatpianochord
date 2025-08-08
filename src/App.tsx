import { useThemeContext } from "@/Context/utils";
import Nav from "@/components/nav/Nav";
import Piano from "@/components/piano/Piano";

export default function Home() {
  const theme = useThemeContext();

  return (
    <main
      className={`flex flex-col h-full w-screen bg-gradient-to-t ${
        theme ? "to-[#292c3c] from-[#232634]" : "from-zinc-50 to-zinc-100 "
      }`}
    >
      <Nav />
      <section
        className={`h-screen w-screen flex flex-col justify-center items-center overflow-y-scroll overflow-x-hidden `}
      >
        <Piano />
      </section>
    </main>
  );
}
