// app/cart/page.tsx - ОБНОВЛЕННЫЙ КОД
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Trash2, Plus, Minus, Truck, Package, MapPin, CreditCard, Wallet } from 'lucide-react';
import { cart, CartItem } from '@/lib/cart';
import AddressPicker from '@/components/AddressPicker';
import CheckoutForm from '@/components/CheckoutForm';

const deliveryOptions = [
  { id: 'yandex', name: 'Яндекс Доставка', price: 300, time: '1-2 дня', icon: '🚗', minFree: 5000 },
  { id: 'cdek', name: 'СДЭК', price: 350, time: '2-3 дня', icon: '📦', minFree: 5000 },
  { id: 'pickup', name: 'Самовывоз', price: 0, time: 'Сегодня', icon: '🏢', minFree: 0 },
];

const paymentMethods = [
  { id: 'online', name: 'Онлайн оплата', icon: <CreditCard size={20} /> },
  { id: 'cash', name: 'Наличные', icon: <Wallet size={20} /> },
  { id: 'card_courier', name: 'Картой курьеру', icon: <CreditCard size={20} /> },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState('yandex');
  const [selectedPayment, setSelectedPayment] = useState('online');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAddressPicker, setShowAddressPicker] = useState(false);

  useEffect(() => {
    cart.loadFromStorage();
    const unsubscribe = cart.subscribe(() => {
      setItems(cart.getItems());
    });
    setItems(cart.getItems());
    return unsubscribe;
  }, []);

  const updateQuantity = (id: number, ml: number, quantity: number) => {
    cart.updateQuantity(id, ml, quantity);
  };

  const removeItem = (id: number, ml: number) => {
    cart.removeItem(id, ml);
  };

  const clearCart = () => {
    cart.clearCart();
  };

  const subtotal = cart.getTotal();
  const deliveryOption = deliveryOptions.find(d => d.id === selectedDelivery);
  const deliveryPrice = subtotal >= deliveryOption!.minFree ? 0 : deliveryOption!.price;
  const total = subtotal + deliveryPrice;

  const handleAddressSelect = (fullAddress: string) => {
    setAddress(fullAddress);
    setShowAddressPicker(false);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = async () => {
    const order = {
      id: Date.now().toString(),
      items,
      delivery: selectedDelivery,
      payment: selectedPayment,
      address,
      phone,
      name,
      email,
      comments,
      subtotal,
      deliveryPrice,
      total,
      date: new Date().toISOString(),
      status: 'pending',
    };
    
    // Сохраняем заказ
    localStorage.setItem('elruh-order', JSON.stringify(order));
    
    // Если онлайн оплата - перенаправляем на платежную систему
    if (selectedPayment === 'online') {
      // Здесь будет интеграция с ЮKassa, CloudPayments и т.д.
      // window.location.href = 'https://payment-gateway.com/...';
      
      // Временно показываем симуляцию
      alert('Перенаправление на страницу оплаты...');
      // После успешной оплаты:
      sendToTelegram(order);
      cart.clearCart();
      window.location.href = '/order-success';
    } else {
      // Для наличных/картой курьеру
      sendToTelegram(order);
      cart.clearCart();
      window.location.href = '/order-success';
    }
  };

  const sendToTelegram = (order: any) => {
    const message = `📦 НОВЫЙ ЗАКАЗ #${order.id}\n\n👤 ${order.name}\n📱 ${order.phone}\n📧 ${order.email}\n📍 ${order.address || 'Самовывоз'}\n🚚 ${deliveryOptions.find(d => d.id === order.delivery)?.name}\n💳 ${paymentMethods.find(p => p.id === order.payment)?.name}\n\nТовары:\n${order.items.map((item: CartItem) => `• ${item.name} ${item.ml}мл x${item.quantity} - ${item.price * item.quantity}₽`).join('\n')}\n\n📝 Комментарий: ${order.comments || 'нет'}\n\n💰 Сумма: ${order.subtotal}₽\n🚚 Доставка: ${order.deliveryPrice}₽\n💵 Итого: ${order.total}₽`;
    
    const token = 'ВАШ_TELEGRAM_BOT_TOKEN';
    const chatId = 'ВАШ_CHAT_ID';
    
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });
  };

  if (items.length === 0 && !showCheckout) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black/50 pt-20">
          <div className="container mx-auto px-4 py-24 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">🛍️</div>
              <h1 className="text-3xl font-bold text-white mb-4 font-elegant">Корзина пуста</h1>
              <p className="text-gray-400 mb-8">Добавьте товары из каталога, чтобы сделать заказ</p>
              <Link
                href="/catalog"
                className="inline-block px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (showCheckout) {
    return <CheckoutForm 
      items={items}
      subtotal={subtotal}
      deliveryOption={deliveryOption!}
      deliveryPrice={deliveryPrice}
      total={total}
      selectedPayment={selectedPayment}
      setSelectedPayment={setSelectedPayment}
      name={name}
      setName={setName}
      phone={phone}
      setPhone={setPhone}
      email={email}
      setEmail={setEmail}
      comments={comments}
      setComments={setComments}
      onPayment={handlePayment}
      onBack={() => setShowCheckout(false)}
    />;
  }

  return (
    <>
      <Navbar />
      
      {showAddressPicker && (
        <AddressPicker 
          onSelect={handleAddressSelect}
          onClose={() => setShowAddressPicker(false)}
        />
      )}
      
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link href="/catalog" className="text-gray-400 hover:text-gold flex items-center">
              <ChevronLeft size={18} className="mr-2" />
              Вернуться к покупкам
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-white mb-8 font-elegant">Корзина</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Товары */}
            <div className="lg:col-span-2">
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Товары в корзине ({items.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-gray-400 hover:text-red-500 text-sm flex items-center"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Очистить корзину
                  </button>
                </div>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.ml}`} className="flex items-center border-b border-gray-800 pb-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden mr-4">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${item.image})` }}
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-gray-400 text-sm">{item.ml} мл • {item.notes.join(', ')}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.ml, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-700 rounded flex items-center justify-center hover:border-gold"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-white w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.ml, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-700 rounded flex items-center justify-center hover:border-gold"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xl font-bold text-gold">{item.price * item.quantity} ₽</div>
                            <button
                              onClick={() => removeItem(item.id, item.ml)}
                              className="text-gray-400 hover:text-red-500 text-sm mt-1"
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Доставка */}
              <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Способ доставки</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {deliveryOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setSelectedDelivery(option.id)}
                      className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        selectedDelivery === option.id
                          ? 'border-gold bg-gold/10'
                          : 'border-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl">{option.icon}</div>
                        <div className="text-gold font-bold">
                          {subtotal >= option.minFree || option.price === 0 
                            ? 'Бесплатно' 
                            : `${option.price} ₽`}
                        </div>
                      </div>
                      <h3 className="text-white font-semibold mb-1">{option.name}</h3>
                      <p className="text-gray-400 text-sm">{option.time}</p>
                      {option.minFree > 0 && subtotal < option.minFree && (
                        <p className="text-gold text-xs mt-2">
                          Еще {option.minFree - subtotal}₽ для бесплатной доставки
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {selectedDelivery !== 'pickup' && (
                  <div className="mt-6">
                    <label className="block text-gray-300 mb-2">Адрес доставки</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Введите ваш адрес"
                        className="flex-grow bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                      />
                      <button
                        onClick={() => setShowAddressPicker(true)}
                        className="px-4 bg-black border border-gray-800 text-gray-300 rounded-lg hover:border-gold hover:text-gold flex items-center"
                      >
                        <MapPin size={18} className="mr-2" />
                        На карте
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Итого и оформление */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-black/50 border border-gray-800 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Итого</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Товары</span>
                      <span className="text-white">{subtotal} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Доставка</span>
                      <span className="text-white">
                        {subtotal >= deliveryOption!.minFree || deliveryPrice === 0 
                          ? 'Бесплатно' 
                          : `${deliveryPrice} ₽`}
                      </span>
                    </div>
                    <div className="border-t border-gray-800 pt-4">
                      <div className="flex justify-between">
                        <span className="text-xl font-bold text-white">К оплате</span>
                        <span className="text-2xl font-bold text-gold">{total} ₽</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-gray-300 mb-2">Имя *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ваше имя"
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Телефон *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="w-full bg-black border border-gray-800 text-white px-4 py-3 rounded-lg focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={!name || !phone || (selectedDelivery !== 'pickup' && !address)}
                    className="w-full py-4 bg-gold text-black font-bold rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Перейти к оплате
                  </button>

                  <p className="text-gray-400 text-sm text-center mt-4">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </div>

                <div className="bg-black/50 border border-gray-800 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Условия доставки</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <Truck size={16} className="mr-3 text-gold" />
                      <span>Бесплатно при заказе от 5 000₽</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <Package size={16} className="mr-3 text-gold" />
                      <span>Отправка в день заказа до 18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}