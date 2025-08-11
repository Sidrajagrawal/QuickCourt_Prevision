import React, { useState } from "react";
import { Calendar, Clock, DollarSign, FileText, TrendingUp, Users, CheckCircle, AlertCircle } from "lucide-react";
const ActiveOrders = ({data}) => {
  const orders = data.activeOrders;

  return (
    <div className="bg-white rounded-lg p-6 mt-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-orange-600" />
        <h3 className="text-lg font-semibold">Active Orders</h3>
      </div>
      
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{order.orderNumber}</h4>
                <p className="text-sm text-gray-600">Customer: {order.customer}</p>
                <p className="text-sm text-gray-600">Venue: {order.venue}</p>
                <p className="text-sm text-gray-600">Date: {order.date}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  {order.status === "Confirmed" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    order.status === "Confirmed" ? "text-green-600" : "text-yellow-600"
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="font-semibold">₹{order.amount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveOrders;
