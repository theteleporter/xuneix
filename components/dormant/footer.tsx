import Link from "next/link"

export function Footer() {
    return(
        <>
        <footer className="mt-20">
            <div className="text-sm">
                Powered by <Link href="https://www.crept.studio" target="_blank" className="text-blue-600 border-b border-spacing-y-1 hover:text-blue-300 hover:border-none font-mono font-bold transition-all ease-out duration-700">Crept Studio</Link>
            </div>
        </footer>
        </>
    )
}