"use client";

import './try-verum-styles.css';
import React, { useState } from 'react';
import InputField from '../components/input-field.client';
//import BiasDetector from '../api/gpt.mjs'
import validator from "validator"; // check urls
import axios from "axios"; // api call
import cheerio from "cheerio"; // parse html code from rev.com


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
    const handleButtonClick = async () => {
      if (validator.isURL(inputText) === false) {
        console.log("\n" + url + " is not a valid URL.");
        process.exit();
      }
  
      if (inputText.includes("rev.com")) {
        console.log("\n[Using hard-coded Cheerio function for rev]\n");
        try {
          // Fetch the HTML content
          const response = await axios.get(inputText);
  
          // Load the HTML content into Cheerio
          const $ = cheerio.load(response.data);
  
          // Find all div elements with the specified class
          const divTags = $("div.fl-callout-text");
  
          // Extract and format the text
          let formattedText = "";
  
          divTags.each((index, element) => {
            const text = $(element).text().trim();
            if (text) {
              // Add two newline characters to separate transcript entries
              formattedText += text + "\n\n";
            }
          });
  
          console.log(formattedText);
        } catch (error) {
          console.error("Error fetching or parsing the HTML:", error);
          return null;
        }
      } else {
        // extactor api
        console.log("\n[Using extractor API]\n");
        const extractApi = process.env.EXTRACTER_API_KEY;
        // const extractApi = '418285cde14600f1a120861a1198d0dd273d7fe4';
        const endpoint = "https://extractorapi.com/api/v1/extractor";
        const params = `apikey=${extractApi}&url=${inputText}`;
        const response = await fetch(endpoint + "?" + params);
        const data = await response.json();
  
        console.log(data.text); // Assuming "text" is the key in the response containing the transcript
      }
    }
    
    
    return (
      <>
      <div className='title'>
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
        
      </div>

      </>
    );
    
  }
  
  export default TryVernum;
  