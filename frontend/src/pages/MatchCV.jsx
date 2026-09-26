import { useState } from "react";
import axios from "axios";

function MatchCV() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleMatch = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get("http://localhost:8000/match-cv");
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to match the CV. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">STEP 04</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Match CV
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Compare the ingested CV with the structured job requirements and
          generate the matching analysis.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <button
          onClick={handleMatch}
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Matching CV..." : "Match CV"}
        </button>

        {error && (
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">
            Matching Result
          </h2>

          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm leading-6 text-slate-100">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default MatchCV;