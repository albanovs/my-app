"use client";

import { useEffect, useRef, useState } from "react";
import Category from "../components/shared/Category";
import ProductCard from "../components/shared/ProductCart";
import Footer from "../components/shared/Footer";

export default function GlobalPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState({ id: "Все", name: "Все" });
    const [loading, setLoading] = useState(true);
    const productsRef = useRef(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (activeCategory.id === "Все") {
            setFilteredProducts(allProducts);
        } else {
            setFilteredProducts(
                allProducts.filter((p) => p.categoryID === activeCategory.id)
            );
        }
    }, [activeCategory, allProducts]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/products");
            const data = await res.json();
            setAllProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            console.error("Ошибка загрузки продуктов:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClickFromFooter = (category) => {
        setActiveCategory(category);
        if (productsRef.current) {
            productsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <div ref={productsRef}>
                <Category
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                />
                <ProductCard
                    name={activeCategory.name}
                    loading={loading}
                    products={filteredProducts}
                />
            </div>
            <Footer onCategoryClick={handleCategoryClickFromFooter} />
        </>
    );
}
