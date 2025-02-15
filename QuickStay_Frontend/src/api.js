import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/bookings';  // Adjust this if necessary

// API Call to get available rooms
export const getAvailableRooms = async (checkInDate, checkOutDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/available`, {
      params: {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    throw error;
  }
};

