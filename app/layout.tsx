import "./globals.css";
import {
    ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import { CheckCheck } from 'lucide-react'

export const metadata = {
    title: 'Shipright - User Feedback & Feature Voting Platform',
    description: 'Collect feedback, prioritize features, and make data-driven product decisions. Transform user insights into impactful product improvements.',
    keywords: 'user feedback, feature voting, product management, customer feedback',
    authors: [{ name: 'Shipright' }],
    creator: 'Shipright',
    publisher: 'Shipright',
    applicationName: 'Shipright',
    generator: 'Next.js',
    themeColor: '#7480ff',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    robots: 'index, follow',
    icons: {
      icon: {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    },
  }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-gray-100">
                <ClerkProvider>
                    <Toaster/>
                    {children}
                </ClerkProvider>
            </body>

        </html>
    )
}
