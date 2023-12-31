import React from 'react';

function InputField({ placeholder, style, inputText, setInputText }) {
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <input 
      style={{
        ...style, 
        color: '#000000',
        padding: '10px',
      }}
      type="text" 
      value={inputText} 
      onChange={handleChange} 
      placeholder= {placeholder}
    />
  );
}

export default InputField;

