import { useEffect, useState } from "react";

const steps = [
  {
    icon: "📂",
    title: "Reading Git Diff",
    description: "Parsing your repository changes...",
  },
  {
    icon: "🧠",
    title: "Analyzing Changes",
    description: "Understanding code modifications...",
  },
  {
    icon: "🤖",
    title: "Generating Commit",
    description: "Creating a conventional commit message...",
  },
  {
    icon: "📄",
    title: "Writing PR Description",
    description: "Preparing pull request details...",
  },
  {
    icon: "🚀",
    title: "Preparing Release Notes",
    description: "Summarizing changes for release...",
  },
];

export default function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-6">

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">

        <div className="flex flex-col items-center">

          <div className="w-20 h-20 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mb-6"></div>

          <h2 className="text-3xl font-bold text-white">
            AI is Working...
          </h2>

          <p className="text-gray-400 mt-2">
            Please wait while CommitForge AI analyzes your Git diff.
          </p>

        </div>

        <div className="mt-10 space-y-4">

          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 rounded-xl p-4 transition-all duration-500 ${
                index === currentStep
                  ? "bg-cyan-500/20 border border-cyan-500"
                  : "bg-slate-900 border border-slate-700"
              }`}
            >
              <div className="text-3xl">
                {step.icon}
              </div>

              <div className="flex-1">

                <h3
                  className={`font-semibold ${
                    index === currentStep
                      ? "text-cyan-400"
                      : "text-white"
                  }`}
                >
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {step.description}
                </p>

              </div>

              {index < currentStep ? (
                <span className="text-green-400 text-xl">
                  ✅
                </span>
              ) : index === currentStep ? (
                <span className="animate-pulse text-cyan-400 text-xl">
                  ⏳
                </span>
              ) : (
                <span className="text-gray-600 text-xl">
                  •
                </span>
              )}
            </div>
          ))}

        </div>

        <div className="mt-8">

          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">

            <div
              className="bg-cyan-500 h-3 rounded-full transition-all duration-700"
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />

          </div>

          <p className="text-center text-gray-400 mt-3">
            Step {currentStep + 1} of {steps.length}
          </p>

        </div>

      </div>

    </div>
  );
}