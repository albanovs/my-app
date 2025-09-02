'use client';
import { useState, useEffect } from "react";
import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';


const ProductModal = ({ product, onClose, allProducts }) => {
    const [extras, setExtras] = useState([]);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchExtras = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();

                const filtered = data.find((e) => e.name === "Добавки");

                if (filtered) {
                    const productExtras = allProducts.filter((p) => p.categoryID === filtered.id);
                    setExtras(productExtras);
                } else {
                    setExtras([]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchExtras();
    }, [product, allProducts]);

    const toggleExtra = (extra) => {
        setSelectedExtras((prev) =>
            prev.includes(extra)
                ? prev.filter((e) => e !== extra)
                : [...prev, extra]
        );
    };

    const totalPrice =
        (product.price + selectedExtras.reduce((sum, e) => sum + e.price, 0)) *
        quantity;

    const addToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push({
            ...product,
            quantity,
            spices: selectedExtras
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        onClose();
    };

    return (
        <div className="fixed text-black inset-0 bg-black/50 flex justify-center items-start z-50 pt-20">
            <div className="bg-white rounded-xl w-full max-w-lg p-6 relative flex flex-col">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4">Добавить к заказу</h2>

                <div className="flex gap-4 mb-4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-gray-500">Цена: {product.price} ₽</p>
                        <div className="flex items-center gap-2 mt-2">
                            <button
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                −
                            </button>
                            <span>{quantity}</span>
                            <button
                                onClick={() => setQuantity(q => q + 1)}
                                className="px-3 py-1 bg-gray-200 rounded"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>

                <h3 className="font-semibold mb-2">Дополнительно</h3>
                <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto mb-4">
                    {extras.map((extra) => {
                        const isSelected = selectedExtras.includes(extra);
                        return (
                            <button
                                key={extra._id}
                                onClick={() => toggleExtra(extra)}
                                className={`p-2 text-sm rounded-lg border ${isSelected ? "bg-yellow-400 text-black border-yellow-400" : "bg-gray-200 text-gray-700 border-gray-200"
                                    }`}
                            >
                                {extra.name} <br /> {extra.price} ₽
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="font-bold text-xl">К оплате: {totalPrice} ₽</span>
                    <button
                        onClick={addToCart}
                        className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-lg"
                    >
                        В корзину <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function DetailItem({ id }) {
    const [datas, setDatas] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch("/api/products");
                const data = await res.json();
                setDatas(data);
            } catch (err) {
                console.error("Ошибка загрузки продуктов:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const filteredProduct = datas.find(product => product._id === id);

    const filteredAllProducts = filteredProduct
        ? datas.filter(product => product.categoryID === filteredProduct.categoryID && product._id !== id)
        : [];


    if (!filteredProduct) {
        return <div className="text-white">Товар не найден</div>;
    }

    return (
        <div className='mt-10 mb-20 text-white'>
            <div className='flex lg:flex-row flex-col gap-10'>
                <Image
                    src={filteredProduct.image ? filteredProduct.image : '/images/DSC_0282 1.png'}
                    alt={filteredProduct.name}
                    className='rounded-[20px]'
                    width={500}
                    height={500}
                />
                <div className='space-y-5'>
                    <h2 className='lg:text-[32px] text-[28px] uppercase font-extrabold'>{filteredProduct.name}</h2>
                    <h4 className='lg:text-[32px] text-[28px] font-bold'>{filteredProduct.price} ₽</h4>
                    <div className='flex items-center gap-5'>
                        <button
                            onClick={() => setSelectedProduct(filteredProduct)}
                            className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all">
                            В корзину
                            <ShoppingCart size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="text-[28px] mt-20 md:text-4xl font-bold uppercase">добавьте к заказу</h2>
            <div className='mt-5'>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredAllProducts?.map(product => (
                        <div
                            key={product._id}
                            className="bg-[#0F1F2F] text-white cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <a href={`/detail/${product._id}`} className="relative">
                                <img
                                    src={product.image || '/images/DSC_0282 1.png'}
                                    alt={product.name}
                                    className="w-full rounded-[10px] h-48 object-cover"
                                />
                            </a>
                            <div className="mt-2">
                                <h3 className="text-xl font-[700]">{product.name}</h3>
                                <div className="flex items-end justify-between">
                                    <span className="text-xl font-bold">{product.price} ₽</span>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all">
                                        В корзину
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedProduct && (
                <ProductModal
                    allProducts={datas}
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
}
