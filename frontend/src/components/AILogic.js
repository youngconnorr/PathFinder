import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function main(city, month) {
  const completion = await openai.chat.completions.create({
    messages: [{"role": "system", "content": `Make sure there are no newline characters in the JSON object response. You are a travel guide who knows the ins and outs of ${city}. A person is traveling to your city during ${month} and you need to recommend 5 different places to eat, 5 articles of clothing to match that month's weather, and 5 events to go to and see or parks to visit. Provide your response in JSON format only. The format should be a JSON object like {{"items": [{"one": "name of thing", "two": "name of second thing"}]}}. Provide no other commentary. Only include the names inside of the JSON and do not put curly braces around any of the things inside of the arrays. Have each category be "restaurants", "clothing", "visits"`}],

    model: "gpt-3.5-turbo",
  });

    return completion.choices[0].message.content;
}
