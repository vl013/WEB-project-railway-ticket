import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookingForm from '../components/BookingForm.jsx';
import SeatMap from '../components/SeatMap.jsx';
import WagonSelector from '../components/WagonSelector.jsx';
import { useBooking } from '../context/BookingContext.jsx';
import { BookingService } from '../services/BookingService.js';
import { TrainService } from '../services/TrainService.js';

export default function Booking() {
  const { trainId } = useParams();
  const [train, setTrain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const {
    selectedWagon,
    setSelectedWagon,
    selectedSeats,
    setSelectedSeats,
    setSelectedTrain,
    clearSelection
  } = useBooking();
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const loadTrain = async () => {
      try {
        const foundTrain = await TrainService.getTrainById(trainId);
        if (!foundTrain) {
          setError('Рейс не знайдено');
          return;
        }

        setTrain(foundTrain);
        setSelectedTrain(foundTrain);
        setSelectedWagon(foundTrain.wagons[0]);
        setSelectedSeats([]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrain();
  }, [trainId, setSelectedTrain, setSelectedWagon, setSelectedSeats]);

  useEffect(() => {
    if (train && selectedWagon) {
      setBookedSeats(BookingService.getBookedSeats(train.id, selectedWagon.id));
    }
  }, [train, selectedWagon]);

  if (isLoading) {
    return <p className="empty">Завантаження сторінки бронювання...</p>;
  }

  if (error || !train) {
    return (
      <section className="panel">
        <h2>{error || 'Рейс не знайдено'}</h2>
        <Link to="/">Повернутися до списку</Link>
      </section>
    );
  }

  const handleSelectWagon = (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
  };

  const handleToggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((item) => item !== seat) : [...prev, seat]
    );
  };

  const handleSubmit = (passenger) => {
    const savedBooking = BookingService.saveBooking({
      trainId: train.id,
      trainNumber: train.number,
      route: `${train.from} → ${train.to}`,
      wagonId: selectedWagon.id,
      wagonType: selectedWagon.type,
      seats: selectedSeats,
      passenger
    });

    setBookedSeats((prev) => [...prev, ...savedBooking.seats]);
    clearSelection();
    setSelectedWagon(train.wagons[0]);
    toast.success('Квиток успішно заброньовано!');
  };

  return (
    <section className="booking-page">
      <Link className="back-link" to="/">← Назад до рейсів</Link>

      <div className="booking-header">
        <div>
          <p className="eyebrow">Потяг № {train.number}</p>
          <h2>{train.from} → {train.to}</h2>
          <p>{train.departureDate}, {train.departureTime} · {train.duration}</p>
        </div>
        <strong>{train.price} грн / місце</strong>
      </div>

      <WagonSelector wagons={train.wagons} selectedWagon={selectedWagon} onSelect={handleSelectWagon} />

      {selectedWagon && (
        <SeatMap
          wagon={selectedWagon}
          bookedSeats={bookedSeats}
          selectedSeats={selectedSeats}
          onToggleSeat={handleToggleSeat}
        />
      )}

      <BookingForm selectedSeats={selectedSeats} onSubmit={handleSubmit} />
    </section>
  );
}
