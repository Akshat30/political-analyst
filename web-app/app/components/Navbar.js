import Link from 'next/link';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar h-10">
        <div className="flex items-center">
            <div className="w-1/6 flex justify-start">
              <Link href="/">
                <a>Home</a>  {/* Updated to include an anchor tag */}
              </Link>
            </div>
            <div className="w-1/6 flex justify-start">
              <Link href="/library">
                <a className="text-black text-[15px] font-medium leading-normal">Library</a>
              </Link>
            </div>
            <div className="w-1/6 flex justify-start">
              <a href="https://vote.gov/" className="text-black text-[15px] font-medium leading-normal">Register to Vote</a>
            </div>
            <div className="w-3/5 flex justify-end" style={{marginRight: '3rem'}}>
              <div className="w-40 h-8 px-4 bg-neutral-600 rounded-2xl items-center inline-flex justify-center">
                <Link href="/vernum">
                  <a className="text-zinc-300 text-base font-medium leading-normal">Try Vernum</a>
                </Link>
              </div>
            </div>
        </div>
    </nav>
  );
}

export default Navbar;
