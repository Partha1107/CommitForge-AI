export default function GenerateButton({
  loading,
  disabled,
  onGenerate,
  onRegenerate,
  hasResult,
}) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button
        onClick={onGenerate}
        disabled={loading || disabled}
        className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-700 transition font-semibold"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {hasResult && (
        <button
          onClick={onRegenerate}
          disabled={loading}
          className="px-8 py-3 rounded-xl border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition font-semibold"
        >
          🔄 Regenerate
        </button>
      )}
    </div>
  );
}