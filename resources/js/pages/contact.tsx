import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { FormEvent, useState } from 'react';

export default function ContactPage() {
    const { contact, errors } = usePage().props as any;
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.post('/contact', form, {
            onSuccess: () => {
                setSubmitted(true);
                setForm({ name: '', email: '', subject: '', message: '' });
            },
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Contact Us" />
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
                            <a href="/privacy" className="text-slate-200 hover:text-white">Privacy</a>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-3xl bg-[#0b1d36] p-8 text-white shadow-lg">
                        <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]">Contact Us</p>
                        <h1 className="mt-4 text-4xl font-bold">We are ready to listen.</h1>
                        <div className="mt-8 space-y-4 text-slate-200">
                            <p>Email: {contact?.email || 'Not yet configured'}</p>
                            <p>Phone: {contact?.phone || 'Not yet configured'}</p>
                            <p>Address: {contact?.address || 'Not yet configured'}</p>
                        </div>
                        <div className="mt-8 flex gap-4 text-sm text-slate-200">
                            {contact?.facebook ? <a href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a> : null}
                            {contact?.x ? <a href={contact.x} target="_blank" rel="noreferrer">X</a> : null}
                            {contact?.instagram ? <a href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a> : null}
                            {contact?.linkedin ? <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> : null}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="grid gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.name ? <p className="mt-2 text-sm text-red-600">{errors.name}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.email ? <p className="mt-2 text-sm text-red-600">{errors.email}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
                                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.subject ? <p className="mt-2 text-sm text-red-600">{errors.subject}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
                                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                                {errors?.message ? <p className="mt-2 text-sm text-red-600">{errors.message}</p> : null}
                            </div>
                            <button type="submit" disabled={processing} className="rounded-xl bg-[#0d6b4f] px-5 py-3 font-semibold text-white disabled:opacity-60">{processing ? 'Sending…' : 'Send Message'}</button>
                            {submitted ? <p role="status" className="text-sm text-green-700">Your message has been submitted successfully.</p> : null}
                        </div>
                    </form>
                </main>
            </div>
        </>
    );
}
