"use client";
import React, { useState, useEffect } from "react";

export default function Category({ activeCategory, onSelectCategory }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Ошибка загрузки категорий:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (category) => {
        onSelectCategory(category);
    };

    return (
        <div className="sticky border border-y-[#ccc]/20 border-x-[#0F1F2F] top-0 bg-[#0F1F2F] z-10 lg:mx-20 mx-5 py-3">
            <div className="text-[16px]">
                <div className="flex lg:gap-4 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {loading ? (
                        <>
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-[100px] h-[40px] bg-gray-300 rounded-[10px] animate-pulse"
                                ></div>
                            ))}
                        </>
                    ) : (
                        <>
                            {/* Кнопка "Все" */}
                            <button
                                onClick={() => handleClick({ id: "Все", name: "Все" })}
                                className={`px-6 py-2 rounded-[10px] whitespace-nowrap transition-all ${activeCategory.id === "Все"
                                        ? "bg-yellow-400 text-black"
                                        : "bg-[#EDF6FF] text-[#0F1F2F] hover:bg-gray-600"
                                    }`}
                            >
                                Все
                            </button>

                            {/* Список категорий */}
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleClick({ id: cat.id, name: cat.name })}
                                    className={`px-6 py-2 rounded-[10px] whitespace-nowrap transition-all ${activeCategory.id === cat.id
                                            ? "bg-yellow-400 text-black"
                                            : "bg-[#EDF6FF] text-[#0F1F2F] hover:bg-gray-600"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
