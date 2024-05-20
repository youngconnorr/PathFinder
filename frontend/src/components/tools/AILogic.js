import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function main(
  city,
  month,
  adultNum,
  childNum,
  infantNum,
  petNum,
  budget,
  dollar
) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Make sure there are no newline characters in the JSON object response. You are a travel guide who knows the ins and outs of ${city}. ${adultNum} adults, ${childNum} children, ${infantNum} infants, and ${petNum} pets are coming to the city during the ${month} of the year. 

        They have a budget of ${budget} and you need to recommend 
        - 5 different restaurants with a ${dollar} price range and match the guests coming
        - 2 shopping places that are special to the local city and give a description of it
        - 5 places to go or parks to visit that align with the guests coming and their budget
        - 5 lodging places that fit with a ${dollar} budget and give a description of each lodging place. 
        
        Provide your response in JSON format only. The format should be a JSON object like this:

        {
          "restaurants": [
            ["name of restaurant", "short description of restaurant"],
            ["name of restaurant", "short description of restaurant"]
          ],
          "malls": [
            ["name of the mall", "short description of the mall"],
            ["name of the mall", "short description of the mall"]
          ],
          "places": [
            ["name of place", "description of place"],
            ["name of place", "description of place"]
          ],
          "lodging": [
            ["name of stay", "description of stay"],
            ["name of stay", "description of stay"]
          ]
        }

        Provide no other commentary. 
        Avoid this error: 
        
        Uncaught (in promise) SyntaxError: Unexpected token ']', ..."xxx."],
      ],
      "xxx"... is not valid JSON
        at JSON.parse (<anonymous>)
        at fetchData (Generate.jsx:109:21)`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}
