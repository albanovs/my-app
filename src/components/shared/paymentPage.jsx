'use client'

import React, { useState, useEffect } from 'react';

export default function OrderForm() {
    const [deliveryMethod, setDeliveryMethod] = useState('pickup');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [selectedAddress, setSelectedAddress] = useState('ул. Мира, 30');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Считаем общую сумму с учетом специй, преобразуя строки в числа
    const total = cartItems.reduce((acc, item) => {
        const itemPrice = Number(item.price);
        const spicesPrice = item.spices?.reduce((sum, spice) => sum + Number(spice.price), 0) || 0;
        return acc + (itemPrice + spicesPrice) * item.quantity;
    }, 0);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Заказ отправлен! Спасибо :)');
    };

    return (
        <form onSubmit={handleSubmit} className="text-white mt-10 mb-20">
            <div className="w-full flex flex-col lg:flex-row gap-6">
                <div className="bg-[#2B445D] p-6 rounded-md flex-1">
                    <h2 className="text-xl font-semibold mb-4">Детали заказа</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Ваше имя*"
                            required
                            className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                        />
                        <input
                            type="tel"
                            placeholder="Номер телефона*"
                            required
                            className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="E-mail*"
                            required
                            className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                        />
                    </div>

                    <h3 className="text-xl font-semibold mt-8 mb-4">Детали доставки</h3>

                    <div className="flex gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setDeliveryMethod('pickup')}
                            className={`px-4 py-1 rounded-lg border border-yellow-400 ${deliveryMethod === 'pickup' ? 'bg-yellow-400 text-black' : 'text-white'
                                }`}
                        >
                            Самовывоз
                        </button>
                        <button
                            type="button"
                            onClick={() => setDeliveryMethod('delivery')}
                            className={`px-4 py-1 rounded-lg border border-yellow-400 ${deliveryMethod === 'delivery' ? 'bg-yellow-400 text-black' : 'text-white'
                                }`}
                        >
                            Доставка
                        </button>
                    </div>

                    {deliveryMethod === 'delivery' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Город*"
                                required
                                className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Улица*"
                                required
                                className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Дом*"
                                required
                                className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Квартира*"
                                required
                                className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Время доставки*"
                                required
                                className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                            />
                            <textarea
                                placeholder="Комментарий курьеру"
                                className="w-full p-3 rounded-md bg-transparent border border-gray-500 focus:outline-none"
                            />
                        </div>
                    )}

                    {deliveryMethod === 'pickup' && (
                        <div className="mt-4 space-y-2">
                            {['ул. Мира, 30', 'ул. Куйбышева, 38', 'ул. Екатерининская, 30', 'ул. Ким, 69'].map((addr) => (
                                <label key={addr} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="pickup-address"
                                        value={addr}
                                        checked={selectedAddress === addr}
                                        onChange={() => setSelectedAddress(addr)}
                                        className="accent-red-500"
                                    />
                                    <span>{addr}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-[#2B445D] p-6 rounded-md lg:w-[50%]">
                    <h2 className="text-xl font-semibold mb-4">Ваш заказ</h2>

                    <div className="flex justify-between pb-2 border-b border-gray-600 mb-2 text-sm text-gray-300">
                        <span className="font-medium">Название</span>
                        <span className="font-medium">Цена</span>
                    </div>

                    <div className="flex flex-col gap-2 max-h-60 overflow-auto">
                        {cartItems.length === 0 ? (
                            <p className="text-gray-400">Корзина пуста</p>
                        ) : (
                            cartItems.map((item) => {
                                const spicesPrice = item.spices?.reduce((sum, spice) => sum + Number(spice.price), 0) || 0;
                                return (
                                    <div key={item.uuid} className="flex flex-col gap-1">
                                        <div className="flex justify-between">
                                            <p>
                                                {item.name} ×{item.quantity}
                                            </p>
                                            <p>{(Number(item.price) + spicesPrice) * item.quantity} ₽</p>
                                        </div>
                                        {item.spices && item.spices.length > 0 && (
                                            <div className="pl-4 text-sm text-gray-400">
                                                {item.spices.map((spice) => (
                                                    <div key={spice.id} className="flex justify-between">
                                                        <span>+ {spice.name}</span>
                                                        <span>{spice.price} ₽</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="flex justify-between font-semibold border-t border-gray-600 pt-2 mt-4">
                        <span>Итого:</span>
                        <span>{total} ₽</span>
                    </div>

                    <div className="mt-4 space-y-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                value="card"
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                                className="accent-red-500"
                            />
                            <span>Оплата картой онлайн</span>
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="payment"
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                                className="accent-red-500"
                            />
                            <span>Оплата при доставке</span>
                        </label>
                    </div>

                    <p className="text-xs text-gray-400 mt-4">
                        Отправляя заявку, вы соглашаетесь с обработкой персональных данных в соответствии с{' '}
                        <a href="#" className="underline">
                            политикой конфиденциальности
                        </a>
                    </p>

                    <button
                        type="submit"
                        className="mt-4 lg:w-[250px] w-full cursor-pointer bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-md"
                    >
                        Оформить заказ
                    </button>
                </div>
            </div>
        </form>
    );
}