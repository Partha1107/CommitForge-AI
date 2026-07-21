const MAX_CHARACTERS = 10000;

export default function DiffInput({ diff, setDiff }) {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <label className="block text-lg font-semibold mb-3">
        Git Diff / Code Changes
      </label>

      <textarea
        rows={15}
        value={diff}
        onChange={(e) => setDiff(e.target.value)}
        maxLength={MAX_CHARACTERS}
        placeholder="Paste your git diff or code changes here..."
        className="
          w-full
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          p-5
          text-gray-300
          resize-none
          outline-none
          focus:border-cyan-400
          transition
          font-mono
          text-sm
          leading-6
        "
      />

      <div className="mt-2 text-right text-sm text-gray-400">
        {diff.length} / {MAX_CHARACTERS} characters
      </div>
    </div>
  );
}