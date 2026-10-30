import { Head, usePage } from '@inertiajs/react';

export default function WelcomePage() {
    const { organization, coreValues, objectives, states, programs, contact } = usePage().props as any;

    return (
        <>
            <Head title="ANCYN | Home" />
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-[#0b1d36] text-white">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <a href="/" className="flex items-center gap-3 font-semibold tracking-wide">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b1d36]">ANCYN</span>
                            <span>{organization?.name ?? 'Alliance of North Central Youth of Nigeria'}</span>
                        </a>
                        <nav className="hidden items-center gap-6 text-sm md:flex">
                            <a href="/about" className="text-slate-200 hover:text-white">About</a>
                            <a href="/coverage" className="text-slate-200 hover:text-white">Coverage</a>
                            <a href="/register" className="text-slate-200 hover:text-white">Membership</a>
                            <a href="/contact" className="text-slate-200 hover:text-white">Contact</a>
                            <a href="/privacy" className="text-slate-200 hover:text-white">Privacy</a>
                            <a href="/admin/login" className="rounded-full bg-white px-4 py-2 font-medium text-[#0b1d36]">Admin Login</a>
                        </nav>
                    </div>
                </header>

                <main>
                    <section className="bg-[#f4f7fb] px-6 py-20">
                        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                            <div>
                                <p className="mb-4 inline-flex rounded-full border border-[#0d6b4f] bg-[#eefaf5] px-4 py-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#0d6b4f]">Youth leadership for the North Central zone</p>
                                <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-slate-900">Empowering young people to build a united and progressive North Central Nigeria.</h1>
                                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">{organization?.about}</p>
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <a href="/register" className="rounded-xl bg-[#0d6b4f] px-6 py-3 font-semibold text-white shadow-sm hover:bg-[#0a5645]">Register as a Member</a>
                                    <a href="/about" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 hover:border-slate-400">Learn About ANCYN</a>
                                </div>
                            </div>
                            <div className="rounded-[2rem] bg-[#0b1d36] p-8 text-white shadow-xl">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="rounded-2xl bg-white/5 p-5">
                                        <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]">Vision</p>
                                        <p className="mt-3 text-base leading-7 text-slate-100">{organization?.vision}</p>
                                    </div>
                                    <div className="rounded-2xl bg-white/5 p-5">
                                        <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]">Mission</p>
                                        <p className="mt-3 text-base leading-7 text-slate-100">{organization?.mission}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="mb-10 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Why join ANCYN</p>
                            <h2 className="mt-4 text-3xl font-bold text-slate-900">A platform for leadership, innovation, and community impact.</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            {[ 
                                'Connect with youth leaders across the North Central zone.',
                                'Access opportunities for capacity building, entrepreneurship, and mentorship.',
                                'Participate in advocacy, peacebuilding, and community development initiatives.',
                            ].map((point) => (
                                <div key={point} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#eefaf5] text-xl font-bold text-[#0d6b4f]">✓</div>
                                    <p className="text-lg font-semibold text-slate-900">{point}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[#0b1d36] px-6 py-16 text-white">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-10 text-center">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#d4af37]">Core Values</p>
                                <h2 className="mt-4 text-3xl font-bold">Guiding principles for progress and unity.</h2>
                            </div>
                            <div className="grid gap-6 md:grid-cols-5">
                                {(coreValues ?? []).map((value: string) => (
                                    <div key={value} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
                                        <p className="text-base font-semibold text-white">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="mb-10 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Objectives</p>
                            <h2 className="mt-4 text-3xl font-bold text-slate-900">A development agenda rooted in youth participation.</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {(objectives ?? []).map((objective: string) => (
                                <div key={objective} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4ce] text-xl font-bold text-[#8b6b00]">•</div>
                                    <p className="text-lg font-semibold text-slate-900">{objective}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-100 px-6 py-16">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-10 text-center">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Coverage</p>
                                <h2 className="mt-4 text-3xl font-bold text-slate-900">Our reach across the North Central zone.</h2>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                {(states ?? []).map((state: string) => (
                                    <div key={state} className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-slate-800 shadow-sm">
                                        {state}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-6xl px-6 py-16">
                        <div className="mb-10 text-center">
                            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Programs & Initiatives</p>
                            <h2 className="mt-4 text-3xl font-bold text-slate-900">Planned opportunities and community impact activities.</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {(programs ?? []).map((program: string) => (
                                <div key={program} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 h-2 w-16 rounded-full bg-[#d4af37]" />
                                    <p className="text-lg font-semibold text-slate-900">{program}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-[#0d6b4f] px-6 py-16 text-white">
                        <div className="mx-auto max-w-4xl text-center">
                            <h2 className="text-3xl font-bold">Ready to become part of the next generation of youth leadership?</h2>
                            <p className="mt-4 text-lg text-green-50">Register today and help shape a more united, innovative, and peace-driven North Central Nigeria.</p>
                            <a href="/register" className="mt-8 inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-[#0d6b4f]">Join ANCYN</a>
                        </div>
                    </section>
                </main>

                <footer className="bg-[#0b1d36] px-6 py-10 text-slate-200">
                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        <div>
                            <p className="font-semibold text-white">ANCYN</p>
                            <p className="mt-3 text-sm text-slate-300">{organization?.about}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Quick Links</p>
                            <div className="mt-3 space-y-2 text-sm">
                                <a href="/about" className="block hover:text-white">About</a>
                                <a href="/coverage" className="block hover:text-white">Coverage</a>
                                <a href="/register" className="block hover:text-white">Register</a>
                                <a href="/privacy" className="block hover:text-white">Privacy Notice</a>
                            </div>
                        </div>
                        <div>
                            <p className="font-semibold text-white">Contact</p>
                            <div className="mt-3 space-y-2 text-sm">
                                <p>{contact?.email || 'Email: Not yet configured'}</p>
                                <p>{contact?.phone || 'Phone: Not yet configured'}</p>
                                <p>{contact?.address || 'Address: Not yet configured'}</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
