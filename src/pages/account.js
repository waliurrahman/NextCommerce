import { useSession, signIn, signOut, getSession } from 'next-auth/react';


export default function Account() {
  const { data: session } = useSession()

  if(session) {
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }

  return <>
    Not signed in <br/>
    <button onClick={() => signIn()}>Sign in</button>
  </>
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
}

const AccountWithProvider = ({ session }) => (
  <SessionProvider session={session}>
    <Account />
  </SessionProvider>
)

export { AccountWithProvider }
