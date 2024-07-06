import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
    <h1 className='text-3xl font-bold underline'>Welcome to the Admin Page</h1>
    <Link href="/" className="mt-8 hover:underline">
      Back to Home
    </Link>
  </main>
  )
}
"use client"
