import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
    const { errors } = usePage().props as any;
    const [form, setForm] = useState({ email: '', password: '', remember: false });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.post('/admin/login', form);
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
                <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b1d36] text-lg font-bold text-[#d4af37]">ANCYN</div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
                        <p className="mt-2 text-sm text-slate-600">Sign in to manage membership records securely.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                            {errors?.email ? <p className="mt-2 text-sm text-red-600">{errors.email}</p> : null}
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required />
                        </div>
                        <label className="flex items-center gap-2 text-sm text-slate-700">
                            <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
                            Remember me
                        </label>
                        <button type="submit" className="w-full rounded-xl bg-[#0d6b4f] px-4 py-3 font-semibold text-white">Login to Dashboard</button>
                    </form>
                </div>
            </div>
        </>
    );
}
