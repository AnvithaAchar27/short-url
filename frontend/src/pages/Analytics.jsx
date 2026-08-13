import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function Analytics() {
  const { shortId } = useParams();

  const [totalClicks, setTotalClicks] = useState(0);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await API.get(`/url/analytics/${shortId}`);

      setTotalClicks(response.data.totalClicks);
      setAnalytics(response.data.analytics);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-3xl font-bold">
        Analytics
      </h1>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-400">
          Total Clicks
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {totalClicks}
        </h2>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">
          Click History
        </h2>

        <div className="mt-4">
          {analytics.length === 0 ? (
            <p className="text-slate-400">
              No clicks yet.
            </p>
          ) : (
            analytics.map((click, index) => (
              <div
                key={index}
                className="border-b border-slate-800 py-3"
              >
                {new Date(click.timestamp).toLocaleString()}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;