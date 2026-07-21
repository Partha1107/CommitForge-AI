import { useState } from "react";
import { useToast } from "./Toast";

const tabs = [
  "Commit",
  "Description",
  "PR Title",
  "PR Description",
  "Changelog",
  "Release Notes",
];

export default function OutputTabs({ result }) {
  const [activeTab, setActiveTab] = useState("Commit");
  const [copiedTab, setCopiedTab] = useState(null);
  const addToast = useToast();

  const getContent = () => {
    switch (activeTab) {
      case "Commit":
        return result.commit;

      case "Description":
        return result.description;

      case "PR Title":
        return result.prTitle;

      case "PR Description":
        return result.prDescription;

      case "Changelog":
        return result.changelog;

      case "Release Notes":
        return result.releaseNotes;

      default:
        return "";
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <div className="flex flex-wrap gap-3 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${
              activeTab === tab
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-gray-300 hover:bg-slate-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 min-h-[220px]">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>

          <button
            onClick={async () => {
              const text = getContent() || "";
              try {
                await navigator.clipboard.writeText(text);
                setCopiedTab(activeTab);
                addToast("Copied to clipboard");
                setTimeout(() => setCopiedTab(null), 2000);
              } catch (err) {
                console.error("Copy failed", err);
                addToast("Copy failed");
              }
            }}
            className="ml-4 px-3 py-1 rounded-md bg-slate-700 text-sm text-gray-200 hover:bg-slate-600 transition"
          >
            {copiedTab === activeTab ? "Copied" : "Copy"}
          </button>
        </div>

        <pre className="whitespace-pre-wrap font-mono text-gray-300">{getContent() || "No output generated yet."}</pre>
      </div>
    </div>
  );
}