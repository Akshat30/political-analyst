"use client";

import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
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

  function renderStat(number, label) {
    return (
      <div className="flex-col justify-start items-center inline-flex text-violet-500 font-bold text-6xl">
          {number}
        <div className="text-center text-neutral-900 text-xl font-medium">{label}</div>
      </div>
    );
  }

  const [animationText, setAnimationText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationText((prevText) => (prevText + 1) % 3);
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  const animationTexts = ['Text.', 'Speeches', 'Articles'];

  function TextAnimation({ text }) {
    return (
      <span className="font-black animation-fade">{text}</span>
    );
  }

  const Card = ({ title, date, speaker, pol_party }) => (
    <div className="w-[535px] px-6 py-4 bg-zinc-100 rounded-[15px] justify-start items-center gap-6 inline-flex">
      <div className="w-[99px] h-[100.01px] relative bg-sky-300 rounded-[10px]" />
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
        <div className="self-stretch h-[60px] flex-col justify-start items-start gap-1 flex">
          <div className="justify-center items-center inline-flex">
            <div className="text-neutral-900 text-2xl font-bold">{speaker}</div>
            <div className="self-stretch px-2 py-1 bg-violet-700 rounded-[10px] justify-center items-center gap-2 inline-flex">
              <div className="text-neutral-900 text-sm">{pol_party}</div>
            </div>
          </div>
          <div className="self-stretch h-6 flex-col justify-start items-start gap-2.5 flex">
            <div className="text-lg font-medium leading-normal text-black">{title}</div>
          </div>
        </div>
        <div className="w-[364px] h-[27px] pr-[249px] pt-[3.49px] pb-[2.51px] justify-start items-center inline-flex">
          <div className="w-[115px] self-stretch justify-center items-center inline-flex">
            <div className="text-base font-normal leading-snug text-black">{date}</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="w-full h-[491px] py-14 flex flex-col items-center gap-10">
      <div className="w-[1081px] text-center text-black text-7xl font-bold leading-tight">
          Find the right presidential candidate for you
      </div>

      <div className="w-[652px] h-16 text-center text-black text-xl font-bold leading-loose">
          Save your minutes and make informed voting decisions with our ever-growing library and cutting edge technology, Verum.
      </div>
    
      <div className="flex items-center gap-6">
          <Link href="/presidential-candidates" className="px-10 py-[18px] rounded-full border-2 border-black flex items-center gap-[18.41px]">
              <div className="text-center text-black text-lg font-bold leading-7">View Presidential Candidates</div>
          </Link>
          <Link href="/upload-text" className="h-16 px-12 py-[18px] bg-violet-700 rounded-full flex items-center gap-[17.51px]">
              <div className="text-center text-neutral-200 text-lg font-bold leading-7">Try Verum</div>
          </Link>
      </div>

    </div>
    <div className="w-full h-[643px] my-20 ml-40 flex-col justify-start gap-12 inline-flex text-black">
      <div className="flex flex-col items-start h-[152px]">
          <div className="text-violet-500 text-lg font-bold leading-normal mb-2.5">Features</div>
          <div className="text-black text-4xl font-bold leading-[47.71px] mb-2.5">Discover Unbiased Information in minutes, not hours</div>
          <div className="w-[1092px] text-black text-xl font-medium leading-[30px]">Enhance your decision-making process, effortlessly summarize and break down documents, and free up your time for what truly matters. Verum AI provides all the tools you require.</div>
      </div>

        <div className="flex-col flex">
          <div className="flex-col items-start flex">
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
            <button className="w-[563px] p-4 bg-gray-50 border-l-2 border-neutral-200 flex justify-between items-start"
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
      </div>

      <div className="w-[1440px] h-[467px] py-14 bg-zinc-100 flex-col justify-center items-center gap-14 inline-flex">
      <div className="flex-col justify-start items-start gap-4 flex">
        <div className="h-[92px] flex-col justify-start items-start flex">
          <div className="flex-col justify-start items-start flex">
              <div className="text-lg font-bold text-violet-500">
                Why use Verum.Ai?
              </div>
          </div>
            <div className="py-2.5 text-4xl font-bold text-violet-500">
            The ideal AI model to help you discover bias in <TextAnimation text={animationTexts[animationText]} />
            </div>
        </div>
              <div className="w-[1102px] justify-center text-black text-xl font-medium">
                The Worlds Most Articulated Bias detector for voters. Powered by ChatGPT and crafted with accessibility and inclusivity in mind.
              </div>
      </div>
      <div className="justify-start items-start gap-[88px] inline-flex">
        {renderStat("100+", "Documents Available")}
        {renderStat("1,000", "Biases Identified")}
        {renderStat("100+", "Politicians Available")}
      </div>
    </div>

    <div className="w-full h-[694.03px] mt-36 flex-col justify-start items-center gap-12 inline-flex">
      <div className="flex-col justify-center items-center gap-2.5 flex">
        <div className="self-stretch h-[113px] flex-col justify-center items-start flex">
          <div className="flex-col justify-start items-start gap-2.5 flex">
            <div className="text-center text-violet-500 text-base font-bold leading-snug">Can’t get Started?</div>
          </div>
          <div className="py-2.5 justify-start items-center gap-2.5 inline-flex">
            <div className="text-center text-neutral-900 text-4xl font-bold leading-[47.71px]">Read from our Extensive Library of Political Documents</div>
          </div>
            <div className="justify-start items-center gap-2.5 inline-flex">
              <div className="text-center text-neutral-900 text-lg font-medium leading-normal">Pre-Analyzed documents from various political figures!</div>
            </div>
        </div>
      </div>
      <div className="flex-col justify-start items-end gap-4 flex">
        <div className="justify-center items-start gap-8 inline-flex">
          <div className="self-stretch flex-col justify-start items-start gap-6 inline-flex">
            <Card title="2020 Oval Office Address" date="March 11, 2020" speaker="Donald Trump" pol_party="Republican"/>
            <Card title="2020 Oval Office Address" date="March 11, 2020" speaker="Donald Trump" pol_party="Republican"/>
            <Card title="2020 Oval Office Address" date="March 11, 2020" speaker="Donald Trump" pol_party="Republican"/>
          </div>
            <div className="p-4 rounded-[20px] border-2 border-violet-700 justify-end items-center gap-2.5 flex">
              <div className="justify-center items-center flex">
                <div className="text-neutral-900 text-base font-black leading-snug">View Full Library</div>
              </div>
            </div>
        </div>
      </div>
    </div>

    <div className="w-[1057px] h-[333px] m-40 p-9 bg-zinc-100 rounded-[30px] justify-center items-center gap-2.5 ">
      <div className="text-center text-violet-700 font-bold">Get Started!</div>
      <div className="text-center text-neutral-900 text-4xl font-bold mt-3">Embark on Unbiased Informed Voting</div>
      <div className="text-center text-neutral-900 text-lg font-medium mt-3">Why wait any longer? Name.Ai is brimming with all the essentials to kickstart your journey towards making impactful and well-informed voting decisions.</div>
      <Link href="/upload-text" className="w-[218px] h-[72px] px-10 py-5 mx-96 my-10 bg-violet-700 rounded-[20px] justify-center items-center gap-2.5 inline-flex">
        <div className="text-zinc-100 text-lg font-medium leading-normal">Try Verum</div>
      </Link>
    </div>

      </>

    

  )
}
