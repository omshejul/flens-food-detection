const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

export async function queryOpenAI(
  base64Image,
  OPENAI_API_KEY,
  prompt,
  dishName
) {
  const body = {
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Given an image of a food item ${dishName}, analyze the visible components to approximate its nutritional values including but not limited to protein, carbohydrates, fats, sugars, and calories with their respective units. Provide the values within a reasonable range where applicable. Based on the nutritional profile, assess if the food aligns with general healthy eating guidelines - particularly considering aspects like high sugar, saturated fat content, or overall caloric density. Generate a JSON output containing the estimated nutritional values and a suggestion on whether the food should be consumed or avoided, along with brief reasoning. The output need to be strictly JSON, is enough information is not provided, just give aproximation based upon the quantity and general estimation on training data. If image is not food return all fields as zero. Do not add \`\`\`json directly start with [ and in case of multiple items food like a thali add each like an array Consider common dietary recommendations in making the suggestion. Max 5 items in array

            Output Format: Do not mentions the whole dish, output should array of individual food items. If not food, mention as what it looks like.
            ${outputFormat2}
            this image may or may not contain:
            ${prompt}
            `,
          },
          {
            type: "image_url",
            image_url: {
              url: base64Image,
              detail: "low",
            },
          },
        ],
      },
    ],
    max_tokens: 300,
  };

  try {
    console.log({ JSON: JSON.stringify(body) });
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // write response to a file

    const jsonResponse = await response.json();
    let content = JSON.parse(jsonResponse.choices[0].message.content);

    // return JSON.parse(content);
    console.log(jsonResponse.choices[0].message.content);
    return content;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it in the Express route
  }
}

const outputFormat = `
[{
  "name": "Name the dish as it would likely be called in Indian cuisine, based on the image provided. If not food say what it looks like"
  "data": {
    "protein": "[value]",
    "carbohydrates": "[value]",
    "fats": "[value]",
    "sugars": "[value]",
    "calories": "[value]",
    "other_nutrients": {
      "fiber": "[value]",
      "sodium": "[value]",
      "cholesterol": "[value]"
    }
  },
  "suggestion": "Based on the nutritional profile, [brief reasoning why the food is either recommended or should be avoided]."

}]
`;
const outputFormat2 = `
[{
  "overall_suggestion: "Based on the nutritional profile, [brief reasoning why the food is either recommended or should be avoided]."
},{
  "name": "Name the dish as it would likely be called in Indian cuisine, based on the image provided. If not food say what it looks like"
  "calories": "[value]",
  "suggestion": "Based on the nutritional profile, [brief reasoning why the food is either recommended or should be avoided]."
}
]
`;
