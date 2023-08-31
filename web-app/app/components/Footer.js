import Image from 'next/image'
import React from 'react'

export default function Footer() {
  return (
    <footer class="bg-white rounded-lg shadow m-16">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
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
      </div>
  </footer>
  )
}
