export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-6">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-extrabold text-white">
              ⚡ CommitForge AI
            </h1>

            <p className="mt-2 text-gray-400">
              AI-powered Git Commit, PR & Release Notes Generator
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">

            <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500">
              🤖 OpenRouter
            </span>

            <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500">
              🟢 Online
            </span>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-8">

          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-lg font-semibold text-cyan-400">
              💬 Commit
            </h3>
            <p className="text-gray-400 mt-2">
              Conventional Commit Messages
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-lg font-semibold text-cyan-400">
              📄 Pull Request
            </h3>
            <p className="text-gray-400 mt-2">
              Auto-generated PR title & description
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-lg font-semibold text-cyan-400">
              🚀 Release Notes
            </h3>
            <p className="text-gray-400 mt-2">
              Generate release notes instantly
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <h3 className="text-lg font-semibold text-cyan-400">
              🌿 Smart Branch
            </h3>
            <p className="text-gray-400 mt-2">
              Suggest meaningful branch names
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}