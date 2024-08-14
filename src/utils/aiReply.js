// src/utils/aiReply.js

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const API_URL = "https://jamsapi.hackclub.dev/openai/chat/completions";

export const getAIResponse = async (commentText) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant responding to user comments on a website. Provide a friendly and constructive response."
          },
          {
            role: "user",
            content: `Please respond to this user comment: "${commentText}"`
          }
        ],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return "I apologize, but I couldn't generate a response at this time. Please try again later.";
  }
};