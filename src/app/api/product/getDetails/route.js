import { NextResponse } from "next/server";
import { getAllProductDetails } from "@/services/productServices";
export const GET = async (request) => {
  try {
    const productDetails = await getAllProductDetails();
    return NextResponse.json(
      {
        success: true,
        message: "Get products successfully",
        data: productDetails,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
