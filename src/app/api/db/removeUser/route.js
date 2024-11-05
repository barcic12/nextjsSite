import { NextResponse } from "next/server";
import { deleteUser } from "@/services/userServices";
export async function POST(request) {
  const { username, password } = await request.json();
  try {
    let ret = await deleteUser(username, password);
    return ret;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
