import React from 'react'
import useHooks from './hooks'
import cx from 'classnames'

export default function Header() {
  const { state, methods } = useHooks()
  return (
    <nav className="bg-white border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">THE BLOG.</span>
        </a>

        <div className="hidden  md:flex md:justify-between">
          <div className="hidden md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white  md ">
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-black-base md:p-0 " aria-current="page">Login</a>
              </li>
              <li>
                <a href="#" className="block py-2 pl-3 pr-4 text-black-base rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Register</a>
              </li>
            </ul>
          </div>
        </div>

        {/* mobile */}
        <div className={cx("md:hidden flex absolute gap-3 top-0 right-0 overflow-hidden")}>
          <button onClick={methods.handleClick} type="button" className="inline-flex mr-2 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 mt-2" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={cx(
            "w-[200px] bg-slate-200 shadow-xl h-screen flex flex-col justify-between text-center transition-all duration-300",
            state.isOpen ? "m-0" : "-mr-[200px]"
          )}>
            <div className="mt-20">
              <h1 className='font-bold text-xl'>MENU.</h1>
              <ul>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-black-base md:p-0 " aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-black-base md:p-0 " aria-current="page">Articles</a>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-black-base md:p-0 " aria-current="page">Login</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-black-base md:p-0 " aria-current="page">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
