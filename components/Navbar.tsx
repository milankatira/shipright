import Link from 'next/link'
import React, { useState } from 'react'
import {motion} from 'framer-motion';
import { CheckCheck, Menu, ThumbsUp, X } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Button } from './ui/button';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <div className='w-screen bg-white'>
            <header className="sticky w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
                <div className="container flex h-16 max-w-screen-xl items-center justify-between px-4">
                    <Link className="flex items-center space-x-2" href="/">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <CheckCheck className="h-8 w-8 text-gray-900" />
                        </motion.div>
                        <span className="font-bold text-xl text-gray-900">shipright</span>
                    </Link>
                    <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 bg-white md:bg-transparent flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0 border-b md:border-0`}>
                        <Link href="#features" className="text-gray-600 hover:text-gray-900">Features</Link>
                        <Link href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
                        <Link href="#" className="text-gray-600 hover:text-gray-900">Blog</Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <SignedOut>
                            <Button variant="ghost" className="hidden md:inline-flex">
                                <Link href={'/sign-in'}>
                                    Log in
                                </Link>
                            </Button>
                            <Link href={'/sign-in'}>
                                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                    Collect Feedback For Free
                                </Button>
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <Link href={'/dashboard'}>

                                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                                    Dashboard
                                </Button>
                            </Link>
                        </SignedIn>
                        <Button variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar