import React from 'react'

function Payment() {
  return (
    <div className='lg:mx-20 mx-5 px-4 py-16 text-white space-y-6'>
        <h1 className='text-3xl md:text-4xl font-bold'>ОПЛАТА И ДОСТАВКА</h1>
        <h2 className='text-xl md:text-2xl font-semibold'>Доставка</h2>
        <div>
        <p>Минимальная сумма заказа 1000 рублей</p>
        <p>Стоимость доставки 100 рублей</p>
        </div>
        <p>Самовывоз из г. Пермь <br />По адресам — ул. Мира, 30, ул. Куйбышева, 38, ул. Екатерининская, 30, ул. Ким, 69.<br />Круглосуточно</p>
        <h2 className='text-xl md:text-2xl font-semibold'>Оплата</h2>
        <div>
        <p>Оплата банковской картой или при получении</p>
        <p>Для оплаты заказа банковской картой перейдите на этап оформления и оплаты заказа.</p>
        </div>
    </div>
  )
}

export default Payment