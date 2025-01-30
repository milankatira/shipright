import Navbar from "@/components/Dashboard/Navbar";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>

        <body className="bg-gray-100">
          <Navbar />
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
