import Link from 'next/link';
import './Navbar.css';

function Navbar() {
  return (
    <nav class="navbar" className='h-10'>

        {/* LOGO & PRODUCT NAME IMAGE LINKS  TODO: change later */}
        <Link href="/" style={{ backgroundColor: '#A9A9A9', marginLeft: '2rem', marginRight: '0.5rem'}}>   </Link>
        <Link href="/" style={{ backgroundColor: '#A9A9A9', marginRight: '3rem'}}></Link>

        <Link href="/library" className="text-black text-[15px] font-medium leading-normal " style={{ marginRight: '3rem'}}>Library</Link>
        <Link href="/presidential-candidates" className="text-black text-[15px] font-medium leading-normal" style={{ marginRight: '3rem'}}>Presidential Candidates</Link>
        <Link href="/about" className="text-black text-[15px] font-medium leading-normal" style={{ marginRight: '3rem'}}>About</Link>
        <Link href="/register-to-vote" className="text-black text-[15px] font-medium leading-normal" style={{ marginRight: '40rem'}}>Register to Vote</Link>

            <div className="w-32 h-8 px-4 bg-neutral-600 rounded-2xl items-center inline-flex justify-center">
                <div className="text-zinc-300 text-base font-medium leading-normal">Try Name.Ai </div>
            </div>
        

    </nav>
  );
}

export default Navbar;

