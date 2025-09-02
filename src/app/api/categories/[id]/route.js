import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import Category from "../../../../app/models/Category";

// 🔹 Получить одну категорию
export async function GET(req, { params }) {
  await connectDB();
  const category = await Category.findOne({ id: params.id });
  if (!category) return NextResponse.json({ error: "Не найдено" }, { status: 404 });
  return NextResponse.json(category);
}

// 🔹 Удалить категорию
export async function DELETE(req, { params }) {
  await connectDB();
  const category = await Category.findOneAndDelete({ id: params.id });
  if (!category) return NextResponse.json({ error: "Не найдено" }, { status: 404 });
  return NextResponse.json({ message: "Удалено" });
}
