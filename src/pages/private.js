import { getSession } from 'next-auth/client';

export default function MyProtectedPage({ user }) {
  return (
    <div>
      <p>Welcome, {user.name}!</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
}
