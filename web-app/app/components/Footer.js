import Image from 'next/image'
import React from 'react'
import logo from "../symbols/logo.png";


export default function Footer() {
  return (
    <footer className="bg-white">

     

<div className="w-full h-[326px] px-14 py-10 bg-zinc-100 flex-col justify-center items-center gap-2.5 inline-flex">
  <div className="self-stretch h-[246px] flex-col justify-start items-start gap-[78px] flex">
    <div className="self-stretch justify-start items-start gap-[78px] inline-flex">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="justify-center items-center gap-2.5 inline-flex">
          <div className="w-[70px] h-[35px] relative">
              <Image src={logo}/>
            </div>
          <div className="text-neutral-900 text-2xl font-bold leading-normal">Verum</div>
        </div>
        <div className="w-[427px] opacity-90 text-neutral-900 text-base font-medium leading-normal">Helping you make informed voting decisions for the 2024 Presidential Election</div>
      </div>
      <div className="justify-start items-start gap-[45px] flex">
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-amber-300 text-lg font-bold leading-normal">Company</div>
          </div>
          <div className="text-neutral-900 text-base font-medium leading-normal">About</div>
          <div className="text-neutral-900 text-base font-medium leading-normal">Register to Vote</div>
        </div>
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-amber-300 text-lg font-bold leading-normal">Library</div>
          </div>
          <div className="text-neutral-900 text-base font-medium leading-normal">Speeches</div>
          <div className="text-neutral-900 text-base font-medium leading-normal">Articles</div>
          <div className="text-neutral-900 text-base font-medium leading-normal">Texts</div>
        </div>
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-amber-300 text-lg font-bold leading-normal">Presidential Candidates</div>
          </div>
          <div className="text-neutral-900 text-base font-medium leading-normal">Republican</div>
          <div className="text-neutral-900 text-base font-medium leading-normal">Democratic</div>
          <div className="text-neutral-900 text-base font-medium leading-normal">Independent</div>
        </div>
      </div>
    </div>
    <div className="justify-end items-center inline-flex">
      <div className="text-neutral-900 text-sm font-medium leading-normal">© 2023 Candidate Match / Dereck / AJ / Megan / Juliana / Marco</div>
    </div>
  </div>
</div>
        
        
  </footer>
  )
}