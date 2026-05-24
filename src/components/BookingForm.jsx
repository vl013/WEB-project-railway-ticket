import { useState } from 'react';

const initialForm = {
  name: '',
  phone: '',
  email: ''
};

export default function BookingForm({ selectedSeats, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (form.name.trim().length < 2) newErrors.name = 'Введіть ім’я мінімум з 2 символів';
    if (!/^\+?\d{10,13}$/.test(form.phone.replaceAll(' ', ''))) newErrors.phone = 'Введіть коректний телефон';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Введіть коректний email';
    if (selectedSeats.length === 0) newErrors.seats = 'Оберіть хоча б одне місце';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <section className="panel">
      <h2>3. Дані пасажира</h2>

      {errors.seats && <p className="error">{errors.seats}</p>}

      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <label>
          Ім’я
          <input name="name" value={form.name} onChange={handleChange} placeholder="Наприклад: Владислав" />
          {errors.name && <small>{errors.name}</small>}
        </label>

        <label>
          Телефон
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="+380XXXXXXXXX" />
          {errors.phone && <small>{errors.phone}</small>}
        </label>

        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} placeholder="name@gmail.com" />
          {errors.email && <small>{errors.email}</small>}
        </label>

        <button className="primary-button" type="submit">
          Забронювати {selectedSeats.length > 0 ? `місця: ${selectedSeats.join(', ')}` : 'квиток'}
        </button>
      </form>
    </section>
  );
}
