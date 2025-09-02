import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Product from "../../../../app/models/Products";

// Получить один продукт
export async function GET(req, { params }) {
  await connectDB();
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: "Не найдено" }, { status: 404 });
  return NextResponse.json(product);
}

// Обновить продукт
export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();

  const updated = await Product.findByIdAndUpdate(params.id, data, { new: true });
  if (!updated) return NextResponse.json({ error: "Не найдено" }, { status: 404 });

  return NextResponse.json(updated);
}

// Удалить продукт
export async function DELETE(req, { params }) {
  await connectDB();
  const deleted = await Product.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Не найдено" }, { status: 404 });

  return NextResponse.json({ message: "Удалено" });
}
