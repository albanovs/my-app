import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  categoryID: String,
  price: Number,
  description: String,
  image: String,
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
