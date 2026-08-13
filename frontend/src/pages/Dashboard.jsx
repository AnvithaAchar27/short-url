import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    fetchMyUrls();
  }, []);

  const fetchMyUrls = async () => {
  try {
    const response = await API.get("/url/my");

    const userUrls = response.data.urls;

    setUrls(userUrls);

    await fetchTotalClicks(userUrls);
  } catch (error) {
    console.error("Failed to fetch URLs:", error);
  }
};

  // Create a new short URL
  const handleCreateUrl = async (e) => {
    e.preventDefault();

    if (!newUrl) {
      alert("Please enter a URL");
      return;
    }

    try {
      await API.post("/url", {
        url: newUrl,
      });

      setNewUrl("");

      await fetchMyUrls();

      alert("Short URL created successfully");
    } catch (error) {
      console.error("Failed to create URL:", error);
      alert("Failed to create short URL");
    }
  };


  const handleCopy = async (shortId) => {
    console.log("Copy clicked:", shortId);

    const shortUrl = `http://localhost:8001/${shortId}`;

    try {
      await navigator.clipboard.writeText(shortUrl);

      console.log("Copied:", shortUrl);
      alert("Short URL copied!");
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Copy failed");
    }
  };

  const getTotalClicks = async (shortId) => {
  try {
    const response = await API.get(`/url/analytics/${shortId}`);

    return response.data.totalClicks;
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return 0;
  }
};

   const fetchTotalClicks = async (urlList) => {
  try {
    const clickCounts = await Promise.all(
      urlList.map((url) => getTotalClicks(url.shortId))
    );

    const total = clickCounts.reduce(
      (sum, clicks) => sum + clicks,
      0
    );

    setTotalClicks(total);
  } catch (error) {
    console.error("Failed to fetch total clicks:", error);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <h1 className="text-2xl font-bold">
            Shortly
          </h1>

          <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="rounded-lg bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
>
  Logout
</button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">

        {/* Dashboard heading */}
        <div>
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="mt-2 text-slate-400">
            Manage and track your shortened URLs.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          {/* Total Links */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Total Links
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {urls.length}
            </h3>
          </div>

          {/* Total Clicks */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Total Clicks
            </p>

            <h3 className="mt-2 text-3xl font-bold">
  {totalClicks}
</h3>
          </div>

          {/* Active Links */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Active Links
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {urls.length}
            </h3>
          </div>

        </div>

        {/* Create Short URL */}
        <section className="mt-10">

          <div>
            <h2 className="text-xl font-semibold">
              Create a Short Link
            </h2>

            <form
              onSubmit={handleCreateUrl}
              className="mt-4 flex flex-col gap-3 sm:flex-row"
            >

              <input
                type="url"
                placeholder="https://example.com/your-long-url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-700"
              >
                Shorten URL
              </button>

            </form>
          </div>

          {/* URL List */}
          <div className="mt-5 overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

            {urls.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-slate-400">
                  You haven't created any shortened links yet.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800">

                {urls.map((url) => (
                  <div
                    key={url._id}
                    className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between"
                  >

                    <div>
                      <a
  href={`http://localhost:8001/${url.shortId}`}
  target="_blank"
  rel="noopener noreferrer"
  className="font-medium text-blue-400 hover:underline"
>
  http://localhost:8001/{url.shortId}
</a>

                      <p className="mt-2 text-sm text-slate-500">
  {url.visitHistory?.length || 0} clicks
</p>


                    </div>

                    <div className="flex gap-2">
  <button
    onClick={() => {
      window.location.href = `/analytics/${url.shortId}`;
    }}
    className="rounded-lg bg-blue-600 px-4 py-2 text-sm hover:bg-blue-700"
  >
    Analytics
  </button>

  <button
    onClick={() => handleCopy(url.shortId)}
    className="rounded-lg bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
  >
    Copy
  </button>
</div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Dashboard;