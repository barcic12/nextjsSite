"use client";
import { useState } from "react";
import FillingForm from "@/components/FillingForm";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    try {
      const response = await fetch("/api/db/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const listOfLineParameters = [
    { var: username, setVarFunc: setUsername, label: "Username" },
    { var: password, setVarFunc: setPassword, label: "Password" },
  ];
  return (
    <div className="">
      <FillingForm
        listOfLineParameters={listOfLineParameters}
        handleSubmit={handleSubmit}
        title={"Sign up"}
        buttonTitle="Sign up"
      ></FillingForm>
    </div>
  );
}
