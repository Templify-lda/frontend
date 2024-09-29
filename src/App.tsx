import { Cards } from "./components/ui/Cards";
import { NavBar } from "./components/ui/NavBar";
import { Template } from "./components/ui/Template";

export function App() {
  return (
    <main className="p-4 flex items-center justify-center flex-col">
      <NavBar />
      <Template />
    </main>
  );
}
