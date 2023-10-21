import QrCode from '../assets/qr-code-outline.svg?react';
import Link from '../assets/link-outline.svg?react';
import GitHub from '../assets/logo-github.svg?react';
import context from './context';


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="progress fixed top-0 left-0 h-1 w-full">
                <div className="progress-bar h-1 bg-primary-700 w-100 transition-transform origin-left scale-x-0"></div>
            </div>
            <header>
                <div className="sm:container mx-auto flex flex-row px-4 py-2">
                    <nav className="ml-auto">
                        <ul className="flex flex-row py-4 gap-4">
                            <li>
                                <a className="text-primary-700 hover:text-primary-500" href="/" data-swap="main">
                                    <Link className="w-8 h-8 fill-primary-500 text-primary-500" />
                                </a>
                            </li>
                            <li>
                                <a className="text-primary-700 hover:text-primary-500" href="/qr" data-swap="main">
                                    <QrCode className="w-8 h-8 fill-primary-500 text-primary-500" />
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="container max-w-sm mx-auto">
                {children}
            </main>
            <footer className="py-8">
                <div className="container max-w-sm mx-auto flex flex-col px-2 gap-1">
                    <p className="mx-auto text-xs text-neutral-400">
                        © 2023 {context.firstName} {context.lastName}
                    </p>
                    <p className="mx-auto text-xs text-neutral-400">
                        <a href="https://github.com/recrsn/youspotted">
                            <GitHub className="w-4 h-4 fill-neutral-400 text-neutral-400" />
                        </a>
                    </p>
                </div>
            </footer>
        </>
    )
}
