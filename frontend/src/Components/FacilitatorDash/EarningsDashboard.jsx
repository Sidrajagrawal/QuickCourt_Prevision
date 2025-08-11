import React, { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, TrendingUp, Users, CheckCircle, AlertCircle, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const EarningsDashboard = ({data}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("7");
  const earningsData = data.earnings[selectedPeriod];

  return (
    <div className="bg-white rounded-lg p-6 mt-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Earnings & Engagement Dashboard</h3>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedPeriod("7")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedPeriod === "7" 
              ? "bg-green-500 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          7 Days
        </button>
        <button
          onClick={() => setSelectedPeriod("30")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedPeriod === "30" 
              ? "bg-green-500 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          30 Days
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-green-800">Total Earnings</h4>
          </div>
          <p className="text-2xl font-bold text-green-600">₹{earningsData.totalEarnings}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-blue-800">Total Orders</h4>
          </div>
          <p className="text-2xl font-bold text-blue-600">{earningsData.totalOrders}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <h4 className="font-medium text-purple-800">Avg Order Value</h4>
          </div>
          <p className="text-2xl font-bold text-purple-600">₹{earningsData.avgOrderValue}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-orange-600" />
            <h4 className="font-medium text-orange-800">Growth Rate</h4>
          </div>
          <p className="text-2xl font-bold text-orange-600">+{earningsData.growthRate}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-gray-800">Earnings Trend</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={earningsData.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 text-gray-800">Orders & Bookings</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={earningsData.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
              <Bar dataKey="bookings" fill="#8b5cf6" name="Bookings" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Data Table */}
      <div className="space-y-2">
        <h4 className="font-medium mb-3">Detailed Performance</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 rounded-tl">Period</th>
                <th className="text-right p-3">Orders</th>
                <th className="text-right p-3">Bookings</th>
                <th className="text-right p-3 rounded-tr">Earnings</th>
              </tr>
            </thead>
            <tbody>
              {earningsData.data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{item.date}</td>
                  <td className="p-3 text-right text-blue-600">{item.orders}</td>
                  <td className="p-3 text-right text-purple-600">{item.bookings}</td>
                  <td className="p-3 text-right font-semibold text-green-600">₹{item.earnings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



export default EarningsDashboard
