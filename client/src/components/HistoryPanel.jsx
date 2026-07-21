import { Trash2, History } from "lucide-react";

export default function HistoryPanel({
  history,
  onSelect,
  onClear,
}) {
  if (!history || history.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10 px-4">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 text-center text-gray-400">
          <History className="mx-auto mb-3" size={32} />
          <p>No generation history yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold flex items-center gap-2">
          <History size={22} />
          Generation History
        </h2>

        <button
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
          Clear
        </button>

      </div>

      <div className="space-y-4">

        {history.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelect(item)}
            className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 hover:border-cyan-500 hover:bg-slate-750 transition p-5"
          >
            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-semibold text-cyan-400">
                  {item.commit || "Untitled Commit"}
                </h3>

                <p className="text-gray-400 mt-2 line-clamp-2">
                  {item.description}
                </p>

              </div>

              <div className="text-right text-sm text-gray-500">

                <p>{item.type}</p>

                <p>{item.scope}</p>

              </div>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              {item.branchName && (
                <span className="px-3 py-1 rounded-full bg-slate-700 text-xs">
                  🌿 {item.branchName}
                </span>
              )}

              {item.riskLevel && (
                <span className="px-3 py-1 rounded-full bg-slate-700 text-xs">
                  ⚠️ {item.riskLevel}
                </span>
              )}

              {item.provider && (
                <span className="px-3 py-1 rounded-full bg-cyan-700 text-xs">
                  🤖 {item.provider}
                </span>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}