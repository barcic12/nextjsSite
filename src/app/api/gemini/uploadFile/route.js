import { NextResponse } from "next/server";
import { uploadFile } from "@/services/fileServices";

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }
    const filename = await formData.get("fileName");
    const ret = await uploadFile(file, filename, "src/photos/");
    return ret;
  } catch (error) {
    return NextResponse.json({ Message: error.message, status: 500 });
  }
};
