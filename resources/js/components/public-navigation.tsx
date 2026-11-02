import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/register', label: 'Register' },
    { href: '/contact', label: 'Contact' },
];

export default function PublicNavigation() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative shrink-0">
            <button
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                aria-controls="public-navigation-links"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 md:hidden"
            >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <nav
                id="public-navigation-links"
                className={`${menuOpen ? 'flex' : 'hidden'} absolute right-0 top-full z-20 min-w-48 flex-col gap-1 rounded-xl border border-white/10 bg-[#0b1d36] p-3 text-sm shadow-lg md:static md:flex md:min-w-0 md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
            >
                {links.map(({ href, label }) => (
                    <a
                        key={href}
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg px-3 py-2 text-slate-200 hover:bg-white/10 hover:text-white md:px-0 md:py-0 md:hover:bg-transparent"
                    >
                        {label}
                    </a>
                ))}
                <a
                    href="/admin/login"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg bg-white px-3 py-2 font-medium text-[#0b1d36] hover:bg-slate-100 md:rounded-full md:px-4"
                >
                    Admin Login
                </a>
            </nav>
        </div>
    );
}
