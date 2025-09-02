// Function to check if a URL is valid and return an HTML link
const checkUrlValid = (url: string): string => {
  try {
    new URL(url); // Checks if the URL is valid
    return `<a target="_blank" href="${url}" style="color: #06c; text-decoration: underline;">${url}</a>`;
  } catch {
    return url; // If invalid, return the original string
  }
};
/**
 * to show i add mor
 * https://www.w3schools.com/html/html_formatting.asp
 */
// Formatting patterns and their respective replacement functions
const FORMATTERS: Record<string, (match: string, content: string) => string> = {
  // Bold formatting (**text** -> <b>text</b>)
  '\\*\\*(.*?)\\*\\*': (_, content) => `<b>${content}</b>`,

  // Underline formatting (__text__ -> <ins>text</ins>)
  '__(.*?)__': (_, content) => `<ins>${content}</ins>`,

  // Strikethrough formatting (--text-- -> <strike>text</strike>)
  '--(.*?)--': (_, content) => `<strike>${content}</strike>`,

  // Italic formatting (~~text~~ -> <i>text</i>)
  '~~(.*?)~~': (_, content) => `<i>${content}</i>`,

  // Highlighted text (^^text^^ -> <mark>text</mark>)
  '\\^\\^(.*?)\\^\\^': (_, content) => `<mark>${content}</mark>`,

  // URLs (https://example.com -> clickable link)
  '(https?:\\/\\/[^\\s]+)': (match) => checkUrlValid(match),
  // "(https?:\/\/[^\s]+)/g": (match) => checkUrlValid(match),
};

// Function to format text with HTML
export const formatText = (text: string): string => {
  // Replace newlines with <br/> tags
  let textFormat = text.replace(/\n/g, '<br/>');
  // Iterate through each pattern and apply replacements

  for (const [pattern, replacer] of Object.entries(FORMATTERS)) {
    const regex = new RegExp(pattern, 'g'); // Create a global regex for each pattern
    textFormat = textFormat.replace(regex, replacer);
  }

  return textFormat; // Return the formatted text
};

const msgFormatText = (text: string) => {
  let convertText = text;
  convertText = text.replace(/\n/g, '<br/>');
  convertText = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); // ** עבור bold
  convertText = text.replace(/__(.*?)__/g, '<ins>$1</ins>'); // __ עבור underline
  convertText = text.replace(/--(.*?)--/g, '<strike>$1</strike>'); // -- עבור strike
  convertText = text.replace(/~~(.*?)~~/g, '<i>$1</i>'); // ~~ עבור italic
  convertText = text.replace(/```(.*?)```/g, '<mark>$1</mark>'); // ``` עבור mark

  // Convert URLs to clickable links
  convertText = text.replace(
    /(https?:\/\/[^\s]+)/g,
    '<a href="$1" target="_blank" style="color: #6090e8;text-decoration: underline;">$1</a>'
  ); //TODO:add checkUrlValid

  //TODO:check is good to add trime
  return convertText;
};
export const messageFormatChat = (text: string) => {
  return msgFormatText(text).split('\n');
};
