import React from 'react'
import useHooks from './hooks'
import cx from 'classnames'
import Link from 'next/link'

export default function Header() {
  const { state, methods } = useHooks()
  return (
    <nav className="bg-white border-gray-200 shadow-sm ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={'/'} className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">THE BLOG.</span>
        </Link>

        <div className="hidden  md:flex md:justify-between">
          <div className="hidden md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white  md ">
              <li>
                <Link href="/" className={cx("block py-2 pl-3 pr-4 rounded md:bg-transparent md:hover:text-blue-700 md:p-0", state.router.asPath === '/' || state.router.asPath.includes('post') ? "text-blue-700" : "text-black-base")} aria-current="page">Posts</Link>
              </li>
              <li>
                <Link href="/users" className={cx("block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0", state.router.asPath.includes('users') ? "text-blue-700" : "text-black-base")}>Users</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="hidden  md:flex md:justify-between">
          <div className="hidden md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white  md ">
              <li>
                <Link href="#" className={cx("block py-2 pl-3 pr-4 rounded md:bg-transparent md:hover:text-blue-700 md:p-0", state.router.asPath === '/login' ? "text-blue-700" : "text-black-base")} aria-current="page">Login</Link>
              </li>
              <li>
                <Link href="#" className={cx("block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0", state.router.asPath === '/register' ? "text-blue-700" : "text-black-base")}>Register</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* mobile */}
        <div className={cx("md:hidden flex absolute h-full gap-3 top-0 right-0 overflow-hidden z-30")}>
          <button onClick={methods.handleClick} type="button" className="inline-flex mr-2 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 mt-2" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={cx(
            "w-[200px] bg-slate-200 shadow-xl h-full fixed flex flex-col justify-between text-center transition-all duration-300",
            state.isOpen ? "left-0" : "-left-96"
          )}>
            <div className="mt-20">
              <h1 className='font-bold text-xl'>MENU.</h1>
              <ul>
                <li>
                  <Link href="/" onClick={methods.handleClick} className={cx("block py-2 pl-3 pr-4 rounded md:bg-transparentmd:p-0", state.router.asPath === '/' || state.router.asPath.includes('post') ? "text-blue-700" : "text-black-base")} aria-current="page">Posts</Link>
                </li>
                <li>
                  <Link href="/users" onClick={methods.handleClick} className={cx("block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0", state.router.asPath.includes('users') ? "text-blue-700" : "text-black-base")} aria-current="page">Users</Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <Link href="#" className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-black-base md:p-0 " aria-current="page">Login</Link>
                </li>
                <li>
                  <Link href="#" className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-black-base md:p-0 " aria-current="page">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
