export default function WagonSelector({ wagons, selectedWagon, onSelect }) {
  return (
    <section className="panel">
      <h2>1. Оберіть вагон</h2>
      <div className="wagon-list">
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            type="button"
            className={selectedWagon?.id === wagon.id ? 'wagon active' : 'wagon'}
            onClick={() => onSelect(wagon)}
          >
            <strong>Вагон {wagon.id}</strong>
            <span>{wagon.type}</span>
            <small>{wagon.seats} місць</small>
          </button>
        ))}
      </div>
    </section>
  );
}
