import Header from './Header';

function Layout({ children }) {

  return (
    <div className="container mx-auto bg-white">
    <Header />

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
