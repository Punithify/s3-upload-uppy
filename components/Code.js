import React, { useState } from "react";

export default function Code({ code }) {
  const [showCode, setShowCode] = useState(false);
  const [copyText, setCopyText] = useState("Copy");
  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopyText("✅ Copied!");
    setTimeout(() => {
      setCopyText("Copy");
    }, 1000);
  };
  return (
    <div>
      <button
        className="bg-red-800 text-xs hover:bg-red-900 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2"
        type="submit"
        onClick={() => setShowCode(!showCode)}
      >
        {showCode ? "Hide Link" : "Show Link 👇"}
      </button>
      {showCode && (
        <div className="w-1/2 relative">
          <pre className=" whitespace-pre-line text-gray-800 bg-gray-300 rounded-md p-2">
            {code}
          </pre>

          <button
            className="bg-gray-500 text-xs hover:bg-gray-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mb-2 absolute top-0 right-0 transform -translate-x-1 translate-y-1"
            type="submit"
            onClick={copyCode}
          >
            {copyText}
          </button>
        </div>
      )}
    </div>
  );
}
