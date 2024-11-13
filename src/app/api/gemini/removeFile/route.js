import { NextResponse } from "next/server";
import { removeFile } from "@/services/fileServices";
export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const filename = formData.get("fileName");
    if (!filename) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }
    const ret = await removeFile(filename, "public/geminiPhotos/");
    return ret;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
};
