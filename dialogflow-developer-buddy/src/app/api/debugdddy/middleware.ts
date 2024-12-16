import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const contentType = request.headers.get('content-type');
  
  if (!contentType?.includes('multipart/form-data')) {
    return NextResponse.json(
      { error: 'Content type must be multipart/form-data' },
      { status: 415 }
    );
  }

  // Add more middleware checks as needed
  return NextResponse.next();
}
