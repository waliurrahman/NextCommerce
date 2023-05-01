import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();
  return (
          <header className="text-grey text-center py-4 px-8">
          <div className="justify-items-center container">
            <Link className="logo" href={"/"}>
              <Image
                className="mx-auto"
                src={"/img/NextCommerce-Logo.png"}
                alt="NextCommerce"
                height={120}
                width={300}
              />
            </Link>
          </div>
          <nav>
            <ul className="flex justify-center space-x-20 font-bold text-gray-500 hover:[&>*]:text-white [&>*]:bg-gray-200 [&>*>*]:px-8 [&>*>*]:py-3 [&>*>*]:block [&>*]:rounded-md hover:[&>*>*]:rounded-md hover:[&>*>*]:bg-violet-500 mt-4">
              <li><Link href={"/"}>Home</Link></li>
              <li><Link href={"/shop"}>Shop</Link></li>
              <li><Link href={"/cart"}>Cart</Link></li>
              <li><Link href={"/checkout"}>Checkout</Link></li>
              <li><Link href={"/account"}>Account</Link></li>
              {session ? (
                <li>
                  <button onClick={() => signOut()}>Logout</button>
                </li>
              ) : (
                <li>
                  <Link href="/login">Login</Link>
                </li>
              )}
            </ul>
          </nav>
        </header>
    
  )
}

export default Header