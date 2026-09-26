
import { useState } from "react";
import axios from "axios";

function IngestCV() {
  const [filePath, setFilePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!filePath.trim()) {
      setError("Please enter the absolute path of the PDF file.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/ingest-documents",
        {
          file_path: filePath,
        }
      );

      setMessage(
        response.data?.message || "CV ingested successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to ingest the CV. Please check the file path and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Ingest CV
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Provide the absolute path to a candidate's PDF CV. The backend
          will process and store the document for later matching.
        </p>
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="file-path"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            PDF File Path
          </label>

          <input
            id="file-path"
            type="text"
            value={filePath}
            onChange={(e) => setFilePath(e.target.value)}
            placeholder="C:\Users\Username\Documents\candidate.pdf"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

          <p className="mt-2 text-xs leading-5 text-slate-400">
            Enter the absolute path of the PDF file on the machine where
            the FastAPI backend can access it.
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="mt-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Ingesting CV..." : "Ingest CV"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default IngestCV;

