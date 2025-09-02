"use client";

import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Basket() {
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedItems);

        const initialQuantities = {};
        storedItems.forEach((item, index) => {
            initialQuantities[index] = item.quantity || 1;
        });
        setQuantities(initialQuantities);
    }, []);

    const increment = (index) => {
        setQuantities(prev => ({ ...prev, [index]: prev[index] + 1 }));
    };

    const decrement = (index) => {
        setQuantities(prev => ({ ...prev, [index]: prev[index] > 1 ? prev[index] - 1 : 1 }));
    };

    const removeItem = (indexToRemove) => {
        const updatedItems = cartItems.filter((_, i) => i !== indexToRemove);
        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const removeExtra = (itemIndex, extraIndex) => {
        const updatedCart = [...cartItems];
        if (updatedCart[itemIndex].spices) {
            updatedCart[itemIndex].spices.splice(extraIndex, 1);
            setCartItems(updatedCart);
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item, index) => {
            const basePrice = item.price * quantities[index];
            const extrasPrice =
                (item.spices?.reduce((sum, e) => sum + e.price, 0) || 0) * quantities[index];
            return total + basePrice + extrasPrice;
        }, 0);
    };

    return (
        <div className="text-white mb-20">
            <h2 className="text-[28px] mb-10 lg:mt-20 md:text-4xl font-extrabold uppercase">Корзина</h2>
            <div className="flex lg:flex-row flex-col gap-10">
                <div className="lg:w-[70%] p-5 min-h-[250px] h-full bg-[#2B445D] rounded-[20px]">
                    <div className="flex justify-between pb-5 border-b border-[#ccc]">
                        <p className="uppercase text-[20px] font-semibold">Товар</p>
                        <p className="uppercase text-[20px] font-semibold">Итого</p>
                    </div>
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 py-5 border-b border-[#ccc]"
                        >
                            <div className="flex flex-col sm:flex-row w-full gap-4">
                                <Image
                                    className="object-cover rounded-[6px] w-[100px] h-[100px]"
                                    src={item.image || '/placeholder.png'}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                />
                                <div className="flex flex-col justify-between w-full">
                                    <h5 className="text-[16px] font-semibold">{item.name}</h5>

                                    {item.spices?.length > 0 && (
                                        <ul className="text-sm text-gray-300 mt-2 space-y-1">
                                            {item.spices.map((extra, i) => (
                                                <li key={i} className="flex items-center">
                                                    <span>+ {extra.name} ({extra.price} ₽)</span>
                                                    <button
                                                        onClick={() => removeExtra(index, i)}
                                                        className="text-red-400 hover:text-red-600 ml-2 text-xs underline"
                                                    >
                                                        удалить
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="flex mt-3 items-center border border-white text-white rounded-lg px-4 py-1 space-x-4 w-max">
                                        <button onClick={() => decrement(index)}>
                                            <Minus className="cursor-pointer" size={20} />
                                        </button>
                                        <span className="text-sm">{quantities[index]}</span>
                                        <button onClick={() => increment(index)}>
                                            <Plus className="cursor-pointer" size={20} />
                                        </button>
                                    </div>

                                    <p
                                        onClick={() => removeItem(index)}
                                        className="mt-2 text-[#FF5050] cursor-pointer underline text-sm"
                                    >
                                        Удалить товар
                                    </p>
                                </div>
                            </div>

                            <div className="text-lg flex gap-2 font-semibold mt-4 lg:mt-0">
                                <h6>
                                    {(
                                        item.price * quantities[index] +
                                        (item.spices?.reduce((sum, s) => sum + s.price, 0) || 0) * quantities[index]
                                    ).toLocaleString()}
                                </h6> <h6>₽</h6>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:w-[30%] p-5 min-h-[250px] h-full bg-[#2B445D] rounded-[20px]">
                    <div className="flex justify-between pb-5 border-b border-[#ccc]">
                        <p className="uppercase text-[20px] font-semibold">Сумма заказа</p>
                    </div>
                    <div className="flex justify-between py-5 border-b border-[#ccc]">
                        <p className="text-[16px]">Подытог</p>
                        <p className="text-[16px]">{calculateTotal()} ₽</p>
                    </div>
                    <div className="flex justify-between py-5 border-b border-[#ccc]">
                        <p className="uppercase text-[20px] font-semibold">Итого</p>
                        <p className="uppercase text-[20px] font-semibold">{calculateTotal()} ₽</p>
                    </div>
                    <a href="/order" className="w-full block text-center text-[#0F1F2F] font-semibold cursor-pointer px-5 mt-10 bg-yellow-400 hover:bg-yellow-500 py-3 rounded-lg" >
                        Перейти к оформлению заказа
                    </a>
                </div>
            </div>
        </div>
    );
}
