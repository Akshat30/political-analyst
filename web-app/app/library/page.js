"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TranscriptCard from "./TranscriptCard";
import { transcripts } from "./transcripts";
import { useEffect } from "react";
import { AiFillCaretRight} from "react-icons/ai";

function TryVernum() {
  const [currentPage, setCurrentPage] = useState(1);
  const [transcriptsToShow, setTranscripts] = useState(
    transcripts[currentPage]
  );

  const totalPages = Object.keys(transcripts).length;

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage === totalPages) {
      setCurrentPage(1);
    }
  }

  useEffect(() => {
    setTranscripts(transcripts[currentPage]);
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`${
            currentPage === i
              ? "bg-indigo-600 text-white px-4 py-2 rounded-md mr-2"
              : "bg-gray-300 text-gray-700 hover:bg-indigo-200 px-4 py-2 rounded-md mr-2"
          }`}
        >
          {i}
        </button>
      );
    }

    pageNumbers.push(
      <button onClick={() => nextPage()}  className="bg-gray-300 text-gray-700 hover:bg-indigo-200 px-2 py-2 rounded-md mr-2">
        <AiFillCaretRight />
      </button>
    );

    return pageNumbers;
  };

  return (
    <>
      <div className="w-full h-full py-3 flex flex-col">
        <div className="ml-20">
          <p className="mb-2 text-xl font-semibold text-indigo-600">Library</p>
          <h1 className="text-[#131313] text-4xl font-bold">
            Explore Verum&apos;s Library of Political Speeches, Articles, and
            more.
          </h1>
          <div className="w-2/3 mt-4">
            <p className="text-gray-400 text-lg font-semibold">
              Discover our extensive collection of Political Documents featuring
              the 2024 Presidential candidates and beyond. Powered by Verum.Ai,
              our platform analyzes and condenses all political documents,
              helping you digest information easier. With the option to peruse
              the original documents seamlessly within the Verum.Ai program.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <div className="px-20 mt-4">
            <h1 className="text-[#131313] text-2xl font-bold">
              Recent Transcripts
            </h1>
            <div className="flex justify-center mt-4">
              {renderPageNumbers()}
            </div>
            <div className="mt-8 mb-4">
              <div className="grid grid-cols-3 gap-8">
                {transcriptsToShow.map((transcript, index) => (
                  <TranscriptCard
                    key={index}
                    name={transcript.name}
                    date={transcript.date}
                    speaker={transcript.speaker}
                    url={transcript.url}
                    img={transcript.img}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TryVernum;

// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import TranscriptCard from "./TranscriptCard";
// import { transcripts } from "./transcripts";

// function TryVernum() {
//   return (
//     <>
//       <div className="w-full h-full py-3 flex flex-col">
//         <div className="ml-20">
//           <p className="mb-2 text-xl font-semibold text-indigo-600">
//             Library
//           </p>
//           <h1 className="text-[#131313] text-4xl font-bold">
//             Explore Verum's Library of Political Speeches, Articles, and more.
//           </h1>
//           <div className="w-2/3 mt-4">
//             <p className="text-gray-400 text-lg font-semibold">
//               Discover our extensive collection of Political Documents featuring
//               the 2024 Presidential candidates and beyond. Powered by Verum.Ai,
//               our platform analyzes and condenses all political documents,
//               helping you digest information easier. With the option to peruse
//               the original documents seamlessly within the Verum.Ai program.
//             </p>
//           </div>
//         </div>
//         <div className="mt-12">
//           <div className="px-20 mt-4">
//             <h1 className="text-[#131313] text-2xl font-bold">
//               Recent Transcripts
//             </h1>
//             <div className="mt-4 mb-4">
//               <div className="grid grid-cols-3 gap-8">
//                 {transcripts[1].map((transcript) => (
//                   <TranscriptCard
//                     name={transcript.name}
//                     date={transcript.date}
//                     speaker={transcript.speaker}
//                     url={transcript.url}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default TryVernum;
