import React, { useState } from 'react';

export function ResizableText({className, id, placeholder}){
    const [inputValue, setInputValue] = useState('')
    const [inputHeight, setInputHeight] = useState('auto')

    const handleInputChange = (e)=>{
        setInputValue(e.target.value);
        setInputHeight(`${e.target.scrollHeight}px`);
    }
    return (
        <textarea
          className={className}
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          style={{height: inputHeight}}
          placeholder={placeholder}
        />
    );
}