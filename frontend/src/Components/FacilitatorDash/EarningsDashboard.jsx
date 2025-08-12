import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const EarningsDashboard = () => {
  const [graphData, setGraphData] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    avgEarning: 0,
    growthRate: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      setError("No access token found");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // NOTE: no trailing space in URL
    axios.get("http://127.0.0.1:8000/api/v1/bookings/facilitator/dashboard/", {
      headers: { Authorization: `Bearer ${access}` }
    })
      .then((res) => {
        const data = res.data || {};
        // prefer graphData if provided, otherwise build from chart fields
        const gd = Array.isArray(data.graphData) && data.graphData.length ? data.graphData
          : (data.chart && Array.isArray(data.chart.labels) ? data.chart.labels.map((label, i) => ({
              date: label,
              earnings: (data.chart.earnings && data.chart.earnings[i]) || 0,
              orders: (data.chart.orders && data.chart.orders[i]) || 0
            })) : []);

        setGraphData(gd);
        if (data.stats) {
          setStats({
            totalEarnings: Number(data.stats.totalEarnings || 0),
            totalOrders: Number(data.stats.totalOrders || 0),
            avgEarning: Number(data.stats.avgEarning || 0),
            growthRate: data.stats.growthRate // can be null
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        // if backend returned HTML 401/404 content we still handle gracefully
        if (err.response && err.response.data) {
          // try to read JSON message
          setError(err.response.data.detail || "Failed to load dashboard");
        } else {
          setError("Failed to load dashboard");
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  // Cards values
  const { totalEarnings, totalOrders, avgEarning, growthRate } = stats;

  const formatCurrency = (v) => `₹${Number(v || 0).toLocaleString()}`;
  const formatNumber = (v) => Number(v || 0).toLocaleString();
  const formatGrowth = (g) => (g === null || g === undefined ? "—" : `${Number(g).toFixed(2)}%`);

  return (
    <div className="bg-white rounded-lg p-6 mt-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold">Earnings Dashboard</h3>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Earnings" value={formatCurrency(totalEarnings)} />
        <StatCard title="Avg Earning" value={formatCurrency(avgEarning)} />
        <StatCard title="Total Orders" value={formatNumber(totalOrders)} />
        <StatCard title="Growth Rate" value={formatGrowth(growthRate)} />
      </div>

      {/* Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line chart - earnings */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Earnings Over Time (Line)</h4>
          {graphData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No chart data to display</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(val) => `₹${val}`} />
                <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar chart - orders */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Orders Over Time (Bar)</h4>
          {graphData.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No chart data to display</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#3b82f6" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-lg border">
    <div className="text-sm text-gray-600">{title}</div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

export default EarningsDashboard;
