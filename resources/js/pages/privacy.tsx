import { Head, usePage } from '@inertiajs/react';

export default function PrivacyPage() {
    const { privacyText } = usePage().props as any;

    return (
        <>
            <Head title="Privacy Notice" />
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-[#0b1d36] text-white">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <a href="/" className="flex items-center gap-3 font-semibold tracking-wide">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b1d36]">ANCY</span>
                            <span>ANCY</span>
                        </a>
                        <nav className="hidden items-center gap-6 text-sm md:flex">
                            <a href="/" className="text-slate-200 hover:text-white">Home</a>
                            <a href="/about" className="text-slate-200 hover:text-white">About</a>
                            <a href="/register" className="text-slate-200 hover:text-white">Register</a>
                            <a href="/contact" className="text-slate-200 hover:text-white">Contact</a>
                            <a href="/admin/login" className="rounded-full bg-white px-4 py-2 font-medium text-[#0b1d36]">Admin Login</a>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl px-6 py-16">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Privacy Notice</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Responsible handling of member data.</h1>
                        <div className="mt-8 space-y-6 text-slate-700">
                            {String(privacyText).split(/\n\s*\n/).map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
