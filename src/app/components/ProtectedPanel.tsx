import { useState } from 'react';
import { useAuth } from './AuthContext';

export default function ProtectedPanel() {
  const { token } = useAuth();
  const [protectedData, setProtectedData] = useState<any>(null);

  const handleGetProtectedData = async () => {
    try {
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch protected data');
      }

      const data = await response.json();
      setProtectedData(data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Protected Data
      </h2>
      <button
        onClick={handleGetProtectedData}
        className="w-full bg-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 mb-4"
      >
        Get Protected Data
      </button>
      {protectedData && (
        <div>
          <p>Protected Data:</p>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
            {JSON.stringify(protectedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
