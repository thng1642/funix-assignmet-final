
// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className='max-w-5xl mx-auto h-[40px] italic flex justify-between items-center mb-4'>

            {/* navigation */}
            <nav className=''>
                <Link className='pr-3 text-amber-400' to='/' >Home</Link>
                <Link to='/shop'>Shop</Link>
            </nav>

            {/* Brand */}
            <p className='uppercase font-medium font-mono text-xl'>boutique</p>

            {/* Account */}
            <div className='flex'>
                {/* Cart */}
                <div className='flex pr-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                    <span>Cart</span>
                </div>
                {/* Personal account */}
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    {/* Checking login ? */}
                    <span>Login</span>

                </div>

            </div>
        </header>
    );
};