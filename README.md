# Railway Ticket Booking

React/Vite проєкт для лабораторних робіт 9–10: модель системи продажу та бронювання залізничних квитків.

## Можливості
- список потягів у вигляді карток;
- пошук за маршрутом або номером потяга;
- сторінка бронювання `/booking/:trainId`;
- вибір вагона;
- інтерактивна схема місць;
- вибір кількох місць;
- форма з валідацією імені, телефону та email;
- збереження бронювань у `localStorage`;
- повідомлення про успішне бронювання через `react-toastify`.

## Запуск
```bash
npm install
npm run dev
```

## Основна структура
```text
src/
├── components/
├── context/
├── data/
├── pages/
├── services/
├── App.jsx
├── main.jsx
└── styles.css
```
## Live Demo

https://твій-vercel-url.vercel.app