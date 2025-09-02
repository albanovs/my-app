"use client";

import Footer from "@/components/shared/Footer";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AdminPage() {
  // --- Авторизация ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // --- Категории ---
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [editCategory, setEditCategory] = useState(null);

  // --- Продукты ---
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryID: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  // --- Проверка авторизации при загрузке ---
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("adminUser"));
    if (storedUser && storedUser.loggedIn) {
      setIsLoggedIn(true);
      fetchCategories();
      fetchProducts();
    }
  }, []);

  // --- Логин и выход ---
  const handleLogin = () => {
    const { username, password } = loginData;
    if (password === "xo-web2026") {
      localStorage.setItem(
        "adminUser",
        JSON.stringify({ loggedIn: true, username })
      );
      setIsLoggedIn(true);
      setLoginData({ username: "", password: "" }); // очистка инпутов
      fetchCategories();
      fetchProducts();
    } else {
      alert("Неверный пароль");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    setIsLoggedIn(false);
  };

  // --- Загрузка данных ---
  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    setCategories(await res.json());
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  };

  // --- CRUD Категории ---
  const addCategory = async () => {
    if (!newCategory.name) return alert("Введите имя категории");

    const categoryToAdd = { id: uuidv4(), name: newCategory.name };
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(categoryToAdd),
    });
    setNewCategory({ name: "" });
    fetchCategories();
  };

  const updateCategory = async () => {
    if (!editCategory) return;
    await fetch(`/api/categories/${editCategory.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editCategory.name }),
    });
    setEditCategory(null);
    fetchCategories();
  };

  const deleteCategory = async (id) => {
    if (!confirm("Удалить категорию?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  // --- CRUD Продукты ---
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url;
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.categoryID)
      return alert("Заполните имя и категорию");

    let imageUrl = "";
    if (imageFile) imageUrl = await uploadImage(imageFile);

    const productToAdd = {
      _id: uuidv4(),
      ...newProduct,
      price: +newProduct.price,
      image: imageUrl,
    };

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productToAdd),
    });

    setNewProduct({ name: "", categoryID: "", price: "", description: "" });
    setImageFile(null);
    fetchProducts();
  };

  const updateProduct = async () => {
    if (!editProduct) return;

    let imageUrl = editProduct.image;
    if (imageFile) imageUrl = await uploadImage(imageFile);

    await fetch(`/api/products/${editProduct._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editProduct, price: +editProduct.price, image: imageUrl }),
    });

    setEditProduct(null);
    setImageFile(null);
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm("Удалить продукт?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  // --- Модалка логина ---
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Вход в админ-панель</h2>
          <input
            type="text"
            placeholder="Логин"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="border p-2 rounded w-full mb-4"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  // --- Админка ---
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        >
          Выйти
        </button>

        {/* Категории */}
        <section>
          <h1 className="text-2xl font-bold mb-4">Категории</h1>
          <div className="mb-6 border p-4 rounded flex gap-2">
            <input
              type="text"
              placeholder="Название"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ name: e.target.value })}
              className="border p-2 rounded flex-1"
            />
            <button onClick={addCategory} className="bg-blue-500 text-white px-4 py-2 rounded">
              Добавить
            </button>
          </div>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="border p-4 rounded flex justify-between items-center">
                {editCategory?.id === cat.id ? (
                  <>
                    <input
                      type="text"
                      value={editCategory.name}
                      onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                      className="border p-2 rounded mr-2 flex-1"
                    />
                    <button onClick={updateCategory} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                      Сохранить
                    </button>
                    <button onClick={() => setEditCategory(null)} className="bg-gray-400 text-white px-3 py-1 rounded">
                      Отмена
                    </button>
                  </>
                ) : (
                  <>
                    <span>{cat.name}</span>
                    <div className="space-x-2">
                      <button onClick={() => setEditCategory(cat)} className="bg-yellow-500 text-white px-3 py-1 rounded">✏️</button>
                      <button onClick={() => deleteCategory(cat.id)} className="bg-red-500 text-white px-3 py-1 rounded">🗑️</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Продукты */}
        <section>
          <h1 className="text-2xl font-bold mb-4">Продукты</h1>
          <div className="mb-6 border p-4 rounded space-y-2">
            <input
              type="text"
              placeholder="Название"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={newProduct.categoryID}
              onChange={(e) => setNewProduct({ ...newProduct, categoryID: e.target.value })}
              className="border p-2 rounded w-full"
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option className=" text-black" key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Цена"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <textarea
              placeholder="Описание"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input id="fileInput" type="file" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" />
            <label htmlFor="fileInput" className="border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer block text-center">
              {imageFile ? imageFile.name : "Выберите фото"}
            </label>
            <button onClick={addProduct} className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Добавить
            </button>
          </div>

          {/* Таблица продуктов */}
          <table className="w-full border-collapse border text-center">
            <thead>
              <tr className="bg-gray-800">
                <th className="border p-2">Фото</th>
                <th className="border p-2">Название</th>
                <th className="border p-2">Категория</th>
                <th className="border p-2">Цена</th>
                <th className="border p-2">Действия</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="text-center">
                  <td className="border p-2">{p.image ? <img src={p.image} alt={p.name} className="h-16 mx-auto" /> : <span className="text-gray-400">Нет фото</span>}</td>
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{categories.find(c => c.id === p.categoryID)?.name || p.categoryID}</td>
                  <td className="border p-2">{p.price} ₽</td>
                  <td className="border p-2 space-x-2">
                    <button onClick={() => setEditProduct(p)} className="bg-yellow-500 text-white px-3 py-1 rounded">✏️</button>
                    <button onClick={() => deleteProduct(p._id)} className="bg-red-500 text-white px-3 py-1 rounded">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Модалка редактирования продукта */}
        {editProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded w-full max-w-lg text-black space-y-2">
              <h2 className="text-xl font-bold mb-2">Редактировать продукт</h2>
              <input type="text" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className="border p-2 rounded w-full" />
              <input type="number" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} className="border p-2 rounded w-full" />
              <textarea value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} className="border p-2 rounded w-full" />
              <input id="editFileInput" type="file" onChange={(e) => setImageFile(e.target.files[0])} className="hidden" />
              <label htmlFor="editFileInput" className="border-2 border-dashed border-gray-400 p-4 rounded cursor-pointer block text-center">
                {imageFile ? imageFile.name : "Выберите фото"}
              </label>
              <div className="flex justify-end space-x-2">
                <button onClick={updateProduct} className="bg-green-500 text-white px-4 py-2 rounded">Сохранить</button>
                <button onClick={() => setEditProduct(null)} className="bg-gray-400 text-white px-4 py-2 rounded">Отмена</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
