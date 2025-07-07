import QuizGame from "./components/QuizGame";
import { ConnectAndSIWE } from "./components/ConnectAndSIWE";

export default function Page() {
  return (
    <main>
      <h1>Smart Wallet Integration</h1>
      <ConnectAndSIWE />
      <QuizGame />
    </main>
  );
}
