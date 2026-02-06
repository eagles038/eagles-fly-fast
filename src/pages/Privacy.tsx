import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PrivacySEO } from '@/components/SEO';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <PrivacySEO />
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-black mb-8">
              Политика конфиденциальности
            </h1>

            <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  1. Общие положения
                </h2>
                <p>
                  Настоящая Политика конфиденциальности определяет порядок обработки 
                  и защиты персональных данных пользователей сайта Eagles Food 
                  (далее — «Сайт»).
                </p>
                <p>
                  Используя Сайт, вы соглашаетесь с условиями данной Политики 
                  конфиденциальности. Если вы не согласны с условиями, пожалуйста, 
                  не используйте Сайт.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  2. Какие данные мы собираем
                </h2>
                <p>Мы можем собирать следующие персональные данные:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Имя и фамилия</li>
                  <li>Номер телефона</li>
                  <li>Адрес электронной почты</li>
                  <li>Адрес доставки</li>
                  <li>История заказов</li>
                  <li>Данные об использовании сайта (cookies, IP-адрес)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  3. Цели сбора данных
                </h2>
                <p>Мы используем ваши персональные данные для:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Обработки и доставки заказов</li>
                  <li>Связи с вами по вопросам заказа</li>
                  <li>Отправки информации об акциях и специальных предложениях (с вашего согласия)</li>
                  <li>Улучшения качества обслуживания</li>
                  <li>Аналитики и статистики использования сайта</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  4. Использование файлов cookie
                </h2>
                <p>
                  Сайт использует файлы cookie для улучшения пользовательского опыта. 
                  Cookie — это небольшие текстовые файлы, которые сохраняются на вашем 
                  устройстве при посещении сайта.
                </p>
                <p>Мы используем следующие типы cookie:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Необходимые cookie</strong> — обеспечивают работу основных 
                    функций сайта (корзина, авторизация)
                  </li>
                  <li>
                    <strong>Аналитические cookie</strong> — помогают понять, как 
                    пользователи взаимодействуют с сайтом
                  </li>
                  <li>
                    <strong>Маркетинговые cookie</strong> — используются для показа 
                    релевантной рекламы
                  </li>
                </ul>
                <p>
                  Вы можете отключить cookie в настройках браузера, однако это может 
                  повлиять на функциональность сайта.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  5. Защита данных
                </h2>
                <p>
                  Мы принимаем все необходимые технические и организационные меры 
                  для защиты ваших персональных данных от несанкционированного 
                  доступа, изменения, раскрытия или уничтожения.
                </p>
                <p>
                  Доступ к персональным данным имеют только уполномоченные сотрудники, 
                  которые обязаны соблюдать конфиденциальность.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  6. Передача данных третьим лицам
                </h2>
                <p>
                  Мы не продаём и не передаём ваши персональные данные третьим лицам, 
                  за исключением следующих случаев:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Службы доставки — для выполнения заказа</li>
                  <li>Платёжные системы — для обработки оплаты</li>
                  <li>По требованию законодательства</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  7. Ваши права
                </h2>
                <p>Вы имеете право:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Запросить информацию о хранящихся данных</li>
                  <li>Потребовать исправления неточных данных</li>
                  <li>Потребовать удаления ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                  <li>Отказаться от получения маркетинговых рассылок</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  8. Контактная информация
                </h2>
                <p>
                  По всем вопросам, связанным с обработкой персональных данных, 
                  вы можете обратиться к нам:
                </p>
                <ul className="list-none space-y-2">
                  <li>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:privacy@eaglesfood.ru" className="text-primary hover:underline">
                      privacy@eaglesfood.ru
                    </a>
                  </li>
                  <li>
                    <strong>Телефон:</strong>{' '}
                    <a href="tel:+78001234567" className="text-primary hover:underline">
                      8 (800) 123-45-67
                    </a>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  9. Изменения политики
                </h2>
                <p>
                  Мы оставляем за собой право вносить изменения в данную Политику 
                  конфиденциальности. Актуальная версия всегда доступна на этой странице.
                </p>
                <p className="text-sm">
                  Последнее обновление: {new Date().toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
