import { FaCodeBranch } from "react-icons/fa";

export default function Header() {
  return (
    <header className="text-center py-10">
      <div className="flex justify-center items-center gap-3">
        <FaCodeBranch className="text-4xl text-cyan-400" />
        <h1 className="text-5xl font-bold">
          CommitForge AI
        </h1>
      </div>

      <p className="mt-4 text-gray-400 text-lg">
        Write better commits. Generate PRs. Ship faster.
      </p>
    </header>
  );
}