import React from 'react'
import Image from 'next/image'

function Vacancy() {
  return (
    <div className="lg:mx-20 mx-5 px-4 py-10 text-white space-y-6">
      <h2 className="text-[28px] md:text-4xl font-bold">ВАКАНСИИ</h2>
      <h3 className="text-xl md:text-2xl font-semibold">Зарабатывайте с нами!</h3>
      <p className="text-base md:text-lg font-extralight">
        Сеть кафе быстрого питания <strong>ЕРЕВАН</strong> ищет сотрудников-супергероев!
      </p>

      <h3 className="text-xl md:text-2xl font-semibold">Мы предлагаем:</h3>
      <ul className="list-disc list-inside space-y-1 text-base md:text-lg">
        <li>Официальное трудоустройство</li>
        <li>График работы 2/2, 4/2 или 6/1 (возможны другие варианты)</li>
        <li>Ночные и дневные смены (с 9:00 до 21:00 и с 21:00 до 9:00)</li>
        <li>Питание</li>
        <li>Обучение</li>
      </ul>
      <h3 className="text-xl md:text-2xl font-semibold">Что нужно делать:</h3>
      <ul className="list-disc list-inside space-y-1 text-base md:text-lg">
        <li>готовить разные виды шаурмы, хот-доги и пр.</li>
        <li>следить за чистотой своего рабочего места</li>
        <li>контролировать хранение продуктов, сроки годности</li>
        <li>консультировать гостей по блюдам</li>
        <li>работать с кассой</li>
        <li>принимать и отпускать заказы</li>
      </ul>
      <div>
        <p>Опыт работы желателен, но не обязателен!</p>
        <p>Районы работы – Индустриальный, Ленинский, Мотовилихинский, Свердловский</p>
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-semibold">Требуются:</h3>
        <ul>
          <li>ПОВАРА-ШАУРМИСТЫ</li>
          <li>КАССИРЫ</li>
          <li>КУРЬЕРЫ</li>
        </ul>
      </div>
      <p>Чтобы откликнуться, пиши:</p>
      <p>+7 919 480 4100 - Артур</p>
      <p>+7 902 631 8233 - Юлия</p>
      <div className="flex gap-4">
        <Image src="/images/logos_telegram.png" alt="logo" width={35} height={35} />
        <Image src="/images/logos_whatsapp-icon.png" alt="logo" width={35} height={35} />
      </div>
    </div>
  )
}

export default Vacancy
