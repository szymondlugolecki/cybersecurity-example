import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJWT } from '@/app/lib/jwt';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Symulacja pobrania użytkownika z bazy danych
    const user = {
      id: 1,
      username: 'testuser',
      password: await bcrypt.hash('password', 10),
    };

    // Porównanie haseł
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
      // Generowanie JWT
      const token = await signJWT(
        { userId: user.id, username: user.username },
        { expiresIn: '1h' }
      );

      return NextResponse.json({ message: 'Logged in successfully', token });
    } else {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: 'Login failed', error: String(error) },
      { status: 500 }
    );
  }
}
