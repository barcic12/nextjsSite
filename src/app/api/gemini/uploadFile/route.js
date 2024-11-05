import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const filename = formData.get("fileName");
    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(process.cwd(), "src/photos/" + filename), buffer);
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
