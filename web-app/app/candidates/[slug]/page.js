"use client";
import React, { useState } from "react";
import { candidates } from "../candidates";
import Image from "next/image";

function Page({ params }) {
    const cand = params.slug;
    const party = candidates[cand].party;
    const name = candidates[cand].name;
    const desc = candidates[cand].desc;
    const img = candidates[cand].img;
  return (
    <>
      <div className="w-full h-full py-3 flex flex-col">
        <div className="ml-20">
          <h1 className="text-[#131313] text-4xl font-bold">
            {name}
          </h1>
          <div className="w-2/3 mt-4">
            <span className="text-gray-400 text-lg font-semibold">
              {desc}
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
          <div className="w-full mt-4">
            <Image
              alt={name}
              src={img}
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
