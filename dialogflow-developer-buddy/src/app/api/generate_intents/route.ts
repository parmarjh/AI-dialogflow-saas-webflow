import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();
    const intents = await generateSimilarIntents(userInput);
    return NextResponse.json({ intents });
  } catch (error) {
    console.error('Error generating intents:', error);
    return NextResponse.json(
      { error: 'Failed to generate similar intents' },
      { status: 500 }
    );
  }
}

async function generateSimilarIntents(input: string): Promise<string[]> {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  
  const prompt = `Generate 10 similar but varied intents for the following user input: "${input}"
  The variations should maintain the core meaning but use different wording, perspective, or context.
  Return only the variations, one per line, without numbering or additional text.`;

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant specialized in generating intent variations while maintaining semantic meaning." },
      { role: "user", content: prompt }
    ],
    temperature: 0.8, // Slightly lower than 1.0 to maintain some consistency
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName
  });

  // Split the response into individual intents and clean up
  const generatedText = response.choices[0].message.content || '';
  const intents = generatedText
    .split('\n')
    .map(intent => intent.trim())
    .filter(intent => intent.length > 0)
    .slice(0, 10); // Ensure we only return 10 intents

  return intents;
}