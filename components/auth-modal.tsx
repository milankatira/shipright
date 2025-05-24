"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { SignedIn, SignedOut, SignInButton, SignUp, UserButton } from "@clerk/nextjs"

interface AuthModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign up to continue</DialogTitle>
                    <DialogDescription>
                        Create an account to vote and submit features
                    </DialogDescription>
                </DialogHeader>
                <SignedOut>
                    <SignInButton forceRedirectUrl={window.location.pathname} />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                {/* <SignUp
                    afterSignUpUrl="/dashboard"
                    redirectUrl="/dashboard"
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "shadow-none",
                        }
                    }}
                /> */}
            </DialogContent>
        </Dialog>
    )
}