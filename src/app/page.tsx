'use client';

import { useAuth } from '@/app/components/AuthContext';
import Image from 'next/image';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProtectedPanel from './components/ProtectedPanel';

export default function Home() {
  const { token } = useAuth();

  return (
    <div className="text-black min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <div className="text-center mb-8">
            <Image
              src="/vercel.svg"
              alt="Logo"
              width={120}
              height={40}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              JWT Authentication
            </h1>
            <p className="text-gray-600">
              Secure your application with JWT tokens
            </p>
          </div>

          <div className="space-y-8">
            {token ? (
              <ProtectedPanel />
            ) : (
              <>
                <RegisterForm />
                <LoginForm />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
