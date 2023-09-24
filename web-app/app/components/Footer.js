import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer class="bg-white">
      {/* <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
                <a href="/" class="flex items-center">
                    <Image src="icons/photo.svg" class="h-8 mr-3" alt="Logo"  width={40} height={40} />
                    <span class="self-center text-2xl font-semibold text-gray-900 whitespace-nowrap">Name.ai</span>
                </a>
                <div class="mt-2 mr-10 mb-4">
                  <h3 class="text-gray-500 dark:text-gray-400 font-medium">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec.
                  </h3>
                </div>
                <div class="flex mt-6 space-x-5 sm:mt-0 mb-12">
                  <Image src="icons/circle.svg" width={50} height={50} />
                  <Image src="icons/circle.svg" width={50} height={50} />
                  <Image src="icons/circle.svg" width={50} height={50} />
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                <div>
                    <h2 class="mb-2 text-sm font-semibold text-gray-900">Presidential Candidates</h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                        <li class="mb-2">
                            <a href="" class="hover:underline">Republican</a>
                        </li>
                        <li class="mb-2">
                            <a href="" class="hover:underline">Democractic</a>
                        </li>
                        <li class="mb-2">
                            <a href="" class="hover:underline">Independent</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-2 text-sm font-semibold text-gray-900">Other</h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                        <li class="mb-2">
                            <a href="" class="hover:underline ">About</a>
                        </li>
                        <li class="mb-2">
                            <a href="" class="hover:underline">Register to Vote</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="mb-2 text-sm font-semibold text-gray-900">Library</h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                        <li class="mb-2">
                            <a href="#" class="hover:underline">Speeches</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="hover:underline">Articles</a>
                        </li>
                        <li class="mb-2">
                            <a href="#" class="hover:underline">Texts</a>
                        </li>
                    </ul>
                </div>
            </div>
      </div>
        <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" class="hover:underline">Name.ai</a> / Dereck / AJ / Megan / Juliana / Marco
            </span>
        </div>
      </div> */}

        {/* <div className="w-full px-14 py-10 bg-neutral-800 flex flex-col items-center gap-2.5">
          <div className="w-full flex flex-col items-start gap-[78px]">
            <div className="w-full flex flex-wrap justify-between gap-4">
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-2.5">
                  <img className="w-[69.55px] h-[34.02px] transform -rotate-12 rounded-sm" src="https://via.placeholder.com/70x34" />
                  <div className="text-neutral-200 text-2xl font-bold leading-normal">Candidate Match</div>
                </div>
                <div className="w-full md:w-auto opacity-90 text-neutral-200 text-base font-medium leading-normal">Helping you make informed voting decisions for the 2024 Presidential Election</div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col items-start gap-4">
                  <div className="text-amber-300 text-lg font-bold leading-normal">Verum</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">About</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">Register to Vote</div>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div className="text-amber-300 text-lg font-bold leading-normal">Library</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">Speeches</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">Articles</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">Texts</div>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div className="text-amber-300 text-lg font-bold leading-normal">Presidential Candidates</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">Republican</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">Democratic</div>
                  <div className="text-neutral-200 text-base font-medium leading-normal">Independent</div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">
              <div className="text-neutral-200 text-sm font-medium leading-normal">© 2023 Candidate Match / Dereck / AJ / Megan / Juliana / Marco / Celeste</div>
            </div>
          </div>
        </div> */}

<div className="w-full h-[326px] px-14 py-10 bg-zinc-100 flex-col justify-center items-center gap-2.5 inline-flex">
  <div className="self-stretch h-[246px] flex-col justify-start items-start gap-[78px] flex">
    <div className="self-stretch justify-start items-start gap-[78px] inline-flex">
      <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
        <div className="justify-center items-center gap-2.5 inline-flex">
          <img className="w-[69.55px] h-[34.02px] origin-top-left rotate-[-11.63deg] rounded-sm" src="https://via.placeholder.com/70x34" />
          <div className="text-neutral-900 text-2xl font-bold leading-normal">Candidate Match</div>
        </div>
        <div className="w-[427px] opacity-90 text-neutral-900 text-base font-medium leading-normal">Helping you make informed voting decisions for the 2024 Presidential Election</div>
      </div>
      <div className="justify-start items-start gap-[45px] flex">
        <div className="flex-col justify-start items-start gap-4 inline-flex">
          <div className="justify-start items-start gap-2.5 inline-flex">
            <div className="text-amber-300 text-lg font-bold leading-normal">Name.Ai</div>
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
      <div className="text-neutral-900 text-sm font-medium leading-normal">© 2023 Candidate Match / Dereck / AJ / Megan / Juliana / Marco / Celeste</div>
    </div>
  </div>
</div>
        
        
  </footer>
  )
}