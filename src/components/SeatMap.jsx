export default function SeatMap({ wagon, bookedSeats, selectedSeats, onToggleSeat }) {
  const seats = Array.from({ length: wagon.seats }, (_, index) => index + 1);

  return (
    <section className="panel">
      <h2>2. Оберіть місця у вагоні</h2>

      <div className="legend">
        <span><i className="free"></i> Вільні</span>
        <span><i className="selected"></i> Обрані</span>
        <span><i className="booked"></i> Заброньовані</span>
      </div>

      <div className="seat-map">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);
          const className = isBooked ? 'seat booked' : isSelected ? 'seat selected' : 'seat free';

          return (
            <button
              key={seat}
              type="button"
              className={className}
              disabled={isBooked}
              onClick={() => onToggleSeat(seat)}
              title={isBooked ? 'Місце вже заброньоване' : 'Натисніть для вибору'}
            >
              {seat}
            </button>
          );
        })}
      </div>
    </section>
  );
}
