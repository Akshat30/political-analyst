"use client";

import "./upload-text-styles.css";
import React, { useState, useEffect } from "react";
import InputField from "../components/input-field.client";
import Image from "next/image";
import text_symbol from "./text.png";
import link_symbol from "./link.png";
import Link from "next/link";
import { sendLinkToAPI } from "/app/analysis/analysis.js";
import { useSearchParams } from "next/navigation";

function TryVernum() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("Awaiting Results...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url && url != "") {
      const decodedUrl = decodeURIComponent(url.toString());
      console.log(decodedUrl);
      setInputText(decodedUrl);

      // Call the sendLinkToAPI function with the decoded URL

      sendLinkToAPI(decodedUrl)
        .then((data) => {
          setResponse(data);
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, [url]);

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const data = await sendLinkToAPI(inputText);
      setResponse(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false); // Set loading state back to false when the response is received
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
                      className={`w-[51px] h-[51px] p-[15px] border-2 border-violet-700 bg-${
                        type === "text" ? "neutral" : "violet"
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
                <Link href="/library"className="w-full px-9 py-4 rounded-[20px] border-2 border-black flex items-center justify-center ">
                  <div className="justify-center text-black text-lg font-medium leading-normal">
                    View Our Library
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full flex flex-col items-start gap-10" >
            {["Link Entry", "Verum"].map((title, idx) => (
              <div className="w-full flex flex-col items-start" key={idx}>
                <div className={`h-[50px] pl-[31px] pr-8 py-[13px] bg-violet-600 rounded-t-[20px] flex items-center`}>
                  <div className="text-zinc-100 text-base font-bold leading-normal">
                    {title}
                  </div>
                </div>
                <div
                  className={`w-full ${
                    title === "Link Entry" ? "h-[223px]" : "h-36"
                  } p-6 bg-zinc-100 rounded-b-[20px] rounded-r-[20px] flex flex-col items-start gap-6`} style={{ minHeight: title === "Link Entry" ? 'auto' : '24rem' }}
                >
                  <div className="text-black text-base font-medium leading-normal">
                    {title === "Link Entry"
                      ? "Upload the link of a speech/article you wish to analyze."
                      : "Upload a text, link, file to get started"}
                  </div>

                  {title === "Link Entry" ? (
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
                    <div className="response w-full px-6 py-4 rounded-[15px] border-2 border-black flex flex-col items-start" style={{ minHeight: '18rem', overflow: 'auto' }}>
                      <div className="text-black text-base font-medium leading-normal flex-grow">
                          {loading ? (
                            <div className="flex items-center">
                              <div>Loading...</div>
                              <div className="ml-auto">
                                <svg
                                  className="animate-spin h-4 w-4 text-violet-700 ml-2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6-2.687-6-6z"
                                  ></path>
                                </svg>
                              </div>
                            </div>
                          ) : (
                            response
                          )}
                        </div>
                      </div>
                  )}

                  {title === "Link Entry" && (
                    <div className="w-full flex items-center justify-end gap-2.5">
                      <div className="p-3 rounded-[20px] bg-violet-500 hover:bg-violet-700 flex items-center gap-4">
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
