// src/services/userServices.js

import dbConnect from "../db/conncet"; // Database connection utility
import User from "../models/User"; // User model for MongoDB
import bcrypt from "bcryptjs"; // Library for hashing passwords
import { NextResponse } from "next/server"; // Next.js response handling

/**
 * Creates a new user in the database.
 *
 * @param {string} name - The name of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<Object>} A promise that resolves to the response object
 * indicating success or failure of user creation.
 */
export async function createUser(name, password) {
  if (!name || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    if (await findUser(name, password)) {
      return NextResponse.json(
        {
          success: false,
          message: "User is already exist",
        },
        { status: 423 }
      );
    }
    let hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const user = new User({
      name,
      password: hashedPassword,
    });

    await user.save(); // Save the new user to the database
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/**
 * Deletes a user from the database.
 *
 * @param {string} name - The name of the user to delete.
 * @param {string} password - The password of the user to verify before deletion.
 * @returns {Promise<Object>} A promise that resolves to the response object
 * indicating success or failure of user deletion.
 */
export async function deleteUser(name, password) {
  if (!name || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    let user = await findUser(name, password);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not exist",
        },
        { status: 404 }
      );
    }

    await User.deleteOne({ _id: user._id });
    return NextResponse.json(
      { message: "User removed successfully" },
      { status: 410 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

/**
 * Finds a user by username and verifies the password.
 *
 * @param {string} username - The username of the user to find.
 * @param {string} password - The password to verify.
 * @returns {Promise<Object|null>} A promise that resolves to the user object if found,
 * or null if the user does not exist or the password is incorrect.
 */
export async function findUser(username, password) {
  try {
    await dbConnect(); // Connect to the database

    const user = await User.findOne({ name: username });
    if (!user) {
      return null; // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password); // Verify password
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}
