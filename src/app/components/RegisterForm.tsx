import { useAuth } from './AuthContext';

export default function RegisterForm() {
  const { setToken } = useAuth();

  const handleRegister = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      alert('Registered successfully');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-white rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Register</h2>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const username = (e.target as any).username.value;
          const password = (e.target as any).password.value;
          await handleRegister(username, password);
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
