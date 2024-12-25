import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-pro";
const MODEL_NAME_VISION = "gemini-pro-vision";

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        error: 'API key not configured',
        type: 'CONFIGURATION_ERROR'
      }, { status: 500 });
    }

    const formData = await request.formData();
    const text = formData.get('text') as string;
    const file = formData.get('file') as Blob | null;

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    let result;

    if (file) {
      // Use Vision model for image analysis
      const model = genAI.getGenerativeModel({ model: MODEL_NAME_VISION });
      
      const imageData = await file.arrayBuffer();
      const imagePart = {
        inlineData: {
          data: Buffer.from(imageData).toString('base64'),
          mimeType: file.type
        }
      };

      const prompt = `As a Dialogflow expert, analyze this debug scenario:
      ${text || 'No text provided, analyzing image only'}
      
      Provide the following:
      1. Issue Analysis
      2. Solution Steps
      3. Code Fixes (if needed)
      4. Best Practices`;

      // Modified: Simplified content structure for image analysis
      result = await model.generateContent([
        prompt,
        imagePart
      ]);
    } else {
      // Text-only analysis with standard model
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      
      const prompt = `As a Dialogflow expert, analyze this debug scenario:
      ${text}
      
      Provide the following:
      1. Issue Analysis
      2. Solution Steps
      3. Code Fixes (if needed)
      4. Best Practices`;

      // Modified: Simplified content structure for text-only analysis
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text_response = response.text();

    return NextResponse.json({
      solution: text_response,
      tokens: {
        prompt: 0,    // Gemini doesn't provide token counts
        completion: 0,
        total: 0
      },
      model: file ? MODEL_NAME_VISION : MODEL_NAME
    });

  } catch (error: any) {
    console.error('Error in debug analysis:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to process debug request',
        type: error.name || 'PROCESSING_ERROR'
      }, 
      { status: 500 }
    );
  }
}