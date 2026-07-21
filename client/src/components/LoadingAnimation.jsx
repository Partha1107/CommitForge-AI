import { useEffect, useState } from "react";

const messages = [
  "🔍 Reading Git Diff...",
  "🧠 Understanding Code Changes...",
  "✍️ Writing Commit Message...",
  "📄 Generating PR Description...",
  "📝 Preparing Release Notes...",
  "🚀 Finalizing Response..."
];

export default function LoadingAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      <div className="bg-slate-800 border border-cyan-500 rounded-xl p-6 text-center shadow-lg">

        <div className="text-4xl animate-pulse mb-4">
          🤖
        </div>

        <h2 className="text-xl font-semibold mb-3">
          AI is Thinking...
        </h2>

        <p className="text-cyan-400 text-lg animate-pulse">
          {messages[index]}
        </p>

      </div>
    </div>
  );
}