import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

function Layout({ children }) {
  return (
    <div className="container mx-auto bg-white">
      {/* Header */}
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
            <li><Link href={"/checkout"}>Checkout</Link></li>
            <li><Link href={"/account"}>Account</Link></li>
            <li><Link href={"/cart"}>Cart</Link></li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="py-8 px-8">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-8">
        <p className="text-sm">&copy; 2023 NextCommerce</p>
      </footer>
    </div>
  );
}

export default Layout;
