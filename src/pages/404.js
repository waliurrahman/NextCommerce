import Link from 'next/link';

function NotFound() {
  return (
    <div className="min-h-[300px] flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link href="/" className="text-blue-600 underline">Go back home</Link>
    </div>
  );
}

export default NotFound;
