"use client";

import './upload-text-styles.css';
import React, { useState } from 'react';
import InputField from '../components/input-field.client';
//import BiasDetector from '../api/gpt.mjs'
import validator from "validator"; // check urls
import axios from "axios"; // api call
import cheerio from "cheerio"; // parse html code from rev.com
import Image from 'next/image'
import text_symbol from './text.png'
import link_symbol from './link.png'
import Link from 'next/link';


function TryVernum() {

    const [inputText, setInputText] = useState('');
    // const biasDetector = new BiasDetector();

    // const handleButtonClick = async () => {
    //   try {
    //     const transcript = await biasDetector.getTranscript(inputText);
    //     console.log(transcript);
    //   } catch (error) {
    //     console.error('Error getting transcript:', error);
    //   }
    // };
    // const handleButtonClick = async () => {
    //   console.log('handle click')
    //   try {
    //     const response = await fetch(`/api/getTranscript?url=${encodeURIComponent(inputText)}`);
    //     const data = await response.json();
    //     console.log(data.transcript);
    //   } catch (error) {
    //     console.error('Error getting transcript:', error);
    //   }
    // };
    // const handleButtonClick = async () => {
    //   if (validator.isURL(inputText) === false) {
    //     console.log("\n" + url + " is not a valid URL.");
    //     process.exit();
    //   }
  
    //   if (inputText.includes("rev.com")) {
    //     console.log("\n[Using hard-coded Cheerio function for rev]\n");
    //     try {
    //       // Fetch the HTML content
    //       const response = await axios.get(inputText);
  
    //       // Load the HTML content into Cheerio
    //       const $ = cheerio.load(response.data);
  
    //       // Find all div elements with the specified class
    //       const divTags = $("div.fl-callout-text");
  
    //       // Extract and format the text
    //       let formattedText = "";
  
    //       divTags.each((index, element) => {
    //         const text = $(element).text().trim();
    //         if (text) {
    //           // Add two newline characters to separate transcript entries
    //           formattedText += text + "\n\n";
    //         }
    //       });
  
    //       console.log(formattedText);
    //     } catch (error) {
    //       console.error("Error fetching or parsing the HTML:", error);
    //       return null;
    //     }
    //   } else {
    //     // extactor api
    //     console.log("\n[Using extractor API]\n");
    //     const extractApi = process.env.EXTRACTER_API_KEY;
    //     const endpoint = "https://extractorapi.com/api/v1/extractor";
    //     const params = `apikey=${extractApi}&url=${inputText}`;
    //     const response = await fetch(endpoint + "?" + params);
    //     const data = await response.json();
  
    //     console.log(data.text); // Assuming "text" is the key in the response containing the transcript
    //   }
    // }
    const handleButtonClick = async () => {
        // extactor api
        console.log("\n[Using extractor API]\n");
        const extractApi = process.env.EXTRACTER_API_KEY;
        const endpoint = "https://extractorapi.com/api/v1/extractor";
        const params = `apikey=${extractApi}&url=${inputText}`;
        const response = await fetch(endpoint + "?" + params);
        const data = await response.json();
  
        console.log(data.text); // Assuming "text" is the key in the response containing the transcript
      
    }
    
    
    return (
      <>
      {/* <div className='title'>
        Verum / Bias Identifier
      </div>
      <div className='text-entry-container'>
        Enter the link to a transcript/article:
        <InputField 
          placeholder="ex: rev.com/blog/transcripts"
          style={{
            width: '100%',
            borderRadius: '15px',
            border: '2px solid var(--headings, #8B8888)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '10px',
          }}
          className="input-link"
          inputText={inputText} 
          setInputText={setInputText}
          />

        <div style={{ alignSelf: 'flex-end'}}>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleButtonClick}>
            Send to Verum
          </button>
        </div>
        
      </div> */}

      <div className="w-full h-full py-3 flex flex-col items-center gap-[335px] ">
        <div className="w-full max-w-[1328px] h-[507px] flex items-start gap-[22px]">
          <div className="w-[414px] h-full p-6 bg-neutral-800 rounded-[20px] flex flex-col items-start gap-2.5">
            <div className="flex items-center gap-4">
              <div className="text-neutral-200 text-xl font-bold leading-normal">Verum.Ai</div>
            </div>
            <div className="w-full border-b border-neutral-200 my-2"></div>
            <div className="h-[407px] flex flex-col items-start gap-16">
              <div className="flex flex-col items-start gap-9">
                <div className="flex flex-col items-start gap-6">
                  <Link href="/upload-text" class="flex items-center gap-4">
                    <div className="w-[51px] h-[52px] p-[15px] bg-neutral-700 rounded-[10px] flex items-center gap-2.5">       
                      <Image src={text_symbol} alt="r" width={800} height={800}/> 
                    </div>
                    <div className="text-neutral-200 text-lg font-bold leading-normal">Upload Text</div>
                  </Link>
                  <Link href="/upload-link" class="flex items-center gap-4">
                    <div className="w-[51px] h-[51px] p-[15px] bg-violet-700 rounded-[10px] flex items-center gap-2.5">
                    <Image src={link_symbol} alt="r" width={800} height={800}/> 
                    </div>
                    <div className="text-neutral-200 text-lg font-bold leading-normal">Upload Link</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="py-2 rounded-[10px] flex flex-col items-center gap-[9px]">
              <div className="text-center text-neutral-200 text-base font-medium leading-normal">Don’t have a document to upload?</div>
              <div className="w-full px-9 py-4 rounded-[20px] border-2 border-neutral-200 flex items-center justify-center ">
                <div className="justify-center text-gray-100 text-lg font-medium leading-normal">View Our Library</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-10">
            <div className="w-full flex flex-col items-start">
              <div className=" h-[50px] pl-[31px] pr-8 py-[13px] bg-violet-700 rounded-t-[20px] flex items-center">
                <div className="text-neutral-200 text-base font-bold leading-normal">Link Entry</div>
              </div>
              <div className="w-full h-[223px] p-6 bg-neutral-700 rounded-b-[20px] rounded-r-[20px] flex flex-col items-start gap-6">
                <div className="w-full h-24 flex flex-col items-start gap-4">
                  <div className="text-neutral-200 text-base font-medium leading-normal">Copy/paste or type in bodies of text you wish to analyze.</div>
                  <InputField className="input-link w-full h-14 px-6 py-4 rounded-[15px] border-2 border-neutral-200 flex items-start"
                  placeholder="Enter Text..."
                  style={{
                    width: '100%',
                    borderRadius: '15px',
                    border: '2px solid var(--text, #E0E0E0)',
                    backgroundColor: '#393939',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '10px',
                    paddingLeft: '1em'
                  }}
                  inputText={inputText} 
                  setInputText={setInputText}>
                  </InputField>
                </div>
                <div className="w-full flex items-center justify-end gap-2.5">
                  <div className="p-3 rounded-[20px] border-2 border-neutral-200 flex items-center gap-4">
                    <button className="text-neutral-200 text-lg font-bold leading-normal"
                    onClick={handleButtonClick}>
                      Send to Vernum
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[194px] flex flex-col items-start">
              <div className=" px-[31px] py-[13px] bg-violet-700 rounded-t-[20px] flex items-center gap-2.5">
                <div className="text-neutral-200 text-base font-bold leading-normal">Verum</div>
              </div>
              <div className="w-full h-36 p-6 bg-neutral-700 rounded-b-[20px] rounded-r-[20px] flex flex-col items-start gap-6">
                <div className="w-full h-24 flex flex-col items-start gap-4">
                  <div className="text-neutral-200 text-base font-medium leading-normal">Upload a text, link, file to get started</div>
                  <div className="w-full h-14 px-6 py-4 rounded-[15px] border-2 border-neutral-200 flex items-start">
                    <div className="text-neutral-200 text-base font-medium leading-normal">Awaiting Results...</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      </>
    );
    
  }
  
  export default TryVernum;
  