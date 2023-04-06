import { useSession, signIn, signOut } from "next-auth/react"

export default function Account() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <>
        <div className="">
          Not signed in <br/>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="">
        Signed in as {session.user.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </>
  )
}
