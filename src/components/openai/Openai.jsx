import OpenAI from 'openai';

// Access the environment variable directly from import.meta.env
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
console.log(apiKey);

// Change to a default export function
export default async function sendMsgToOpenAI(message) {
  try {
    // Use chat completions API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Return the text content of the first choice
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API call:", error);
    throw error;
  }
}
