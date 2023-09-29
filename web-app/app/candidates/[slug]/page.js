"use client";
import React, { useState } from "react";
import { candidates } from "../candidates2";
import Image from "next/image";
import { AiFillRightCircle } from "react-icons/ai";

function Page({ params }) {
  const cand = params.slug;
  const party = candidates[cand].party;
  const name = candidates[cand].name;
  const desc = candidates[cand].desc;
  const img = candidates[cand].img;
  const subheading = candidates[cand].subheading;
  const website = candidates[cand].website;
  const birthday = candidates[cand].birthday;
  const transcripts = candidates[cand].transcripts;
  const about = candidates[cand].about;
  return (
    <>
      <div className="w-full h-full py-3 flex flex-col">
        <div className="ml-20 mr-20">
          <h1 className="text-[#131313] text-4xl font-bold">{name}</h1>
          <div className="w-2/3 mt-1 mb-4">
            <span className="text-gray-400 text-lg font-semibold">
              {subheading}
            </span>
            <span className="ml-6">
              {party === "Republican" ? (
                <div className="mb-4 inline-block bg-[#FFC2C2] text-sm text-center px-2 rounded-lg">
                  <p className="text-white">Republican</p>
                </div>
              ) : party === "Democrat" ? (
                <div className="mb-4 inline-block bg-[#C2CCFF] text-sm text-center px-2 rounded-lg">
                  <p className="text-white">Democrat</p>
                </div>
              ) : (
                <div className="mb-4 inline-block bg-[#A19E9E] text-sm text-center px-2 rounded-lg">
                  <p className="text-white">Third Party</p>
                </div>
              )}
            </span>
          </div>
          <div className="flex flex-row">
            <div className="w-1/4 bg-gray-100 rounded-xl">
              <div className="flex flex-col w-full">
                <div className="w-full px-2">
                  <div className="relative h-full">
                    <div className="py-6 px-6">
                      <Image className="rounded-lg" alt={name} src={img} />
                    </div>
                  </div>

                  <p className="mt-2 px-6 text-gray-900 text-sm font-regular">
                    <span className="text-indigo-600 font-semibold">
                      Birthday:
                    </span>{" "}
                    {birthday}
                  </p>

                  <p className="mt-2 px-6 text-gray-900 text-sm font-regular">
                    <span className="text-indigo-600 font-semibold">
                      Occupation:
                    </span>{" "}
                    {desc}
                  </p>

                  <p className="mt-2 px-6 text-gray-900 text-sm font-regular">
                    <span className="text-indigo-600 font-semibold">
                      Political Party:
                    </span>{" "}
                    {party}
                  </p>

                  <p className="mt-2 mb-6 px-6 text-gray-900 text-sm font-regular">
                    <span className="text-indigo-600 font-semibold">
                      Website:
                    </span>{" "}
                    <a href={website} className="underline">
                      Official Website
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <p className="ml-4 mb-2 text-xl font-bold text-indigo-600">
                {" "}
                Recent Documents
              </p>
              <div className="grid grid-cols-2 gap-4">
                {transcripts.map((transcript, index) => (
                  <a key={index} href={transcript.url}>
                    <div className="ml-4 w-full rounded-xl transition duration-500 bg-gray-100 hover:bg-gray-200 hover:scale-[1.03]">
                      <div>
                        <div className="flex flex-col w-full">
                          <div className="w-full px-6">
                            <div className="flex flex-row">
                              <div className="w-3/4">
                                <p className="mt-4 text-gray-900 text-lg font-bold underline">
                                  {transcript.name}
                                </p>
                              </div>
                              <div className="w-1/4 flex justify-end mt-4 text-2xl">
                                <AiFillRightCircle className="text-gray-900" />
                              </div>
                            </div>

                            <p className="mt-2 text-gray-900 text-sm font-regular">
                              <span className="text-indigo-600 font-semibold">
                                Date:
                              </span>{" "}
                              {transcript.date}
                            </p>

                            <p className="mt-2 text-gray-900 text-sm font-regular mb-4">
                              {transcript.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full">
            <p className="mt-12 mb-2 text-3xl font-bold text-indigo-600">
              About
            </p>
            <div className="mt-6 mb-2 text-lg font-regular text-gray-900">
              {about.map((para, index) => (
                <p key={index}>
                  {para}
                  <br />
                  <br />
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
