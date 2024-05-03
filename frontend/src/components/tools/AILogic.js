import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function main(city, month, adultNum, childNum, infantNum, petNum) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Make sure there are no newline characters in the JSON object response. You are a travel guide who knows the ins and outs of ${city}. ${adultNum} adults, ${childNum} children, ${infantNum} infants, and ${petNum} pets are coming to the city during the ${month} of the year and you need to recommend 5 different places to eat that align with the guests coming, 2 articles of clothing for each type of guest that is coming and make sure to include pet clothing if there are pets coming , and 5 places to go or parks to visit that align with the guests coming. Provide your response in JSON format only. The format should be a JSON object like {{"restaurants": ["one": "name of thing", "two": "name of second thing"], "clothing": ["clothing name", "clothing name"], "visits": ["visiting place", "visiting place"]}. Provide no other commentary. Only include the names inside of the JSON and do not put curly braces around any of the things inside of the arrays. Have each category be "restaurants", "clothing", "visits"`,
      },
    ],

    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
