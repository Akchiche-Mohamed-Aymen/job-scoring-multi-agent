import { useState } from "react";
import axios from "axios";

function StructureJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!jobTitle.trim()) {
      setError("Please enter a job title.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter the job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/v0/job-profile",
        {
          job_title: jobTitle,
          job_description: jobDescription,
        }
      );

      setMessage(
        response.data?.msg || "Job profile structured successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to structure the job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Structure Job
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Enter the job title and description. The AI will transform the
          job description into structured requirements that can be used
          for CV matching.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <div>
            <label
              htmlFor="job-title"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Job Title
            </label>

            <input
              id="job-title"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. AI Engineer"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
          </div>

          {/* Job Description */}
          <div className="mt-6">
            <label
              htmlFor="job-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Job Description
            </label>

            <textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Enter the complete job description..."
              rows={12}
              className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Include responsibilities, required skills, qualifications,
              experience, and other relevant requirements.
            </p>
          </div>

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

          {/* Loading */}
          {loading && (
            <p className="mt-5 text-center text-sm text-slate-500">
              Structuring job...
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full cursor-pointer rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Structure Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default StructureJob;