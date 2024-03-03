import { promises as fs } from "fs";
import Quizz from "./components/Quizz";

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/app/db/questions.json",
    "utf8"
  );
  const data = JSON.parse(file);

  return (
    <div>
      <header>
        <h1>Knowledge App</h1>
      </header>
      <main>
        <Quizz data={data} />
        <div className="questions"></div>
      </main>
    </div>
  );
}
