"use client";

import "./upload-text-styles.css";
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
            Explore Who’s Running for President in 2024
          </h1>
          <div className="w-2/3 mt-4">
            <p className="text-gray-400 text-lg font-semibold">
              13 Republicans, 3 Democrats, and one third-party candidate. 17
              total are running for president in 2024. Learn more about each
              one.
            </p>
          </div>
        </div>
        <div className="mt-12 bg-gray-100">
          <div className="px-20 mt-4">
            <h1 className="text-[#131313] text-2xl font-bold">Democrats</h1>
            <div className="mt-4 mb-4">
              <div className="grid grid-cols-4 gap-8">
                {Object.keys(candidates).map((key, index) =>
                  candidates[key].party === "Democrat" ? (
                    <CandidateCard
                      key={index}
                      name={candidates[key].name}
                      img={candidates[key].img}
                      desc={candidates[key].desc}
                      party={candidates[key].party}
                      last={key}
                    />
                  ) : (
                    <React.Fragment key={key}></React.Fragment>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-gray-100">
          <div className="px-20 mt-4">
            <h1 className="text-[#131313] text-2xl font-bold">Republicans</h1>
            <div className="mt-4 mb-4">
              <div className="grid grid-cols-4 gap-8">
                {Object.keys(candidates).map((key, index) =>
                  candidates[key].party === "Republican" ? (
                    <CandidateCard
                      key={index}
                      name={candidates[key].name}
                      img={candidates[key].img}
                      desc={candidates[key].desc}
                      party={candidates[key].party}
                      last={key}
                    />
                  ) : (
                    <React.Fragment key={key}></React.Fragment>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-gray-100 mb-12">
          <div className="px-20 mt-4">
            <h1 className="text-[#131313] text-2xl font-bold">Third-Party</h1>
            <div className="mt-4 mb-4">
              <div className="grid grid-cols-4 gap-8">
                {Object.keys(candidates).map((key, index) =>
                  candidates[key].party === "Third Party" ? (
                    <CandidateCard
                      key={index}
                      name={candidates[key].name}
                      img={candidates[key].img}
                      desc={candidates[key].desc}
                      party={candidates[key].party}
                      last={key}
                    />
                  ) : (
                    <React.Fragment key={key}></React.Fragment>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TryVernum;
