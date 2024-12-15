import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    // Mock entity detection results
    const results = [
      {
        category: 'Amounts with Units',
        name: '@sys.duration',
        extendable: false,
        description: 'Number + duration units (hours, days, months etc.)',
        outputFormat: '{"amount": number, "unit": string}'
      },
      {
        category: 'Numbers',
        name: '@sys.number',
        extendable: false,
        description: 'Cardinal numbers',
        outputFormat: 'number'
      },
      // Add more mock results as needed
    ];

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process entity detection' }, { status: 500 });
  }
}
