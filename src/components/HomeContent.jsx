"use client";
import { useState } from "react";
export default function HomeContent() {
  //const fileInput = useRef(null);
  const [prompt, setprompt] = useState("");
  const [textToShow, settextToShow] = useState(false);
  const [filePathName, setfilePathName] = useState(null);
  async function GetResponse() {
    const response = await fetch("/api/gemini/getAnswer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePathName, prompt }),
    });
    const result = await response.json();
    settextToShow(result.message);
    const formData = new FormData();
    formData.append("fileName", filePathName);

    const res = await fetch("/api/gemini/removeFile", {
      method: "POST",
      body: formData,
    });
    setfilePathName(null);
  }
  //alert("Question submitted");
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents newline in the textarea
      GetResponse();
    }
  };
  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    const formData = new FormData();
    const filename = Date.now() + file.name.replaceAll(" ", "_");
    setfilePathName(filename);
    formData.append("file", file);
    formData.append("fileName", filename);
    let res = await fetch("/api/gemini/uploadFile", {
      method: "POST",
      body: formData,
    });
    res = await res.json();
  };

  return (
    <div className="px-6 gap-2">
      <div className="flex flex-col items-center py-3">
        <video width="640" height="360" controls autoPlay>
          <source src="\wedding.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="flex flex-col items-center">
        <textarea
          rows="3"
          onChange={(e) => setprompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your question here..."
        ></textarea>
        <div className="p-3 inline-block">
          <label className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 px-3 py-1 cursor-pointer">
            Choose File
            <input
              type="file"
              //ref={fileInput}
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {filePathName && <p>Selected file: {filePathName}</p>}
        </div>
        <button
          onClick={() => GetResponse()}
          className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
      <p className="p-6 items-center">{textToShow}</p>
    </div>
  );
}
