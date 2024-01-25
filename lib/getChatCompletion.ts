"use server";
import openai from "@/openai";
import OpenAI from "openai";
type Todos = {
  todo: Todo[];
  inprogress: Todo[];
  done: Todo[];
};
export async function getChatCompletion(todos: Todos) {
  // const { todos } = await request.json();
  // console.log(todos);

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
            "Suppose you are a summarizing bot that will summarize the todo data.When responding, welcome the user always as Mr.Hamza and say welcome to Your Todo App! Limit the response to 200 characters",
        },
        {
          role: "user",
          content: `Hi there, provide a summary of the following todos. Count how many todos are in each category sucha as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
            todos
          )}`,
        },
      ],
    });

  // console.log("Data is:", response);
  return response.choices[0].message;
}
