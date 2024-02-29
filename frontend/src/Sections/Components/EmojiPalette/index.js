import React from 'react';
import './index.css';
import { Popover } from 'antd';


function EmojiPalette({inputValue, setInputValue}) {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setInputValue(inputValue + emoji.target.innerText);
  };
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
  ];
  const content = (
    <div className='emojis'>
      {emojis.map((e,key) => {
        return (
          <span
            key={key}
            onClick={handleEmojiClick}
          >{e}</span>
        )
      })}
    </div>
  );

  return (
    <div className="emoji-input-container">
      <input
        type="text"
        className='input-groupName'
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Group Name"
      />

      <Popover content={content} title="" trigger="click">
        <button>😃</button>
      </Popover>
    </div>
  );
}

export default EmojiPalette;
