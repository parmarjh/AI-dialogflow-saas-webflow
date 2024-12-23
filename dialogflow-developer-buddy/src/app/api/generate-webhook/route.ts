import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = "gemini-1.5-flash";

export async function POST(request: NextRequest) {
  try {
    if (!GEMINI_API_KEY) {
      return NextResponse.json({
        error: 'API key not configured',
        type: 'CONFIGURATION_ERROR'
      }, { status: 500 });
    }

    const { description, platform, language } = await request.json();
    const webhookCode = await generateWebhookCode(description, platform, language);
    return NextResponse.json({ code: webhookCode });
  } catch (error) {
    console.error('Error generating webhook:', error);
    return NextResponse.json(
      { error: 'Failed to generate webhook code' },
      { status: 500 }
    );
  }
}

async function generateWebhookCode(description: string, platform: string, language: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const platformSpecificInstructions = {
    'cloud-run': 'Include Dockerfile and deployment.yaml for Google Cloud Run',
    'cloud-functions': 'Include deployment commands and requirements for Google Cloud Functions',
    'others': 'Include generic deployment instructions'
  };

  const languageBoilerplate = {
    nodejs: 'Express.js with TypeScript',
    python: 'Flask framework',
    java: 'Spring Boot',
    go: 'net/http package'
  };

  const prompt = `Generate a production-ready Dialogflow webhook code for the following requirements:
    Description: ${description}
    Platform: ${platform}
    Language: ${language}
    
    Requirements:
    1. Use ${languageBoilerplate[language as keyof typeof languageBoilerplate]} as the framework
    2. ${platformSpecificInstructions[platform as keyof typeof platformSpecificInstructions]}
    3. Include proper error handling and logging
    4. Add input validation and security measures
    5. Include clear comments and documentation
    6. Follow best practices for ${language} development
    7. Include necessary package/dependency declarations
    8. Add environment variable handling
    9. Include proper response formatting for Dialogflow
    10. Add basic monitoring/health check endpoints

    Return only the complete, well-structured code without any explanations.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
