'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Intents', path: '/intents' },
    { name: 'Entities', path: '/entities' },
    { name: 'Routes', path: '/routes' },
    { name: 'Webhooks', path: '/webhooks' },
    { name: 'Flow Generator', path: '/flowmaker' },
    { name: 'Debugddy', path: '/debugdddy' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Test Suite', path: '/testsuite' }
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                Dialogflow Buddy
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${
                    pathname === item.path
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {session ? (
              <button
                onClick={() => signOut()}
                className="ml-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="ml-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
