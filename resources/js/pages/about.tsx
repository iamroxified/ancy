import { Head, usePage } from '@inertiajs/react';

export default function AboutPage() {
    const { organization, coreValues, objectives } = usePage().props as any;

    return (
        <>
            <Head title="About ANCY" />
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-[#0b1d36] text-white">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <a href="/" className="flex items-center gap-3 font-semibold tracking-wide">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b1d36]">ANCY</span>
                            <span>{organization?.name ?? 'Alliance of North Central Youth of Nigeria'}</span>
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

                <main className="mx-auto max-w-6xl px-6 py-16">
                    <section className="mb-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">About Us</p>
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900">A united youth movement for the North Central region.</h1>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">{organization?.about}</p>
                        </div>
                        <div className="rounded-3xl bg-[#0b1d36] p-8 text-white shadow-lg">
                            <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]">Vision</p>
                            <p className="mt-4 text-xl font-semibold">{organization?.vision}</p>
                            <div className="mt-8 border-t border-slate-700 pt-6">
                                <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]">Mission</p>
                                <p className="mt-4 text-base leading-7 text-slate-200">{organization?.mission}</p>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-8 md:grid-cols-2">
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">Core Values</h2>
                            <ul className="mt-6 space-y-4">
                                {(coreValues ?? []).map((value: string) => (
                                    <li key={value} className="flex items-start gap-3 text-slate-700">
                                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#0d6b4f]" />
                                        <span>{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900">Objectives</h2>
                            <ul className="mt-6 space-y-4">
                                {(objectives ?? []).map((objective: string) => (
                                    <li key={objective} className="flex items-start gap-3 text-slate-700">
                                        <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
                                        <span>{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </main>

                <footer className="bg-[#0b1d36] py-10 text-slate-200">
                    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="font-semibold text-white">ANCY</p>
                            <p className="text-sm text-slate-300">Membership management and youth advocacy for the North Central zone.</p>
                        </div>
                        <div className="flex gap-6 text-sm">
                            <a href="/about" className="hover:text-white">About</a>
                            <a href="/coverage" className="hover:text-white">Coverage</a>
                            <a href="/register" className="hover:text-white">Register</a>
                            <a href="/privacy" className="hover:text-white">Privacy</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
