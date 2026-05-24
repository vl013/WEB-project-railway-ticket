import { useEffect, useMemo, useState } from 'react';
import TrainList from '../components/TrainList.jsx';
import { TrainService } from '../services/TrainService.js';

export default function Home() {
  const [query, setQuery] = useState('');
  const [trains, setTrains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTrains = async () => {
      try {
        const data = await TrainService.getTrains();
        setTrains(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadTrains();
  }, []);

  const filteredTrains = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return trains;

    return trains.filter((train) => {
      const route = `${train.from} ${train.to}`.toLowerCase();
      return route.includes(normalizedQuery) || train.number.toLowerCase().includes(normalizedQuery);
    });
  }, [query, trains]);

  return (
    <section className="home">
      <div className="hero">
        <div>
          <p className="eyebrow">Лабораторні 9–10</p>
          <h2>Пошук і бронювання залізничних рейсів</h2>
          <p>Оберіть потяг, вагон, місця та збережіть бронювання в системі.</p>
        </div>

        <label className="search-box">
          Пошук за маршрутом або номером
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Наприклад: Львів або 749О"
          />
        </label>
      </div>

      {isLoading && <p className="empty">Завантаження рейсів...</p>}
      {error && <p className="error-box">{error}</p>}
      {!isLoading && !error && <TrainList trains={filteredTrains} />}
    </section>
  );
}
