"use client"

import { SignIn } from "@clerk/nextjs"

const Page = () => {

  return (
    <>
      <SignIn
        fallbackRedirectUrl="/welcome" forceRedirectUrl="/welcome"
      />
    </>
  )
}

export default Page
