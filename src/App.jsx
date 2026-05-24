import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Booking from './pages/Booking.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">React Railway Station</p>
          <h1>Система бронювання залізничних квитків</h1>
        </div>
        <nav>
          <NavLink to="/">Рейси</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:trainId" element={<Booking />} />
        </Routes>
      </main>
    </div>
  );
}
