import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const text = formData.get('text') as string;
    const file = formData.get('file') as File;
    
    let content = text || '';

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const path = join('/tmp', file.name);
      await writeFile(path, buffer);
      
      // Read file content if it's a text file
      if (file.type.startsWith('text/') || file.name.match(/\.(js|ts|jsx|tsx|json|css|html|md)$/)) {
        content += `\n\nFile Content (${file.name}):\n${buffer.toString('utf-8')}`;
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful debugging assistant. Analyze the provided code and text to suggest solutions for the user's problem."
        },
        {
          role: "user",
          content: content
        }
      ]
    });

    return NextResponse.json({
      success: true,
      solution: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Debug API Error:', error);
    return NextResponse.json(
      { error: 'Error processing debug request' },
      { status: 500 }
    );
  }
}
