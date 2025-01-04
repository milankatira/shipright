"use client"

import React from 'react'
import { UserButton } from "@clerk/nextjs"
// import { currentUser } from "@clerk/nextjs/server"
// import { syncUserInDb } from '@/action/auth.action';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const Navbar =  () => {
    // const auth = await currentUser();
    const pathname = usePathname();
    const router = useRouter();

    // await syncUserInDb(auth);

    const isDashboard = pathname === '/dashboard';

    const handleBack = () => {
        router.back();
    };

    return (
        <div className='bg-white p-4 flex justify-between px-10'>
            <div className='max-w-[1000px] mx-auto flex justify-between w-full'>
                {isDashboard ? (
                    <UserButton
                        showName
                        appearance={{
                            elements: {
                                userButtonBox: "flex-row-reverse outline-none p-2 px-4 bg-gray-100 rounded-lg active:outine-none",
                            },
                        }}
                    />
                ) : (
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Button>
                )}

                <p>Feedback ?</p>
            </div>
        </div>
    )
}

export default Navbar