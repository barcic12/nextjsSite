import { NextResponse } from "next/server";
import { getResponse } from "@/services/geminiServices";
export async function POST(request) {
  try {
    const { filePathName, prompt } = await request.json();
    const res = await getResponse(filePathName, prompt);
    return res;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
