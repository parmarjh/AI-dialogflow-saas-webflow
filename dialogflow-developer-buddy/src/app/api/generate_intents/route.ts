import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Environment Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        error: 'API key not configured. We are looking for funding to maintain this project. Please support us at https://github.com/Yash-Kavaiya',
        type: 'CONFIGURATION_ERROR'
      }, { status: 500 });
    }

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
  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Construct prompt
  const prompt = `Generate 10 similar but varied intents for the following user input: "${input}"
    The variations should maintain the core meaning but use different wording, perspective, or context.
    Return only the variations, one per line, without numbering or additional text.`;

  try {
    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();

    // Process and clean up the response
    const intents = generatedText
      .split('\n')
      .map(intent => intent.trim())
      .filter(intent => intent.length > 0)
      .slice(0, 10); // Ensure we only return 10 intents

    return intents;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}