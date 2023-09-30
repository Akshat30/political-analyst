"use client";

import '../upload-text/upload-text-styles.css';
import React, { useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import { sendText, sendLink } from './analysis.js';

export default function InputScreen() {
    return (
      <>
        <div className="w-full h-full py-3 flex flex-col">
          <div className="ml-20">
            <h1 className="text-[#131313] text-4xl font-bold">
              Test
            </h1>
            <div className="w-2/3 mt-4">
              <p className="text-gray-400 text-lg font-semibold">
              </p>
            </div>
          </div>
        </div>
      </>
    );

  }
