import Link from 'next/link';
import './Navbar.css';

function Navbar() {
  return (
    <nav class="navbar" className='h-10'>

        {/* LOGO & PRODUCT NAME IMAGE LINKS  TODO: change later */}

        <div className="flex items-center">
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

            <Link href="/try-vernum" className="w-2/3">
              <div className="flex justify-end" style={{marginRight: '3rem'}}>
              <div className="w-40 h-8 px-4 bg-neutral-600 rounded-2xl items-center inline-flex justify-center">
                <div className="text-zinc-300 text-base font-medium leading-normal">Try Vernum </div>
              </div>
              </div>
            </Link>
        </div>
        

    </nav>
  );
}

export default Navbar;