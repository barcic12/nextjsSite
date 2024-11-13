import { NextResponse } from "next/server";
import { getProductDetails } from "@/services/productServices";
export const POST = async (request) => {
  try {
    const { type } = await request.json();
    const productDetails = await getProductDetails(type);
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
