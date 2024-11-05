import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const filename = formData.get("fileName");
    const filePath = "src\\photos\\".concat(filename);
    if (!filePath) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }
    fs.unlinkSync(filePath);
    return NextResponse.json({
      message: "Successfully deleted:", //${filename}`
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Unable to delete: ".concat(error.message),
      status: 500,
    });
  }
};
