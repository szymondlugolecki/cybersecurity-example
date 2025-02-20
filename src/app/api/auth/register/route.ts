import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJWT } from '@/app/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Haszowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // Symulacja zapisu użytkownika do bazy danych
    const user = { id: 1, username: username, password: hashedPassword };

    // Generowanie JWT
    const token = await signJWT(
      { userId: user.id, username: user.username },
      { expiresIn: '1h' }
    );

    return NextResponse.json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    console.error('Registration Error:', error); // Logowanie błędu
    return NextResponse.json(
      { message: 'Registration failed', error: String(error) },
      { status: 500 }
    );
  }
}
