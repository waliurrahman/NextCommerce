import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { useAuth } from 'hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export default function Checkout() {
  const { session, tokenUser } = useAuth('/login');

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Checkout</title>
        {console.log(tokenUser)}
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="">
          Checkout
        </div>  
    </>
  )
}
