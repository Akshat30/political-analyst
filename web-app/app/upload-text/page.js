"use client";

import "./upload-text-styles.css";
import React, { useState } from "react";
import InputField from "../components/input-field.client";
//import BiasDetector from '../api/gpt.mjs'
import Image from "next/image";
import text_symbol from "./text.png";
import link_symbol from "./link.png";
import Link from "next/link";
import { sendLink } from "/app/analysis/analysis.js";
import { sendTextToAPI } from "/app/analysis/analysis.js";

function TryVernum() {
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("Awaiting Results...");

  const handleButtonClick = async () => {
    try {
      const data = await sendTextToAPI(inputText);
      
      setResponse(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="w-full h-full py-3 flex flex-col items-center gap-[335px]">
        <div className="w-full max-w-[1328px] h-[507px] flex items-start gap-[22px]">
          {/* Left Column */}
          <div className="w-[414px] h-full p-6 bg-zinc-100 rounded-[20px] flex flex-col items-start gap-2.5">
            <div className="text-black text-xl font-bold leading-normal mb-2">
              Verum
            </div>
            <div className="w-full border-b border-black my-2"></div>

            <div className="flex flex-col items-start gap-16">
              <div className="flex flex-col items-start gap-6">
                {["text", "link"].map((type, idx) => (
                  <Link
                    href={`/upload-${type}`}
                    className="flex items-center gap-4"
                    key={idx}
                  >
                    <div
                      className={`w-[51px] h-[51px] p-[15px] bg-${
                        type === "link" ? "neutral" : "violet"
                      }-700 rounded-[10px] flex items-center gap-2.5`}
                    >
                      <Image
                        src={type === "text" ? text_symbol : link_symbol}
                        alt={type}
                        width={800}
                        height={800}
                      />
                    </div>
                    <div className="text-black text-lg font-bold leading-normal">
                      Upload {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Separate flex container for the bottom sections */}
              <div className="flex flex-col items-center gap-[9px] pt-20">
                <div className="text-center text-black text-base font-medium">
                  Don’t have a document to upload?
                </div>
                <div className="w-full px-9 py-4 rounded-[20px] border-2 border-black flex items-center justify-center ">
                  <div className="justify-center text-black text-lg font-medium leading-normal">
                    View Our Library
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full flex flex-col items-start gap-10">
            {["Text Entry", "Verum"].map((title, idx) => (
              <div className="w-full flex flex-col items-start" key={idx}>
                <div
                  className={`h-[50px] pl-[31px] pr-8 py-[13px] bg-violet-600 rounded-t-[20px] flex items-center`}
                >
                  <div className="text-zinc-100 text-base font-bold leading-normal">
                    {title}
                  </div>
                </div>
                <div
                  className={`w-full ${
                    title === "Text Entry" ? "h-[223px]" : "h-36"
                  } p-6 bg-zinc-100 rounded-b-[20px] rounded-r-[20px] flex flex-col items-start gap-6`}
                >
                  <div className="text-black text-base font-medium leading-normal">
                    {title === "Text Entry"
                      ? "Copy/paste or type in bodies of text you wish to analyze."
                      : "Upload a text, link, file to get started"}
                  </div>

                  {title === "Text Entry" ? (
                    <InputField
                      className="input-link w-full h-14 px-6 py-4 rounded-[15px] border-2 border-black flex items-start"
                      placeholder="Enter Text..."
                      inputText={inputText}
                      setInputText={setInputText}
                      style={{
                        width: "100%",
                        borderRadius: "15px",
                        border: "2px solid black",
                        backgroundColor: "#EEEEEE",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "10px",
                        paddingLeft: "1em",
                      }}
                    />
                  ) : (
                    <div className="w-full h-14 px-6 py-4 rounded-[15px] border-2 border-black flex items-center">
                      <div className="text-black text-base font-medium leading-normal">
                        {response}
                      </div>
                    </div>
                  )}

                  {title === "Text Entry" && (
                    <div className="w-full flex items-center justify-end gap-2.5">
                      <div className="p-3 rounded-[20px] bg-violet-500 hover:bg-violet-200 flex items-center gap-4">
                        <button
                          className="text-white text-lg font-semibold leading-normal"
                          onClick={handleButtonClick}
                        >
                          Send to Verum
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TryVernum;
