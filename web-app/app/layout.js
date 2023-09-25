"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import React from 'react';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  React.useEffect(() => {
    document.body.style.backgroundColor = "white";
  }, []);
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
