import Image from 'next/image'
import Layout from 'app/layout.js';
import Navbar from './components/Navbar.js';

export default function Home() {
  return (
    <div className="w-full h-[491px] py-14 flex-col justify-start items-center gap-10 inline-flex">
      <div className="self-stretch h-[174px] flex-col justify-center items-center gap-2.5 flex">
        <div className="w-[1081px] text-center text-gray-100 text-7xl font-bold leading-tight">Find the right presidential candidate for you</div>
      </div>
      <div className="self-stretch h-[165px] flex-col justify-center items-center gap-8 flex">
        <div className="w-[652px] h-16 justify-center items-center inline-flex">
          <div className="w-[652px] text-center text-neutral-200 text-xl font-bold leading-loose">Save your minutes and make informed voting decisions with our ever-growing library and cutting edge technology, Verum.Ai.</div>
        </div>
        <div className="self-stretch h-[69px] justify-center items-center gap-6 inline-flex">
          <div className="px-10 py-[18px] rounded-full border-2 border-neutral-200 justify-center items-center gap-[18.41px] flex">
            <div className="text-center text-neutral-200 text-lg font-bold leading-7">View Presidential Candidates</div>
          </div>
          <div className="h-16 px-12 py-[18px] bg-violet-700 rounded-full justify-center items-center gap-[17.51px] flex">
            <div className="text-center text-neutral-200 text-lg font-bold leading-7">Try Verum</div>
          </div>
        </div>
      </div>
    </div>

  )
}
