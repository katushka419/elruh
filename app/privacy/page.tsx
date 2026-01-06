'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8 font-elegant">
            Политика конфиденциальности
          </h1>
          
          <div className="bg-black/50 border border-gray-800 rounded-xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Общие положения</h2>
              <p className="text-gray-300 leading-relaxed">
                Настоящая политика конфиденциальности регулирует порядок обработки и защиты 
                персональных данных пользователей интернет-магазина EL'RUH.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Собираемые данные</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Фамилия, имя, отчество</li>
                <li>Контактный телефон и email</li>
                <li>Адрес доставки</li>
                <li>Данные о заказах</li>
                <li>Технические данные (IP, cookie, данные браузера)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Цели обработки данных</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Оформление и доставка заказов</li>
                <li>Обработка платежей</li>
                <li>Информирование о статусе заказа</li>
                <li>Отправка рекламных материалов (с согласия)</li>
                <li>Улучшение качества обслуживания</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Защита данных</h2>
              <p className="text-gray-300 leading-relaxed">
                Мы принимаем все необходимые меры для защиты ваших персональных данных 
                от несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Передача данных третьим лицам</h2>
              <p className="text-gray-300 leading-relaxed">
                Ваши данные могут передаваться службам доставки (Яндекс Доставка, СДЭК) 
                и платежным системам исключительно для целей выполнения заказа.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Ваши права</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Право на доступ к своим данным</li>
                <li>Право на исправление данных</li>
                <li>Право на удаление данных</li>
                <li>Право на отзыв согласия</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Контакты</h2>
              <p className="text-gray-300 leading-relaxed">
                По вопросам обработки персональных данных обращайтесь:
                <br />
                Email: privacy@elruh.com
                <br />
                Телефон: +7 (999) 123-45-67
              </p>
            </section>

            <div className="pt-6 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                Дата вступления в силу: 01.01.2024
                <br />
                Последнее обновление: 01.01.2024
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}