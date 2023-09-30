"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CandidateCard from "../components/CandidateCard";
import { candidates } from "../candidates/candidates"

function TryVernum() {
  return (
    <>
      <div className="w-full h-full py-3 flex flex-col">
        <div className="ml-20">
          <h1 className="text-[#131313] text-4xl font-bold">
            Explore Verum's Library of Political Speeches, Articles, and more.
          </h1>
          <div className="w-2/3 mt-4">
            <p className="text-gray-400 text-lg font-semibold">
                Discover our extensive collection of Political Documents featuring the 2024 Presidential candidates and beyond. Powered by Verum.Ai, our platform analyzes and condenses all political documents, helping you digest information easier. With the option to peruse the original documents seamlessly within the Verum.Ai program.
            </p>
          </div>
        </div>
        <div className="mt-12 bg-gray-100">
          <div className="px-20 mt-4">
            <h1 className="text-[#131313] text-2xl font-bold">Democrats</h1>
            <div className="mt-4 mb-4">
              <div className="grid grid-cols-4 gap-8">
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </>
  );
}

export default TryVernum;
