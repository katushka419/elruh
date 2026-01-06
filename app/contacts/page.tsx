// app/contacts/page.tsx
'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronLeft, Phone, Mail, MapPin, Clock, Instagram, MessageCircle, PhoneCall, Send } from 'lucide-react';

export default function ContactsPage() {
  const socialLinks = [
    { icon: <Instagram size={24} />, href: 'https://instagram.com', label: 'Instagram', color: 'hover:border-pink-500 hover:text-pink-500' },
    { icon: <MessageCircle size={24} />, href: 'https://wa.me/79292271322', label: 'WhatsApp', color: 'hover:border-green-500 hover:text-green-500' },
    { icon: <PhoneCall size={24} />, href: 'tel:+79292271322', label: 'Позвонить', color: 'hover:border-blue-500 hover:text-blue-500' },
    { icon: <Mail size={24} />, href: 'mailto:xac0550@gmail.com', label: 'Email', color: 'hover:border-red-500 hover:text-red-500' },
    { icon: <Send size={24} />, href: 'https://t.me/+79292271322', label: 'Telegram', color: 'hover:border-blue-400 hover:text-blue-400' }
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Хлебные крошки */}
          <div className="mb-8">
            <Link href="/" className="text-gray-400 hover:text-gold flex items-center">
              <ChevronLeft size={18} className="mr-2" />
              На главную
            </Link>
          </div>

          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Контакты</h1>
            <p className="text-gray-300 text-xl">Свяжитесь с нами любым удобным способом</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-8">Контактная информация</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <Phone className="text-[#FFD700] mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Телефон</h3>
                      <a href="tel:+79292271322" className="text-gray-300 hover:text-[#FFD700] text-lg block mb-1">
                        +7 (929) 227-13-22
                      </a>
                      <p className="text-gray-500 text-sm">Звонок по России бесплатный</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="text-[#FFD700] mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Электронная почта</h3>
                      <a href="mailto:xac0550@gmail.com" className="text-gray-300 hover:text-[#FFD700] text-lg block">
                        xac0550@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="text-[#FFD700] mt=1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Адрес</h3>
                      <p className="text-gray-300 text-lg">г. Москва, Проспект Мира, 122</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Ближайшие станции метро: «Проспект Мира», «Рижская»
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="text-[#FFD700] mt=1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Время работы</h3>
                      <div className="space-y-1">
                        <p className="text-gray-300">Понедельник — Пятница: 10:00 — 20:00</p>
                        <p className="text-gray-300">Суббота: 11:00 — 18:00</p>
                        <p className="text-gray-300">Воскресенье: 12:00 — 16:00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Соцсети */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-8">Мы в соцсетях</h2>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-3 p-4 border border-gray-800 text-gray-300 ${social.color} transition-all duration-300 min-w-[200px]`}
                    >
                      <div>{social.icon}</div>
                      <span className="font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Карта */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Мы на карте</h2>
              <div className="border border-gray-800 overflow-hidden mb-8">
                <div className="h-96 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-[#FFD700] mx-auto mb-4" />
                    <p className="text-white font-bold text-xl">Проспект Мира, 122</p>
                    <p className="text-gray-400 text-lg mt-2">Москва, Россия</p>
                  </div>
                  
                  <a
                    href="https://yandex.ru/maps/?text=Проспект Мира 122 Москва"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-[#FFD700] text-black px-4 py-2 text-sm font-semibold hover:bg-[#E6C200] transition-colors"
                  >
                    Открыть в Яндекс.Картах
                  </a>
                </div>
                
                <div className="bg-gray-900 p-4 border-t border-gray-800">
                  <p className="text-gray-300 text-sm">
                    Нажмите кнопку выше, чтобы открыть точное местоположение в Яндекс.Картах
                  </p>
                </div>
              </div>

              {/* Форма */}
              <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 p-8">
                <h3 className="text-xl font-bold text-white mb-6">Обратная связь</h3>
                <form className="space-y-6">
                  <input type="text" placeholder="Ваше имя" className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:border-[#FFD700] focus:outline-none" />
                  <input type="text" placeholder="Телефон или Email" className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:border-[#FFD700] focus:outline-none" />
                  <textarea placeholder="Сообщение" rows={4} className="w-full bg-black border border-gray-800 text-white px-4 py-3 focus:border-[#FFD700] focus:outline-none resize-none" />
                  <button type="submit" className="w-full py-4 bg-[#FFD700] text-black font-semibold hover:bg-[#E6C200] transition-colors">
                    Отправить сообщение
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}