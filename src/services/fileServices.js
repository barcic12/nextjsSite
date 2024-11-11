import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import fs from "fs";
export const uploadFile = async (file, filename, location) => {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(location.concat(filename), buffer);
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    throw new Error("Failed: ".concat(error.message));
  }
};
export const removeFile = async (filename, location) => {
  try {
    const filePath = location.concat(filename);
    fs.unlinkSync(filePath);
    return NextResponse.json({
      message: "Successfully deleted:", //${filename}`
      status: 200,
    });
  } catch (error) {
    throw new Error("Unable to delete: ".concat(error.message));
  }
};
