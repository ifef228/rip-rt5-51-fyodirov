import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Подключаем Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Подключаем кастомную тему Яндекс Маркет
import './styles/yandex-theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
