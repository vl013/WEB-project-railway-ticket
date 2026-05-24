import TrainCard from './TrainCard.jsx';

export default function TrainList({ trains }) {
  if (trains.length === 0) {
    return <p className="empty">Рейсів за вашим запитом не знайдено.</p>;
  }

  return (
    <section className="train-list">
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </section>
  );
}
