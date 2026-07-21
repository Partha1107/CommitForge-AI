import { useState } from "react";

import Header from "./components/Header";
import DiffInput from "./components/DiffInput";
import GenerateButton from "./components/GenerateButton";
import OutputTabs from "./components/OutputTabs";
import { ToastProvider } from "./components/Toast";
import LoadingAnimation from "./components/LoadingAnimation";

import { generateCommit } from "./services/api";

export default function App() {
  const [diff, setDiff] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState({
    commit: "",
    description: "",
    prTitle: "",
    prDescription: "",
    changelog: "",
    releaseNotes: "",
  });

    const handleGenerate = async () => {
      try {
        setLoading(true);
      
        const data = await generateCommit(diff);
      
        setResult(data);
      
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#0f172a] text-white">
        <Header />

        <DiffInput diff={diff} setDiff={setDiff} />

        <GenerateButton loading={loading} disabled={!diff.trim()} onClick={handleGenerate} />
        {loading && <LoadingAnimation />}
        <OutputTabs result={result} />
      </div>
    </ToastProvider>
  );
}