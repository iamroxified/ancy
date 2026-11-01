import { Head } from '@inertiajs/react';

const states = [
    'Benue State',
    'Kogi State',
    'Kwara State',
    'Nasarawa State',
    'Niger State',
    'Plateau State',
    'Federal Capital Territory (FCT)',
];

export default function CoveragePage() {
    return (
        <>
            <Head title="Our Coverage" />
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-[#0b1d36] text-white">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <a href="/" className="flex items-center gap-3 font-semibold tracking-wide">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b1d36]">ANCY</span>
                            <span>Alliance of North Central Youth of Nigeria</span>
                        </a>
                        <nav className="hidden items-center gap-6 text-sm md:flex">
                            <a href="/about" className="text-slate-200 hover:text-white">About</a>
                            <a href="/coverage" className="text-slate-200 hover:text-white">Coverage</a>
                            <a href="/register" className="text-slate-200 hover:text-white">Membership</a>
                            <a href="/contact" className="text-slate-200 hover:text-white">Contact</a>
                            <a href="/privacy" className="text-slate-200 hover:text-white">Privacy</a>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-6xl px-6 py-16">
                    <div className="mb-10 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Our Coverage</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Seven administrative areas across the North Central zone.</h1>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {states.map((state, index) => (
                            <div key={state} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#eefaf5] text-xl font-bold text-[#0d6b4f]">
                                    {index + 1}
                                </div>
                                <h2 className="text-xl font-semibold text-slate-900">{state}</h2>
                                <p className="mt-3 text-sm leading-6 text-slate-600">ANCY is committed to youth engagement, leadership, and community action across this territory.</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}
