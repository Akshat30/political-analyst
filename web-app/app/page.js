"use client";

import Image from 'next/image'
import Layout from 'app/layout.js';
import Navbar from './components/Navbar.js';
import React, { useState } from 'react';
import arrow from './symbols/Arrow.png'

export default function Home() {

  const [summarizeClicked, setSummarizeClicked] = useState(true);
  const [identifyClicked, setIdentifyClicked] = useState(false);
  const [documentClicked, setDocumentClicked] = useState(false);

  const handleSummarizeClick = () => {
    setSummarizeClicked(prevState => !prevState);
  }
  const handleIdentifyClick = () => {
    setIdentifyClicked(prevState => !prevState);
  }
  const handleDocumentClick = () => {
    setDocumentClicked(prevState => !prevState);
  }

  return (
    <>
    <div className="w-full h-[491px] py-14 flex flex-col items-center gap-10">
      <div className="w-[1081px] text-center text-black text-7xl font-bold leading-tight">
          Find the right presidential candidate for you
      </div>

      <div className="w-[652px] h-16 text-center text-black text-xl font-bold leading-loose">
          Save your minutes and make informed voting decisions with our ever-growing library and cutting edge technology, Verum.Ai.
      </div>
    
      <div className="flex items-center gap-6">
          <div className="px-10 py-[18px] rounded-full border-2 border-black flex items-center gap-[18.41px]">
              <div className="text-center text-black text-lg font-bold leading-7">View Presidential Candidates</div>
          </div>
          <div className="h-16 px-12 py-[18px] bg-violet-700 rounded-full flex items-center gap-[17.51px]">
              <div className="text-center text-neutral-200 text-lg font-bold leading-7">Try Verum</div>
          </div>
      </div>

    </div>
    <div className="w-full h-[643px] my-20 flex-col justify-start items-center gap-12 inline-flex text-black">
      <div className="flex flex-col items-start h-[152px]">
          <div className="text-violet-500 text-lg font-bold leading-normal mb-2.5">Features</div>
          <div className="text-black text-4xl font-bold leading-[47.71px] mb-2.5">Discover Unbiased Information in minutes, not hours</div>
          <div className="w-[1092px] text-black text-xl font-medium leading-[30px]">Enhance your decision-making process, effortlessly summarize and break down documents, and free up your time for what truly matters. Verum AI provides all the tools you require.</div>
      </div>

        <div className="flex-col justify-center items-center flex">
          <div className="flex-col justify-center items-start flex">
            { summarizeClicked &&
              <button 
              className="w-[1102px] h-[309px] p-4 bg-gray-50 rounded-tr-[20px] rounded-br-[20px] border-l-2 border-violet-500 flex justify-start items-start gap-[18px]"
              onClick={handleSummarizeClick} 
              >
              <div className="text-violet-500 text-xl font-medium leading-[30px]">1.</div>
              <div className="w-[490px] flex flex-col gap-2">
                  <div className="text-black text-2xl text-left font-bold leading-[30px]">Summarize</div>
                  <div className="text-left text-black text-lg font-normal leading-[30px]">
                      Using Verum, you can upload your document and receive a full summarization of the document highlighting key points, details, and facts.
                  </div>
              </div>
              <div className="w-[524px] h-[278px] bg-neutral-900 rounded-[10px]" />
              </button> 
            }
            { !summarizeClicked &&
            <button className="w-[563px] p-4 bg-gray-50 rounded-tr-[20px] border-l-2 border-neutral-200 flex justify-between items-center"
            onClick={handleSummarizeClick}>
                <div className="flex items-center gap-6">
                    <div className="text-black text-xl font-medium leading-[30px]">1.</div>
                    <div className="text-black text-left text-2xl font-bold leading-[30px]">Summarize Documents</div>
                </div>
                <div className="w-[35px] h-[35px] text-black flex items-center justify-end">
                    <Image src={arrow} alt="->" width={800} height={800}/> 
                </div>
            </button>
            }
            { identifyClicked &&
              <button 
              className="w-[1102px] h-[309px] p-4 bg-gray-50 rounded-tr-[20px] rounded-br-[20px] border-l-2 border-violet-500 flex justify-start items-start gap-[18px]"
              onClick={handleIdentifyClick} 
              >
              <div className="text-violet-500 text-xl font-medium leading-[30px]">2.</div>
              <div className="w-[490px] flex flex-col gap-2">
                  <div className="text-black text-2xl text-left font-bold leading-[30px]">Identify Biases</div>
                  <div className="text-left text-black text-lg font-normal leading-[30px]">
                      Using Verum, you can upload your document and receive a full summarization of the document highlighting key points, details, and facts.
                  </div>
              </div>
              <div className="w-[524px] h-[278px] bg-neutral-900 rounded-[10px]" />
              </button> 
            }
            { !identifyClicked &&
            <button className="w-[563px] p-4 bg-gray-50 border-l-2 border-neutral-200 flex justify-between items-center"
            onClick={handleIdentifyClick}>
                <div className="flex items-center gap-6">
                    <div className="text-black text-xl font-medium leading-[30px]">2.</div>
                    <div className="text-black text-left text-2xl font-bold leading-[30px]">Identify Biases</div>
                </div>
                <div className="w-[35px] h-[35px] text-black flex items-center justify-end">
                    <Image src={arrow} alt="->" width={800} height={800}/> 
                </div>
            </button>
            }
              { documentClicked &&
              <button 
              className="w-[1102px] h-[309px] p-4 bg-gray-50 rounded-tr-[20px] rounded-br-[20px] border-l-2 border-violet-500 flex justify-start items-start gap-[18px]"
              onClick={handleDocumentClick} 
              >
              <div className="text-violet-500 text-xl font-medium leading-[30px]">3.</div>
              <div className="w-[490px] flex flex-col gap-2">
                  <div className="text-black text-2xl text-left font-bold leading-[30px]">Document Analysis</div>
                  <div className="text-left text-black text-lg font-normal leading-[30px]">
                      Using Verum, you can upload your document and receive a full summarization of the document highlighting key points, details, and facts.
                  </div>
              </div>
              <div className="w-[524px] h-[278px] bg-neutral-900 rounded-[10px]" />
              </button>          
            }
            { !documentClicked &&
            <button className="w-[563px] p-4 bg-gray-50 rounded-br-[20px] border-l-2 border-neutral-200 flex justify-between items-center"
            onClick={handleDocumentClick}>
                <div className="flex items-center gap-6">
                    <div className="text-black text-xl font-medium leading-[30px]">3.</div>
                    <div className="text-black text-left text-2xl font-bold leading-[30px]">Document Analysis</div>
                </div>
                <div className="w-[35px] h-[35px] text-black flex items-center justify-end">
                    <Image src={arrow} alt="->" width={800} height={800}/> 
                </div>
            </button>
            }
          </div>
        </div>
      </div></>

    

  )
}
