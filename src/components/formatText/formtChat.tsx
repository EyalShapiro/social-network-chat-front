import React, { useState, useRef } from 'react';
import { FormatOptionType, formattersOptions } from './formattersOptions';
import { formatText } from './formatText';

function ChatApp() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const getSelectedText = () => {
    const textareaElemnt = textareaRef.current;
    // Get the start and end positions of the current text selection
    const selectionStartIndex = textareaElemnt?.selectionStart ?? 0;
    const selectionEndIndex = textareaElemnt?.selectionEnd ?? 0;

    // Extract the selected text
    const selectedText = textareaElemnt?.value?.substring(selectionStartIndex, selectionEndIndex) || undefined;
    return { selectionStartIndex, selectionEndIndex, selectedText };
  };
  function handleFormat(char: string) {
    // Return early if the textarea reference is not available
    if (!textareaRef.current) return;

    const { selectionStartIndex, selectionEndIndex, selectedText } = getSelectedText();

    if (selectedText) {
      // Format the selected text with the specified wrapper characters
      const formattedText = `${char}${selectedText}${char}`;

      const updatedText =
        textareaRef.current.value.substring(0, selectionStartIndex) +
        formattedText +
        textareaRef.current.value.substring(selectionEndIndex); // Create the updated text with the formatted selection

      setInputValue(updatedText); // Update the input value with the newly formatted text

      // Move the cursor to the end of the newly formatted text
      const cursorPosition = selectionStartIndex + formattedText.length;
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
    } else {
      setInputValue((prevValue) => prevValue + selectedText);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Return early if the textarea reference is not available
    if (!textareaRef.current || !event) return;

    if (event.code.includes('Enter')) {
      // Check for Enter key press with Shift or Alt to insert a new line
      if (event.shiftKey || event.altKey) {
        event.preventDefault();
        setInputValue((previousValue: string) => previousValue + '\n');
      } else return sendMessage(); // Check for Enter key press to send a message
    } else if (getSelectedText().selectedText) {
      const findKeyFormat = formattersOptions.find(
        (option: FormatOptionType) => option.keyboardCharEvent === event.key
      ); // Find the formatting option associated with the pressed keyboard character

      if (findKeyFormat) {
        event.preventDefault();
        handleFormat(findKeyFormat.charFormt);
      }
      const pressedKey = event.code.toLowerCase().replace(/^key/, ''); // Remove "key" prefix
      if (!pressedKey) return;

      const findCtrlKeyFormat = formattersOptions.find(
        (option: FormatOptionType) => option.ctrlKeyEvent === pressedKey
      ); // Find the formatting option associated with the Ctrl key and the pressed key

      if (event.ctrlKey && findCtrlKeyFormat) {
        event.preventDefault();
        handleFormat(findCtrlKeyFormat.charFormt);
      }
    }
    return;
  }
  const sendMessage = () => {
    const textareaValue = textareaRef.current?.value.trim();
    if (textareaValue) {
      setMessages((prev) => [...prev, formatText(textareaValue)]);
      setInputValue('');
    }
  };

  return (
    <div>
      <div
        id="chat-box"
        style={{
          height: '300px',
          // border: '1px solid #ccc',
          overflowY: 'scroll',
          padding: '10px',
          border: 'blue 0.25rem solid',
        }}
      >
        {messages.map((msg, idx) => (
          <p key={idx} dangerouslySetInnerHTML={{ __html: msg }} />
        ))}
      </div>
      <textarea
        ref={textareaRef}
        rows={4}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write a message..."
        style={{ width: 'calc(100% - 22px)', height: '50px', margin: '10px 0', padding: '1px' }}
      />
      <div style={{ gap: '2px' }}>
        <button className="btn" style={{ margin: '10px' }} onClick={() => handleFormat('bold')}>
          Bold
        </button>
        <button className="btn" style={{ margin: '10px' }} onClick={() => handleFormat('italic')}>
          Italic
        </button>
        <button className="btn" style={{ margin: '10px' }} onClick={() => handleFormat('strike')}>
          Strike
        </button>
        <button className="btn" style={{ margin: '10px' }} onClick={() => handleFormat('mark')}>
          Mark
        </button>
        <button className="btn" style={{ margin: '10px' }} onClick={() => handleFormat('underline')}>
          Underline
        </button>
      </div>
      <button
        className="btn"
        style={{
          border: 'green 0.25rem solid',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default ChatApp;
