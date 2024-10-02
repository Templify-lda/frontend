import { NavBar } from "../components/layout/NavBar";
import { Template } from "../components/layout/Template";

export function Home() {
  return (
    <main className="p-4 flex items-center justify-center flex-col">
      <NavBar />
      <Template />
    </main>
  );
}
