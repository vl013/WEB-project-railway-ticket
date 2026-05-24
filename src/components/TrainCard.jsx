import { Link } from 'react-router-dom';

export default function TrainCard({ train }) {
  return (
    <article className="train-card">
      <div className="train-card__top">
        <span className="badge">Потяг № {train.number}</span>
        <strong>{train.price} грн</strong>
      </div>

      <h2>{train.from} → {train.to}</h2>

      <div className="train-info">
        <p><span>Дата:</span> {train.departureDate}</p>
        <p><span>Відправлення:</span> {train.departureTime}</p>
        <p><span>Тривалість:</span> {train.duration}</p>
        <p><span>Вагонів:</span> {train.wagons.length}</p>
      </div>

      <Link className="primary-link" to={`/booking/${train.id}`}>
        Обрати місця
      </Link>
    </article>
  );
}
