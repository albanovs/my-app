import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { ShoppingCart, Minus, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductModal = ({ isOpen, onClose, product }) => {
    const router = useRouter();

    const [addons, setAddons] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (isOpen) {
            try {
                const storedAddons = localStorage.getItem('addOns');
                if (storedAddons) {
                    setAddons(JSON.parse(storedAddons));
                } else {
                    setAddons([
                        { id: 1, name: 'Острый соус', price: 15 },
                        { id: 2, name: 'Чесночный соус', price: 15 },
                        { id: 3, name: 'Сырный соус', price: 20 },
                    ]);
                }
            } catch (error) {
                console.error('Ошибка при загрузке добавок из localStorage:', error);
            }
        }
    }, [isOpen]);

    const toggleAddon = (id) => {
        setSelectedAddons((prev) =>
            prev.includes(id)
                ? prev.filter((addonId) => addonId !== id)
                : [...prev, id]
        );
    };

    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const totalAddonsPrice = addons
        .filter((addon) => selectedAddons.includes(addon.id))
        .reduce((sum, addon) => sum + Number(addon.sellPricePerUnit), 0);

    const totalPrice = (Number(product.sellPricePerUnit) * quantity) + (totalAddonsPrice * quantity);

    const handleAddToCart = () => {
        setIsAdding(true);

        const selectedAddonsDetails = addons
            .filter((addon) => selectedAddons.includes(addon.id))
            .map((addon) => ({ id: addon.id, name: addon.name, price: Number(addon.sellPricePerUnit) }));

        const orderItem = {
            id: product.id,
            name: product.name,
            uuid: Math.random().toString(36).substring(2, 9),
            image: product.image || 'images/DSC_0282 1.png',
            price: Number(product.sellPricePerUnit),
            quantity,
            spices: selectedAddonsDetails,
        };

        const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCart = [...existingCart, orderItem];
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));

        setTimeout(() => {
            setIsAdding(false);
            router.push('/basket');
        }, 500);
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/20" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white w-full min-full overflow-hidden flex flex-col max-w-md lg:max-w-2xl rounded-2xl p-6">
                    <Dialog.Title className="text-xl font-bold mb-4">Добавить к заказу</Dialog.Title>

                    <div className="flex flex-col lg:flex-row items-center gap-4 border rounded-xl p-4 mb-6 shadow-sm">
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">{product?.name}</h2>
                            <Image
                                className="rounded-lg"
                                src={product?.image ? product.image : '/images/DSC_0282 1.png'}
                                alt={product?.name}
                                width={100}
                                height={100}
                            />
                            <p className="text-gray-500 mt-1">Цена: {product?.sellPricePerUnit} ₽</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={decrease}
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                                <Minus size={18} />
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                onClick={increase}
                                className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Дополнительно</h3>
                        <div className="grid grid-cols-3 gap-5 max-h-40 lg:max-h-60 overflow-y-auto pr-1">
                            {addons.map(({ id, name, sellPricePerUnit }) => {
                                const isSelected = selectedAddons.includes(id);
                                return (
                                    <div
                                        key={id}
                                        onClick={() => toggleAddon(id)}
                                        className={`flex items-center justify-center text-center px-3 py-2 h-20 rounded-lg cursor-pointer shadow-sm transition-colors font-medium text-sm ${isSelected ? 'bg-yellow-400 text-black' : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                    >
                                        <div>
                                            {name}
                                            <div className="text-xs text-gray-500">{sellPricePerUnit} ₽</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 text-lg font-semibold">
                        <span>К оплате:</span>
                        <span>{totalPrice} ₽</span>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Отмена
                        </button>
                        <button
                            disabled={isAdding}
                            onClick={handleAddToCart}
                            className="cursor-pointer inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isAdding ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Добавление...
                                </>
                            ) : (
                                <>
                                    В корзину <ShoppingCart size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default ProductModal;
