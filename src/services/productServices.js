import dbConnect from "@/db/conncet";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import fs from "fs";
import path from "path";

export async function createProduct(
  productName,
  fileName,
  folderName,
  quantityInStock
) {
  if (!productName || !quantityInStock) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    if (await findProduct(productName, fileName)) {
      return NextResponse.json(
        {
          success: false,
          message: "Product is already exist",
        },
        { status: 423 }
      );
    }
    const product = new Product({
      name: productName,
      file_name: fileName,
      image_path: await getImagePath(fileName, folderName),
      quantity_in_stock: quantityInStock,
    });

    await product.save();
    return NextResponse.json(
      { success: true, message: "Product created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
async function findProduct(productName, fileName) {
  await dbConnect();
  try {
    const product =
      (await Product.findOne({ name: productName })) ||
      (await Product.findOne({ file_name: fileName }));
    if (!product) return null;

    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getImagePath(name, folderNAme) {
  return "/images/" + folderNAme + "/" + name;
}

export async function getFoldersPath() {
  const directoryPath = path.join(process.cwd(), "public/images");
  const routes = [];

  try {
    fs.readdirSync(directoryPath).forEach((file) => {
      const routePath = path.join(directoryPath, file);
      if (fs.statSync(routePath).isDirectory()) {
        routes.push(file);
      }
    });
    return routes;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
async function getAllProducts() {
  await dbConnect();
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function getAllProductDetails() {
  try {
    const productDetails = [];
    const products = await getAllProducts();
    products.forEach((product) => {
      if (product.quantity_in_stock !== 0) {
        productDetails.push({
          name: product.name,
          imagePath: product.image_path,
          quantityInStock: product.quantity_in_stock,
        });
      }
    });

    return productDetails;
  } catch (error) {
    throw new Error(error.message);
  }
}
