import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from '@/app/lib/jwt'; // Poprawiona ścieżka importu

interface MyCustomJwtPayload {
  userId: number;
  username: string;
  iat: number;
  exp: number;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Weryfikacja JWT
    const payload = await verifyJWT<MyCustomJwtPayload>(token);

    return NextResponse.json({ message: 'Protected data', user: payload });
  } catch (error) {
    console.error('Token Verification Error:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
