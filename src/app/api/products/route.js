import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Product from "../../models/Products";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req) {
  await connectDB();
  const { name, categoryID, price, description, image } = await req.json();

  const newProduct = await Product.create({
    name,
    categoryID,
    price,
    description,
    image,
  });

  return NextResponse.json(newProduct, { status: 201 });
}
