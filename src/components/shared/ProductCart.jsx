"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";
import Link from "next/link";

const ProductCard = ({ name, products, loading }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  // Загружаем категории
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  // Группируем товары по categoryID
  const groupedProducts = categories.map(category => ({
    category,
    items: products.filter(product => product.categoryID === category.id)
  })).filter(group => group.items.length > 0); // убираем пустые категории

  return (
    <div className="lg:mx-20 mx-5 mt-20">
      {/* <h1 className="text-4xl text-white font-extrabold mb-5">{name}</h1> */}

      {loading ? (
        <p className="text-white">Загрузка...</p>
      ) : (
        groupedProducts.map(({ category, items }) => (
          <div key={category.id} className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-10 border-b-1 border-gray-700">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductItem
                  key={product._id}
                  product={product}
                  onSelect={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {selectedProduct && (
        <ProductModal
          allProducts={products}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

const ProductItem = ({ product, onSelect }) => (
  <div
    className="bg-[#0F1F2F] text-white flex flex-col justify-between cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
  >
    <Link href={`/detail/${product._id}`} className="w-full h-48 bg-white overflow-hidden rounded-[10px]">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </Link>
    <div className="mt-2 px-2 pb-3">
      <h3 className="text-xl font-[700]">{product.name}</h3>
      <div className="flex items-end mt-2 justify-between">
        <span className="text-xl font-bold">{product.price} ₽</span>
        <button
          onClick={onSelect}
          className="inline-flex font-semibold cursor-pointer items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-all"
        >
          В корзину
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  </div>
);

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
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 pt-20">
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

export default ProductCard;
