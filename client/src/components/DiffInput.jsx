import { useRef } from "react";

export default function DiffInput({ diff, setDiff }) {
  const textareaRef = useRef(null);

  const handleClear = () => {
    setDiff("");
    textareaRef.current?.focus();
  };

  const handlePasteExample = () => {
    const example = `diff --git a/src/App.jsx b/src/App.jsx
index abc123..def456 100644
--- a/src/App.jsx
+++ b/src/App.jsx
@@ -10,6 +10,9 @@
+const handleClick = () => {
+  console.log("Hello CommitForge AI");
+}
`;

    setDiff(example);
    textareaRef.current?.focus();
  };

  const lineCount = diff ? diff.split("\n").length : 0;
  const charCount = diff.length;

  return (
    <div className="max-w-6xl mx-auto px-6 mt-8">

      <div className="flex justify-between items-center mb-3">

        <div>
          <h2 className="text-2xl font-bold text-white">
            📄 Git Diff
          </h2>

          <p className="text-gray-400 mt-1">
            Paste your Git diff below and let AI generate everything.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={handlePasteExample}
            className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
          >
            Example
          </button>

          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            Clear
          </button>

        </div>

      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

        <textarea
          ref={textareaRef}
          value={diff}
          onChange={(e) => setDiff(e.target.value)}
          placeholder="Paste your git diff here..."
          className="w-full h-[380px] bg-transparent p-5 outline-none resize-none text-gray-300 font-mono text-sm leading-7"
        />

        <div className="border-t border-slate-700 px-5 py-3 flex justify-between text-sm text-gray-400">

          <span>
            📄 {lineCount} lines
          </span>

          <span>
            🔠 {charCount} characters
          </span>

        </div>

      </div>

      <div className="mt-4 grid md:grid-cols-3 gap-4">

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="font-semibold text-cyan-400">
            💬 Commit Message
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Conventional Commit following best practices.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="font-semibold text-cyan-400">
            📄 Pull Request
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            AI-generated PR title and description.
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="font-semibold text-cyan-400">
            🚀 Release Notes
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            Release notes and changelog generated automatically.
          </p>
        </div>

      </div>

    </div>
  );
}