const STORAGE_KEY = 'railway_bookings';

export const BookingService = {
  getBookings() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookings, newBooking]));
    return newBooking;
  },

  getBookedSeats(trainId, wagonId) {
    return this.getBookings()
      .filter((booking) => booking.trainId === trainId && booking.wagonId === wagonId)
      .flatMap((booking) => booking.seats);
  }
};
