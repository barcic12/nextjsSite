import { NextResponse } from "next/server";
import { getFoldersPath } from "@/services/productServices";
import { uploadFile } from "@/services/fileServices";
import { createProduct } from "@/services/productServices";

export async function GET(request) {
  try {
    // Fetch the routes
    const routes = await getFoldersPath();

    // Return a successful response with routes
    return NextResponse.json(
      { success: true, message: "succes", data: routes },
      { status: 200 }
    );
  } catch (error) {
    // Return an error response in case of failure
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");
    const productName = formData.get("productName");
    const count = formData.get("count");
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No files received." },
        { status: 400 }
      );
    }
    let ret = await uploadFile(
      file,
      file.name,
      "public/images/" + folder + "/"
    );
    ret = await createProduct(productName, file.name, folder, count);
    return NextResponse.json(
      { success: true, message: "No files received.", data: ret },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
      status: 500,
    });
  }
};
