import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Landing() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleShorten = async () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setShortUrl("");

      const response = await API.post("/url", {
        url: url,
      });

      const shortId = response.data.id;

      setShortUrl(`http://localhost:8001/${shortId}`);
    } catch (error) {
      console.error("Error creating short URL:", error);
      setError("Unable to shorten the URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
            Smart URL Management
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Shorten links.
            <span className="text-blue-500"> Track every click.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Create short, shareable links and manage them with powerful
            analytics, custom aliases, and expiration controls.
          </p>

          {/* URL Input */}
          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3 sm:flex-row">
            
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here..."
              className="flex-1 rounded-xl bg-slate-800 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleShorten}
              disabled={loading}
              className="rounded-xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mx-auto mt-4 max-w-3xl text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Short URL Result */}
          {shortUrl && (
            <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-green-800 bg-green-950/30 p-5 text-left">
              
              <p className="text-sm text-slate-400">
                Your shortened URL
              </p>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all font-medium text-blue-400 hover:underline"
                >
                  {shortUrl}
                </a>

                <button
                  onClick={handleCopy}
                  className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
                >
                  Copy
                </button>

              </div>
            </div>
          )}

          {/* Features */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <span>⚡ Fast</span>
            <span>📊 Analytics</span>
            <span>🔒 Secure</span>
          </div>

        </section>

        {/* Features Section */}
        <section
          id="features"
          className="border-t border-slate-800 bg-slate-900/40"
        >
          <div className="mx-auto max-w-6xl px-6 py-20">
            
            <h2 className="text-center text-3xl font-bold">
              Everything you need to manage your links
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="text-3xl">🔗</div>

                <h3 className="mt-4 text-xl font-semibold">
                  Short & Shareable
                </h3>

                <p className="mt-2 text-slate-400">
                  Turn long URLs into clean, easy-to-share links.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="text-3xl">📊</div>

                <h3 className="mt-4 text-xl font-semibold">
                  Detailed Analytics
                </h3>

                <p className="mt-2 text-slate-400">
                  Track clicks and understand how your links perform.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="text-3xl">⚙️</div>

                <h3 className="mt-4 text-xl font-semibold">
                  Full Control
                </h3>

                <p className="mt-2 text-slate-400">
                  Manage, customize, and control your shortened URLs.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;