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
      const response = await axios.get(
        "http://localhost:8000/v0/cv_evaluate"
      );


      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to match the CV . Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getEvidenceStyle = (status) => {
    switch (status) {
      case "high":
        return "border-green-100 bg-green-50 text-green-700";

      case "medium":
        return "border-yellow-100 bg-yellow-50 text-yellow-700";

      case "low":
        return "border-orange-100 bg-orange-50 text-orange-700";

      case "unknown":
        return "border-slate-200 bg-slate-50 text-slate-600";

      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  const getTypeStyle = (type) => {
    if (type === "must_have") {
      return "border-red-100 bg-red-50 text-red-600";
    }

    return "border-blue-100 bg-blue-50 text-blue-600";
  };

  const formatLabel = (value) => {
    if (!value) return "";

    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Match CV
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Compare the candidate's CV with the structured job requirements
          and generate the matching analysis.
        </p>
      </div>

      {/* Match Button */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <button
          type="button"
          onClick={handleMatch}
          disabled={loading}
          className="w-full cursor-pointer rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Match CV
        </button>

        {loading && (
          <p className="mt-4 text-center text-sm text-slate-500">
            This process can take some time , please wait until finish the evaluation...
          </p>
        )}

        {error && (
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-6">
          {/* Overall Score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  MATCH RESULT
                </p>

                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Overall CV Score
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  {result.message}
                </p>
              </div>

              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <span className="text-3xl font-bold text-blue-600">
                  {typeof result.score === "number"
                    ? `${(result.score * 100 ).toFixed(2) }%`
                    : result.score}
                </span>
              </div>
            </div>
          </div>

          {/* Evaluation Details */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Evaluation Details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Individual evaluation of each job requirement based on the
                candidate's CV.
              </p>
            </div>

            <div className="space-y-4">
              {result.answers?.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                >
                  {/* Question Header */}
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Question {index + 1}
                      </p>

                      <h3 className="mt-1 text-base font-semibold leading-6 text-slate-900">
                        {item.question}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${getTypeStyle(
                          item.type
                        )}`}
                      >
                        {formatLabel(item.type)}
                      </span>

                      <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {formatLabel(item.category)}
                      </span>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="mt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Answer
                    </p>

                    <div className="mt-2 rounded-xl bg-slate-50 p-4">
                      <p className="text-sm leading-6 text-slate-700">
                        {item.answer}
                      </p>
                    </div>
                  </div>

                  {/* Question Score + Evidence */}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {/* Question Score */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Question Score
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: `${Math.min(
                                Math.max(
                                  (item.confidence ?? 0) * 100,
                                  0
                                ),
                                100
                              )}%`,
                            }}
                          />
                        </div>

                        <span className="w-12 text-right text-sm font-semibold text-slate-700">
                          {typeof item.confidence === "number"
                            ? `${(item.confidence * 100).toFixed(0)}%`
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Evidence Status */}
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Evidence Status
                      </p>

                      <span
                        className={`inline-flex rounded-lg border px-3 py-1.5 text-xs font-semibold capitalize ${getEvidenceStyle(
                          item.evidence_status
                        )}`}
                      >
                        {item.evidence_status}
                      </span>
                    </div>
                  </div>

                  {/* Evidence Documents */}
                  {item.evidence_documents?.length > 0 && (
                    <div className="mt-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Evidence Documents
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {item.evidence_documents.map(
                          (document, docIndex) => (
                            <span
                              key={docIndex}
                              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600"
                            >
                              {document}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchCV;