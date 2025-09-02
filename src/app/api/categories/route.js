import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Category from "../../../app/models/Category";

// 🔹 Получить все категории
export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

// 🔹 Создать новую категорию
export async function POST(req) {
  await connectDB();
  const { id, name } = await req.json();

  if (!id || !name) {
    return NextResponse.json({ error: "id и name обязательны" }, { status: 400 });
  }

  try {
    const newCategory = await Category.create({ id, name });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
