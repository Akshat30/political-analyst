import Link from 'next/link';
import logo from "../symbols/logo.png";
import Image from 'next/image'
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar" >
      <div className="mx-10 mt-2">
        <div className="w-full pl-8 pr-6 py-4 rounded-[66px] border-2 border-black bg-white justify-center items-center gap-[33px] inline-flex">
          <div className="justify-center items-center gap-12 flex">
            <Link href="/" className="justify-center items-center flex">
              <div className="w-[70px] h-[35px] relative">
              <Image src={logo} alt=""/>
              </div>
              <div className="text-neutral-900 text-xl font-bold leading-normal">Verum</div>
            </Link>
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
            <div className="px-6 py-3 bg-violet-700 hover:bg-violet-900 rounded-[100px] justify-center items-center gap-1 flex">
              <Link href="/upload-text" className="text-center text-white text-base font-semibold leading-snug tracking-tight">Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;