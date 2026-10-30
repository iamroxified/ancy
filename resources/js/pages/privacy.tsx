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
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b1d36]">ANCYN</span>
                            <span>ANCYN</span>
                        </a>
                        <nav className="hidden items-center gap-6 text-sm md:flex">
                            <a href="/about" className="text-slate-200 hover:text-white">About</a>
                            <a href="/coverage" className="text-slate-200 hover:text-white">Coverage</a>
                            <a href="/register" className="text-slate-200 hover:text-white">Membership</a>
                            <a href="/contact" className="text-slate-200 hover:text-white">Contact</a>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl px-6 py-16">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Privacy Notice</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Responsible handling of member data.</h1>
                        <div className="mt-8 space-y-6 text-slate-700">
                            <p>{privacyText}</p>
                            <p>ANCYN collects personal and polling-unit information for membership administration, communications, governance, and reporting. This information is used only for legitimate membership-management objectives and is not made public.</p>
                            <p>Access is restricted to authorized administrators. We encrypt sensitive records, limit data retention where required, and retain audit logs for security and accountability without storing unnecessary personal information.</p>
                            <p>Members may request corrections or deletion where applicable, subject to legal and operational requirements, by contacting the organization through the contact page.</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
