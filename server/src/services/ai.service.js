import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

async function generateResponse(prompt, history) {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
    });

    const response = await chat.sendMessage({
      message: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

export default generateResponse;
