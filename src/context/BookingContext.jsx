import { createContext, useContext, useMemo, useState } from 'react';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const clearSelection = () => {
    setSelectedWagon(null);
    setSelectedSeats([]);
  };

  const value = useMemo(
    () => ({
      selectedTrain,
      setSelectedTrain,
      selectedWagon,
      setSelectedWagon,
      selectedSeats,
      setSelectedSeats,
      clearSelection
    }),
    [selectedTrain, selectedWagon, selectedSeats]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used inside BookingProvider');
  }
  return context;
}
