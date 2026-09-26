import { useState } from "react";
import axios from "axios";

function ApiKey() {
  const [mistral, setMistral] = useState("");
  const [hf, setHf] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const mistralKey = mistral.trim();
    const hfKey = hf.trim();

    if (mistralKey.length !== 32) {
      setError("Mistral API key must contain exactly 32 characters.");
      return;
    }

    if (hfKey.length !== 37) {
      setError("Hugging Face token must contain exactly 37 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/v0/api_key",
        {
          mistral: mistralKey,
          hf: hfKey,
        }
      );

      console.log(response);

      setMessage(
        response.data?.message || "API keys saved successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to save the API keys. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          Add API Keys
        </h1>

        <p className="mt-2 max-w-2xl text-slate-500">
          Provide your Mistral and Hugging Face API keys to enable the
          AI components used by the application.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <form onSubmit={handleSubmit}>
          {/* Mistral */}
          <div>
            <label
              htmlFor="mistral-key"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Mistral API Key
            </label>

            <input
              id="mistral-key"
              type="password"
              value={mistral}
              onChange={(e) => setMistral(e.target.value)}
              placeholder="Enter your Mistral API key"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Must contain exactly 32 characters.{" "}
              <a
                href="https://console.mistral.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Get your Mistral API key
              </a>
            </p>
          </div>

          {/* Hugging Face */}
          <div className="mt-6">
            <label
              htmlFor="hf-key"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Hugging Face Token
            </label>

            <input
              id="hf-key"
              type="password"
              value={hf}
              onChange={(e) => setHf(e.target.value)}
              placeholder="hf_..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Must contain exactly 37 characters.{" "}
              <a
                href="https://huggingface.co/settings/tokens"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Get your Hugging Face token
              </a>
            </p>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600">
              {message}
            </div>
          )}

          {/* Loading message */}
          {loading && (
            <p className="mt-5 text-center text-sm text-slate-500">
              Saving API keys...
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full cursor-pointer rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save API Keys
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApiKey;