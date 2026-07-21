import { useToast } from "./Toast";

export default function ExportActions({ result }) {
  const toast = useToast();

  const markdown = `# CommitForge AI Output

## Commit Message
${result.commit}

## Description
${result.description}

## PR Title
${result.prTitle}

## PR Description
${result.prDescription}

## Branch Name
${result.branchName}

## Type
${result.type}

## Scope
${result.scope}

## Risk Level
${result.riskLevel}

## Release Notes
${result.releaseNotes}

## Changelog
${result.changelog}
`;

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      toast("Copied everything to clipboard!", "success");
    } catch {
      toast("Failed to copy.", "error");
    }
  };

  const download = (filename, content, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  const exportMarkdown = () => {
    download("commitforge-output.md", markdown, "text/markdown");
    toast("Markdown exported!", "success");
  };

  const exportTxt = () => {
    download("commitforge-output.txt", markdown, "text/plain");
    toast("TXT exported!", "success");
  };

  const exportJson = () => {
    download(
      "commitforge-output.json",
      JSON.stringify(result, null, 2),
      "application/json"
    );
    toast("JSON exported!", "success");
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <div className="flex flex-wrap gap-4 justify-center">

        <button
          onClick={copyAll}
          className="px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition"
        >
          📋 Copy All
        </button>

        <button
          onClick={exportMarkdown}
          className="px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition"
        >
          📄 Markdown
        </button>

        <button
          onClick={exportTxt}
          className="px-5 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition"
        >
          📝 TXT
        </button>

        <button
          onClick={exportJson}
          className="px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
        >
          📦 JSON
        </button>

      </div>
    </div>
  );
}