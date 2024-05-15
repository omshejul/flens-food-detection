import axios from 'axios';

export async function addSuggestion(foodInfo, OPENAI_API_KEY) {
  const url = "https://api.openai.com/v1/chat/completions";

  const data = {
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": `provide a 1 line suggestion for a dish, do not mention the dish name keep it consice, do not ask for more information, Based on the nutritional profile, assess if the food aligns with general healthy eating guidelines - particularly considering aspects like high sugar, saturated fat content, or overall caloric density. based on the data provided: ${foodInfo}`}],
    temperature: 0.1
  };

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${OPENAI_API_KEY}`
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    console.log(response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
    return error
  }
}
