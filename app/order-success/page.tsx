// app/order-success/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Package, Phone, Mail } from 'lucide-react';

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('elruh-order');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black/50 pt-20">
          <div className="container mx-auto px-4 py-24 text-center">
            <p className="text-gray-400">Загрузка информации о заказе...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/20 rounded-full mb-6">
                <CheckCircle className="text-green-500" size={48} />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4 font-elegant">Заказ оформлен!</h1>
              <p className="text-gray-400 text-lg">
                Номер вашего заказа: <span className="text-gold font-bold">#{order.id}</span>
              </p>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-6">Детали заказа</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-gray-300 mb-3">Информация о клиенте</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-400">
                      <Package size={16} className="mr-3 text-gold" />
                      <span>{order.name}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Phone size={16} className="mr-3 text-gold" />
                      <span>{order.phone}</span>
                    </div>
                    {order.email && (
                      <div className="flex items-center text-gray-400">
                        <Mail size={16} className="mr-3 text-gold" />
                        <span>{order.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-gray-300 mb-3">Доставка и оплата</h3>
                  <div className="space-y-2">
                    <div className="text-gray-400">
                      <span className="text-gold">Доставка:</span> {order.address || 'Самовывоз'}
                    </div>
                    <div className="text-gray-400">
                      <span className="text-gold">Способ оплаты:</span> {order.payment === 'online' ? 'Картой онлайн' : 
                        order.payment === 'cash' ? 'Наличные' : 'Картой курьеру'}
                    </div>
                    <div className="text-gray-400">
                      <span className="text-gold">Итого к оплате:</span> {order.total} ₽
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-gray-300 mb-4">Товары в заказе</h3>
                <div className="space-y-3">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                      <div>
                        <div className="text-white">{item.name} {item.ml}мл</div>
                        <div className="text-gray-400 text-sm">x{item.quantity}</div>
                      </div>
                      <div className="text-gold font-bold">
                        {item.price * item.quantity} ₽
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-black/50 to-gray-900/50 border border-gold/20 rounded-xl p-6 mb-8">
              <h3 className="text-white font-semibold mb-4">Что дальше?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold mr-3">1</div>
                  <div>
                    <h4 className="text-white font-medium">Подтверждение заказа</h4>
                    <p className="text-gray-400 text-sm">В ближайшее время с вами свяжется наш менеджер для подтверждения заказа</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold mr-3">2</div>
                  <div>
                    <h4 className="text-white font-medium">Подготовка к отправке</h4>
                    <p className="text-gray-400 text-sm">Мы соберем ваш заказ и упакуем его в течение 24 часов</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold text-black rounded-full flex items-center justify-center font-bold mr-3">3</div>
                  <div>
                    <h4 className="text-white font-medium">Отправка и отслеживание</h4>
                    <p className="text-gray-400 text-sm">Вы получите номер для отслеживания посылки по SMS и email</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/catalog"
                className="px-8 py-3 bg-black border border-gray-800 text-white rounded-lg hover:border-gold transition-colors text-center"
              >
                Вернуться к покупкам
              </Link>
              <Link
                href="/"
                className="px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors text-center"
              >
                На главную
              </Link>
            </div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>По всем вопросам: +7 (929) 227-13-22</p>
              <p>Работаем ежедневно с 10:00 до 22:00</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}