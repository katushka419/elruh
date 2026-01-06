'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Truck, Package, CreditCard, Shield, Clock } from 'lucide-react';

export default function DeliveryPaymentPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white mb-8 font-elegant text-center">
            Доставка и оплата
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Доставка */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Truck className="mr-3 text-gold" size={28} />
                Доставка
              </h2>
              
              <div className="space-y-6">
                <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">🚗 Курьерская доставка</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Доставка по Москве: 1-2 дня</li>
                    <li>• Доставка по России: 2-5 дней</li>
                    <li>• Бесплатно при заказе от 5 000₽</li>
                    <li>• Стоимость: 300-500₽ в зависимости от региона</li>
                  </ul>
                </div>

                <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">📦 Пункты выдачи</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• СДЭК - 350₽</li>
                    <li>• Яндекс Доставка - 300₽</li>
                    <li>• Boxberry - 350₽</li>
                    <li>• Самовывоз из Москвы - бесплатно</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-black/50 to-gray-900/50 border border-gold/20 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Clock className="mr-2 text-gold" />
                    Сроки доставки
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border border-gray-800 rounded-lg">
                      <div className="text-gold font-bold text-lg">1-2 дня</div>
                      <div className="text-gray-300 text-sm">Москва</div>
                    </div>
                    <div className="text-center p-3 border border-gray-800 rounded-lg">
                      <div className="text-gold font-bold text-lg">2-5 дней</div>
                      <div className="text-gray-300 text-sm">Россия</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Оплата */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <CreditCard className="mr-3 text-gold" size={28} />
                Способы оплаты
              </h2>
              
              <div className="space-y-6">
                <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">💳 Онлайн оплата</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {['Visa', 'Mastercard', 'МИР'].map((card) => (
                      <div key={card} className="px-4 py-2 bg-gray-900 rounded-lg">
                        {card}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300">
                    Безопасная оплата картой через защищенное соединение. 
                    Данные карт не хранятся на нашем сервере.
                  </p>
                </div>

                <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">💰 При получении</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Наличными курьеру</li>
                    <li>• Картой курьеру (терминал)</li>
                    <li>• Только для доставки по Москве</li>
                  </ul>
                </div>

                <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                    <Shield className="mr-2 text-gold" />
                    Гарантии безопасности
                  </h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• SSL-шифрование всех платежей</li>
                    <li>• Соответствие стандарту PCI DSS</li>
                    <li>• Защита от мошенничества</li>
                    <li>• Возврат в течение 14 дней</li>
                  </ul>
                </div>

                <div className="bg-black/50 border border-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-white mb-3">📱 Для юр. лиц</h3>
                  <p className="text-gray-300">
                    Работаем по безналичному расчету с НДС. 
                    Отправляем закрывающие документы. 
                    Свяжитесь с нами для оформления договора.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Карта зон доставки */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Зоны доставки</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { zone: 'Москва', price: '300₽', free: 'от 5 000₽', time: '1-2 дня' },
                { zone: 'МО до 20км', price: '400₽', free: 'от 8 000₽', time: '1-2 дня' },
                { zone: 'Россия', price: '500₽', free: 'от 10 000₽', time: '3-5 дней' },
                { zone: 'Самовывоз', price: '0₽', free: 'всегда', time: 'сегодня' },
              ].map((item, index) => (
                <div key={index} className="bg-black/50 border border-gray-800 p-6 rounded-xl text-center">
                  <div className="text-gold text-xl font-bold mb-2">{item.zone}</div>
                  <div className="text-white text-lg mb-1">{item.price}</div>
                  <div className="text-gray-400 text-sm mb-2">Бесплатно {item.free}</div>
                  <div className="text-gray-300">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}