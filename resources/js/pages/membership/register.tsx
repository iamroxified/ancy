import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { FormEvent, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MembershipRegisterPage() {
    const { states, lgas, errors } = usePage().props as any;
    const [processing, setProcessing] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [form, setForm] = useState({
        full_name: '',
        vin: '',
        phone_number: '',
        state: '',
        lga: '',
        ward: '',
        polling_unit: '',
        privacy_consent: false,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.post('/register/member', {
            ...form,
            privacy_consent: form.privacy_consent ? '1' : '0',
        }, {
            preserveScroll: true,
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title="Membership Registration" />
            <div className="min-h-screen bg-slate-50 text-slate-900">
                <header className="border-b border-slate-200 bg-[#0b1d36] text-white">
                    <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <a href="/" className="flex items-center gap-3 font-semibold tracking-wide">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b1d36]">ANCYN</span>
                            <span>ANCYN</span>
                        </a>
                        <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 md:hidden">
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full z-10 flex-col gap-1 border-t border-white/10 bg-[#0b1d36] px-6 py-3 text-sm md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
                            <a href="/about" className="text-slate-200 hover:text-white">About</a>
                            <a href="/coverage" className="text-slate-200 hover:text-white">Coverage</a>
                            <a href="/contact" className="text-slate-200 hover:text-white">Contact</a>
                            <a href="/privacy" className="text-slate-200 hover:text-white">Privacy</a>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl px-6 py-16">
                    <div className="mb-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Member Registration</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Join the ANCYN membership network.</h1>
                        <p className="mt-4 text-slate-600">We collect this information solely for legitimate membership administration. Registration does not itself constitute voter registration or proof of membership approval.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                                <input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.full_name ? <p className="mt-2 text-sm text-red-600">{errors.full_name}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">VIN</label>
                                <input value={form.vin} onChange={(e) => setForm({ ...form, vin: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.vin ? <p className="mt-2 text-sm text-red-600">{errors.vin}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Phone Number</label>
                                <input value={form.phone_number} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} placeholder="08031234567" className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.phone_number ? <p className="mt-2 text-sm text-red-600">{errors.phone_number}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">State</label>
                                <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value, lga: '' })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required>
                                    <option value="">Select state</option>
                                    {(states ?? []).map((state: string) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                                {errors?.state ? <p className="mt-2 text-sm text-red-600">{errors.state}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">LGA</label>
                                <select value={form.lga} onChange={(e) => setForm({ ...form, lga: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required disabled={!form.state}>
                                    <option value="">{form.state ? 'Select LGA' : 'Select a state first'}</option>
                                    {(lgas?.[form.state] ?? []).map((lga: string) => <option key={lga} value={lga}>{lga}</option>)}
                                </select>
                                {errors?.lga ? <p className="mt-2 text-sm text-red-600">{errors.lga}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Ward</label>
                                <input value={form.ward} onChange={(e) => setForm({ ...form, ward: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.ward ? <p className="mt-2 text-sm text-red-600">{errors.ward}</p> : null}
                            </div>
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700">Polling Unit</label>
                                <input value={form.polling_unit} onChange={(e) => setForm({ ...form, polling_unit: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.polling_unit ? <p className="mt-2 text-sm text-red-600">{errors.polling_unit}</p> : null}
                            </div>
                        </div>

                        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <label className="flex items-start gap-3 text-sm text-slate-700">
                                <input type="checkbox" checked={form.privacy_consent} onChange={(e) => setForm({ ...form, privacy_consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-slate-300" required />
                                <span>I confirm that I have read the privacy notice and consent to ANCYN processing my information for membership administration, communication, and lawful reporting as described in the privacy policy.</span>
                            </label>
                            {errors?.privacy_consent ? <p className="mt-2 text-sm text-red-600">{errors.privacy_consent}</p> : null}
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4">
                            <a href="/privacy" className="text-sm font-medium text-[#0d6b4f]">Read privacy notice</a>
                            <button type="submit" disabled={processing} className="rounded-xl bg-[#0d6b4f] px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{processing ? 'Submitting…' : 'Submit Registration'}</button>
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}
