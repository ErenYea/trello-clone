import openai from "@/openai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: Request) {
  const { todos } = await request.json();
  console.log(todos);

  // communicate with openAI GPT

  const response: OpenAI.Chat.ChatCompletion =
    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "When responding, welcome the user always as Mr.Hamza and say welcome to Your Todo App! Limit the response to 200 characters",
        },
        {
          role: "user",
          content: `Hi there, provide a summary of the following todos. Count how many todos are in each category sucha as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
            todos
          )} \n In this data  the key are the status of the task and the value is the information about the task like title `,
        },
      ],
    });

  // console.log("Data is:", response);
  return NextResponse.json(response.choices[0].message);
}
