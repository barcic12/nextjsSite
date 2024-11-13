"use client";
import { useState } from "react";
import FillingForm from "@/components/FillingForm";
export default function LogInPage() {
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
    } catch (error) {}
    return response;
  };
  const listOfLineParameters = [
    { var: username, setVarFunc: setUsername, label: "Username" },
    { var: password, setVarFunc: setPassword, label: "Password" },
  ];
  const links = [{ address: "/signup", title: "sign up" }];
  return (
    <div className="">
      <FillingForm
        listOfLineParameters={listOfLineParameters}
        handleSubmit={handleSubmit}
        title={"Log In"}
        buttonTitle="Log in"
        links={links}
      ></FillingForm>
    </div>
  );
}
