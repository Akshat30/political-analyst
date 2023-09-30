import Link from 'next/link';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar" >

        {/* LOGO & PRODUCT NAME IMAGE LINKS  TODO: change later */}

        {/* <div className="flex items-center">
            <div className="w-1/6 flex justify-start">
            </div>
            <div className="w-1/6 flex justify-start">
              <Link href="/library" className="text-black text-[15px] font-medium leading-normal " >Library</Link>
            </div>
            <div className="w-1/5 flex justify-start">
              <Link href="/presidential-candidates" className="text-black text-[15px] font-medium leading-normal" >Presidential Candidates</Link>
            </div>
            <div className="w-1/6 flex justify-center">
              <Link href="/about" className="text-black text-[15px] font-medium leading-normal" >About</Link>
            </div>
            <div className="w-1/6 flex justify-center">
              <Link href="https://vote.gov/" className="text-black text-[15px] font-medium leading-normal" >Register to Vote</Link>
            </div>

            <Link href="/try-verum" className="w-2/3">
              <div className="flex justify-end" style={{marginRight: '3rem'}}>
              <div className="w-40 h-8 px-4 bg-neutral-600 rounded-2xl items-center inline-flex justify-center">
                <div className="text-zinc-300 text-base font-medium leading-normal">Try Verum </div>
              </div>
              </div>
            </Link>
        </div> */}

      <div className="mx-10 mt-2">
        <div className="w-full pl-8 pr-6 py-4 rounded-[66px] border-2 border-black backdrop-blur-sm justify-center items-center gap-[33px] inline-flex">
          <div className="justify-center items-center gap-12 flex">
            <div className="justify-center items-center flex">
              <div className="w-[79.18px] h-[42.90px] relative">
              {/* <img src="web-app/logo.png" alt="Logo" class="w-full h-full object-cover" /> */}
              </div>
              <Link href="/" className="text-neutral-900 text-xl font-bold leading-normal">Candidate Match</Link>
            </div>
            <div className="justify-center items-center gap-6 flex">
              <Link href="/about" className="opacity-90 text-neutral-900 text-base font-medium leading-normal">About</Link>
              <Link href="/library" className="opacity-90 text-neutral-900 text-base font-medium leading-normal">Library</Link>
              <Link href="/presidential-candidates" className="opacity-90 text-neutral-900 text-base font-medium leading-normal">Presidential Candidates</Link>
            </div>
          </div>
          <div className="grow shrink basis-0  justify-end items-start gap-6 flex">
            <div className="px-6 py-3 rounded-[100px] bg-amber-300 hover:bg-amber-400 justify-center items-center gap-1 flex">
              <Link href="https://vote.gov/"className="text-center text-black text-base font-semibold leading-snug tracking-tight">Register to Vote</Link>
            </div>
            <div className="px-6 py-3 bg-violet-700 hover:bg-violet-500 rounded-[100px] justify-center items-center gap-1 flex">
              <Link href="/upload-text" className="text-center text-white text-base font-semibold leading-snug tracking-tight">Try Verum</Link>
            </div>
          </div>
        </div>
      </div>

        
        

    </nav>
  );
}

export default Navbar;