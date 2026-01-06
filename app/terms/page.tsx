'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/50 pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-white mb-8 font-elegant">
            Публичная оферта
          </h1>
          
          <div className="bg-black/50 border border-gray-800 rounded-xl p-8 space-y-6">
            <div className="text-center mb-8">
              <p className="text-gray-300">
                Настоящий документ является официальным предложением 
                интернет-магазина EL'RUH заключить договор купли-продажи товаров.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Определения</h2>
              <ul className="space-y-2 text-gray-300">
                <li><strong>Продавец</strong> - EL'RUH</li>
                <li><strong>Покупатель</strong> - физическое лицо, разместившее заказ</li>
                <li><strong>Товар</strong> - парфюмерная продукция, представленная на сайте</li>
                <li><strong>Заказ</strong> - оформленный запрос на покупку товара</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Предмет договора</h2>
              <p className="text-gray-300 leading-relaxed">
                Продавец обязуется передать Товар Покупателю, а Покупатель обязуется 
                принять и оплатить Товар на условиях настоящей оферты.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Оформление заказа</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Заказ оформляется через сайт elruh.com</li>
                <li>Покупатель заполняет все необходимые поля формы</li>
                <li>После оформления заказа направляется подтверждение</li>
                <li>Продавец оставляет за собой право отклонить заказ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Цены и оплата</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Цены указаны в российских рублях</li>
                <li>Оплата осуществляется способами, указанными на сайте</li>
                <li>Цены могут быть изменены без предварительного уведомления</li>
                <li>Заказ считается оплаченным после поступления денег</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Доставка</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Сроки доставки указаны на сайте</li>
                <li>Доставка осуществляется по территории РФ</li>
                <li>Риск случайной гибели переходит к Покупателю при получении</li>
                <li>Покупатель проверяет товар при получении</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Возврат и обмен</h2>
              <p className="text-gray-300 leading-relaxed">
                Возврат товара надлежащего качества возможен в течение 14 дней 
                с момента получения, если товар не был в употреблении.
                <br /><br />
                Возврат товара ненадлежащего качества осуществляется в соответствии 
                с Законом РФ "О защите прав потребителей".
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Ответственность</h2>
              <p className="text-gray-300 leading-relaxed">
                Продавец не несет ответственности за убытки Покупателя, 
                возникшие в результате использования товара.
                <br /><br />
                Споры решаются путем переговоров, при невозможности - в судебном порядке.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Контактная информация</h2>
              <div className="text-gray-300 space-y-2">
                <p><strong>Интернет-магазин:</strong> EL'RUH</p>
                <p><strong>Сайт:</strong> elruh.com</p>
                <p><strong>Email:</strong> info@elruh.com</p>
                <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
              </div>
            </section>

            <div className="pt-6 border-t border-gray-800 text-center">
              <p className="text-gold font-semibold">
                Нажимая кнопку "Оформить заказ", Покупатель подтверждает 
                согласие со всеми условиями настоящей оферты.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}