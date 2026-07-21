import { useState } from "react";

import Header from "./components/Header";
import DiffInput from "./components/DiffInput";
import GenerateButton from "./components/GenerateButton";
import OutputTabs from "./components/OutputTabs";
import LoadingCard from "./components/LoadingAnimation";
import HistoryPanel from "./components/HistoryPanel";
import { ToastProvider } from "./components/Toast";

import { generateCommit } from "./services/api";
import useHistory from "./hooks/useHistory";
import { useToast } from "./components/Toast";
import ExportActions from "./components/ExportActions";

export default function App() {
  const [diff, setDiff] = useState("");

  const [loading, setLoading] = useState(false);
  
  const toast = useToast();

  const [result, setResult] = useState({
    provider: "",

    commit: "",
    description: "",

    prTitle: "",
    prDescription: "",

    changelog: "",
    releaseNotes: "",

    branchName: "",
    riskLevel: "",

    type: "",
    scope: "",

    filesSummary: [],
  });

  const {
    history,
    saveHistory,
    clearHistory,
  } = useHistory();

  const handleGenerate = async () => {
    if (!diff.trim()) {
      alert("Please paste a Git diff.");
      return;
    }

    try {
      setLoading(true);

      const data = await generateCommit(diff);

      console.log("Backend Response:", data);

      const formatted = {
        provider: data.provider || "OpenRouter",

        commit: data.commit_message || "",

        description: data.description || "",

        prTitle: data.pr_title || "",

        prDescription: data.description || "",

        changelog: (data.files_summary || []).join("\n"),

        releaseNotes: data.release_notes || "",

        branchName: data.branch_name || "",

        riskLevel: data.risk_level || "",

        type: data.type || "",

        scope: data.scope || "",

        filesSummary: data.files_summary || [],
      };

      console.log("Formatted Result:", formatted);

      setResult(formatted);

      saveHistory(formatted);
    } catch (err) {
      console.error(err);
// ...

toast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item) => {
    setResult(item);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#0f172a] text-white">

        <Header />

        <DiffInput
          diff={diff}
          setDiff={setDiff}
        />

        <GenerateButton
          loading={loading}
          disabled={!diff.trim()}
          onGenerate={handleGenerate}
          onRegenerate={handleGenerate}
          hasResult={!!result.commit}
        />

        {loading ? (
          <LoadingCard />
        ) : (
          <>
            <OutputTabs result={result} />
            {result.commit && <ExportActions result={result} />}
            <HistoryPanel
              history={history}
              onSelect={handleHistorySelect}
              onClear={clearHistory}
            />
          </>
        )}

      </div>
    </ToastProvider>
  );
}