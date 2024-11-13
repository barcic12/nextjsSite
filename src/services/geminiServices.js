import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
export async function getResponse(filePath, prompt) {
  const operation = whichOperation(prompt, filePath);
  switch (operation) {
    case 0: // There is no data
      return NextResponse.json(
        {
          success: false,
          message: "Please write a question or upload a photo",
        },
        { status: 400 }
      );
    case 1: // Text Only
      const textMessage = await getResponseWithTextOnly(prompt);
      return NextResponse.json(
        {
          success: true,
          message: textMessage,
        },
        { status: 200 }
      );
    case 2: //Text With Photo
      const fullFilePath = "./public/geminiPhotos/".concat(filePath);
      const photoMessage = await getResponseWithPhoto(prompt, fullFilePath);
      return NextResponse.json(
        { success: true, message: photoMessage },
        { status: 200 }
      );
  }
}
function getFileExtension(filePath) {
  return path.extname(filePath).slice(1);
}
async function getResponseWithPhoto(prompt, filePath) {
  try {
    const model = await connectToGoogle();
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
        mimeType: "image/".concat(getFileExtension(filePath)),
      },
    };

    const result = await model.generateContent([prompt, image]);
    return result.response.text();
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getResponseWithTextOnly(prompt) {
  try {
    const model = await connectToGoogle();
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    throw new Error(error.message);
  }
}
function whichOperation(prompt, filePath) {
  if ((typeof filePath === "undefined" || filePath === null) && prompt === "")
    return 0;
  if (typeof filePath === "undefined" || filePath === null) return 1;
  return 2;
}

async function connectToGoogle() {
  const genAI = new GoogleGenerativeAI(process.env.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  return model;
}
