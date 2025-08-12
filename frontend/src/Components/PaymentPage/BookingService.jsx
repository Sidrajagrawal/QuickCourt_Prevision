import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookingService = {
  createBooking: async (bookingData, token) => {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/v1/bookings/',
      bookingData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },
};
