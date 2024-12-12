import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

export async function generateIntent(description: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Create a Dialogflow intent based on this description: ${description}
  Format the response as JSON with the following structure:
  {
    "displayName": "intent name",
    "trainingPhrases": ["phrase1", "phrase2"],
    "parameters": [{"name": "param1", "entityType": "type1"}],
    "responses": ["response1", "response2"]
  }`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}

export async function generateWebhook(intent: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Create a Node.js webhook function for this Dialogflow intent: ${intent}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
