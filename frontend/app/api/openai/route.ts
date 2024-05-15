import axios from 'axios';

const openaiAPI = axios.create({
  baseURL: 'https://api.openai.com/v1/engines/davinci-codex/completions',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const getResponseFromOpenAI = async (prompt: string, password:string) => {
  if (password !== process.env.PASS) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  try {
    const response = await openaiAPI.post('', { prompt });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return null;
  }
};
