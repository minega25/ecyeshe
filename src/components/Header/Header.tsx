import React from "react";
import Link from 'next/link'

function Header() {
  return (
    <header className="bg-white">
  <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="md:flex md:items-center md:gap-12">
        <Link className="block text-teal-600" href="/">
          Home
        </Link>
      </div>

      <div className="hidden md:block">
        <nav aria-labelledby="header-navigation">
          <h2 className="sr-only" id="header-navigation">Header navigation</h2>

          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/"
              >
                Careers
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/"
              >
                History
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/"
              >
                Services
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/"
              >
                Projects
              </Link>
            </li>

            <li>
              <Link
                className="text-gray-500 transition hover:text-gray-500/75"
                href="/"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="sm:gap-4 sm:flex">
          <Link
            className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-md shadow"
            href="/"
          >
            Login
          </Link>

          <div className="hidden sm:flex">
            <Link
              className="px-5 py-2.5 text-sm font-medium text-teal-600 bg-gray-100 rounded-md"
              href="/"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="block md:hidden">
          <button
            className="p-2 text-gray-600 transition bg-gray-100 rounded hover:text-gray-600/75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>

  );
}

export default Header;
