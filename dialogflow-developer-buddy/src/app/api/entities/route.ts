import { NextResponse } from 'next/server';
import OpenAI from "openai";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: text is required' },
        { status: 400 }
      );
    }

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });
    
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: `You are a helpful assistant specialized in entity detection. 
          Analyze the text and identify entities. Format your response as an array of objects with these fields:
          - category: The type of entity (e.g., Duration, Number, Date, etc.)
          - name: The system entity name (e.g., @sys.duration, @sys.number)
          - extendable: Whether the entity can be extended (boolean)
          - description: A brief description of what the entity represents
          - outputFormat: The expected format of the entity value` },
        { role: "user", content: text }
      ],
      temperature: 1.0,
      top_p: 1.0,
      max_tokens: 1000,
      model: modelName
    });

    const content = response.choices[0].message.content;
    let results = [];
    
    try {
      // Try to parse the response as JSON
      if (content) {
        const parsed = JSON.parse(content);
        results = Array.isArray(parsed) ? parsed : [parsed];
      }
    } catch (e) {
      // If parsing fails, provide structured fallback
      results = [{
        category: 'Raw Detection',
        name: '@custom.entity',
        extendable: true,
        description: content || 'No entities detected',
        outputFormat: 'string'
      }];
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Entity detection error:', error);
    return NextResponse.json(
      { error: 'Failed to process entity detection' },
      { status: 500 }
    );
  }
}