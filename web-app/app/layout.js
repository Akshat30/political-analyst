import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Name.Ai',
  description: 'Name.Ai',
}


export default function RootLayout({ children }) {
  return (
 
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: '#FFF' }}>
        <Navbar />
        <main className="mt-24 flex min-h-screen flex-col px-6 antialiased">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
