// src/api/login/route.js
import { NextResponse } from "next/server";
import { createUser } from "@/services/userServices";

export async function POST(request) {
  const { username, password } = await request.json();

  try {
    let ret = await createUser(username, password);
    return ret;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
