// app/test-yandex/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function TestYandexPage() {
  const [status, setStatus] = useState<string>('Проверяем...');
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      setStatus('❌ API ключ не найден в .env.local');
      return;
    }

    // Проверяем валидность ключа
    fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=Москва&format=json`)
      .then(res => res.json())
      .then(data => {
        if (data.response) {
          setStatus('✅ API ключ работает!');
          
          // Загружаем карту
          const script = document.createElement('script');
          script.src = `https://api-maps.yandex.ru/2.1/?apikey=${API_KEY}&lang=ru_RU`;
          script.async = true;
          
          script.onload = () => {
            setMapLoaded(true);
            initMap();
          };
          
          script.onerror = () => {
            setStatus('❌ Не удалось загрузить Яндекс Карты');
          };
          
          document.head.appendChild(script);
        } else {
          setStatus('❌ API ключ не работает. Проверьте настройки в кабинете Яндекс');
        }
      })
      .catch(() => {
        setStatus('❌ Ошибка сети или неверный ключ');
      });
  }, []);

  const initMap = () => {
    if (!(window as any).ymaps) return;
    
    (window as any).ymaps.ready(() => {
      const map = new (window as any).ymaps.Map('map', {
        center: [55.7558, 37.6173],
        zoom: 12
      });
      
      new (window as any).ymaps.Placemark([55.7558, 37.6173], {
        balloonContent: 'EL\'RUH Store'
      }).addTo(map);
    });
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Тест Яндекс API</h1>
      
      <div className="mb-8 p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Информация о ключе</h2>
        <div className="space-y-3">
          <div>
            <span className="text-gray-400">Ключ: </span>
            <code className="bg-black p-2 rounded text-sm">
              {API_KEY ? `${API_KEY.slice(0, 8)}...${API_KEY.slice(-8)}` : 'Не найден'}
            </code>
          </div>
          <div>
            <span className="text-gray-400">Статус: </span>
            <span className={`font-bold ${status.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Тест карты</h2>
        <div 
          id="map" 
          className="w-full h-96 rounded-lg bg-gray-800 flex items-center justify-center"
          style={{ minHeight: '400px' }}
        >
          {!mapLoaded ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
              <p className="text-gray-400">Загрузка Яндекс Карт...</p>
            </div>
          ) : (
            <p className="text-gray-400">Карта загружена ✅</p>
          )}
        </div>
      </div>

      <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Что делать если не работает:</h2>
        <ol className="list-decimal pl-6 space-y-3 text-gray-300">
          <li>Убедитесь, что файл называется <code className="bg-black px-2 py-1 rounded">.env.local</code></li>
          <li>Перезапустите сервер: <code className="bg-black px-2 py-1 rounded">npm run dev</code></li>
          <li>Зайдите в <a href="https://developer.tech.yandex.ru/" className="text-gold hover:underline">кабинет Яндекс</a></li>
          <li>Проверьте, что ключ активен и подключены API</li>
          <li>Добавьте <code className="bg-black px-2 py-1 rounded">localhost</code> в список доменов</li>
        </ol>
      </div>
    </div>
  );
}