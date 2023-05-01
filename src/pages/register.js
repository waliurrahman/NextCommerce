import { useState } from 'react';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  
  // Redirect to account page if user is already logged in
  if (session) {
    router.replace('/account');
    return null;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          email,
          fname,
          lname,
        }),
      });

      if (response.ok) {
        // Redirect to login page
        Router.push('/login');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong.');
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Register" />
      </Head>
      <div className="mx-auto max-w-md">
  <h1 className="text-3xl font-bold mb-6">Register</h1>
  {error && <p className="text-red-500 mb-4">{error}</p>}
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block mb-1 font-semibold" htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
        className="w-full px-3 py-2 bg-blue-100 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold" htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        className="w-full px-3 py-2 bg-blue-100 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold" htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        className="w-full px-3 py-2 bg-blue-100 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold" htmlFor="fname">First Name:</label>
      <input
        id="fname"
        type="text"
        value={fname}
        onChange={(event) => setFname(event.target.value)}
        required
        className="w-full px-3 py-2 bg-blue-100 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
    <div>
      <label className="block mb-1 font-semibold" htmlFor="lname">Last Name:</label>
      <input
        id="lname"
        type="text"
        value={lname}
        onChange={(event) => setLname(event.target.value)}
        required
        className="w-full px-3 py-2 bg-blue-100 rounded border-gray-400 focus:border-blue-500 focus:outline-none"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300 ease-in-out">Register</button>
  </form>
</div>

    </>
  );
};

export default Register;
