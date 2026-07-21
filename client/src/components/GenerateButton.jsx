import { FaRocket } from "react-icons/fa";

export default function GenerateButton({
  loading,
  disabled,
  onClick,
}) {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        disabled={loading || disabled}
        className="
          flex
          items-center
          gap-3
          px-8
          py-3
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-400
          hover:scale-105
          transition-all
          duration-300
          font-semibold
          text-lg
          disabled:bg-slate-700
          disabled:text-slate-400
          disabled:cursor-not-allowed
          shadow-lg
          hover:shadow-cyan-500/40
        "
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Generating...
          </>
        ) : (
          <>
            <FaRocket />
            Generate
          </>
        )}
      </button>
    </div>
  );
}