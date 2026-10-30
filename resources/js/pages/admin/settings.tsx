import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { FormEvent, useState } from 'react';

export default function AdminSettingsPage() {
    const { settings } = usePage().props as any;
    const [form, setForm] = useState({
        organization_name: settings?.organization_name ?? '',
        about_us: settings?.about_us ?? '',
        vision: settings?.vision ?? '',
        mission: settings?.mission ?? '',
        contact_email: settings?.contact_email ?? '',
        contact_phone: settings?.contact_phone ?? '',
        contact_address: settings?.contact_address ?? '',
    });

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        router.post('/admin/settings', form, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Website Settings" />
            <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
                <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-[#0d6b4f]">Website Settings</p>
                            <h1 className="mt-2 text-3xl font-bold">Manage public content</h1>
                        </div>
                        <a href="/admin" className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Back to dashboard</a>
                    </div>

                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Organization Name</label>
                            <input value={form.organization_name} onChange={(e) => setForm({ ...form, organization_name: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">About Us</label>
                            <textarea rows={4} value={form.about_us} onChange={(e) => setForm({ ...form, about_us: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Vision</label>
                            <textarea rows={3} value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Mission</label>
                            <textarea rows={3} value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Contact Email</label>
                                <input value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Contact Phone</label>
                                <input value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Office Address</label>
                                <input value={form.contact_address} onChange={(e) => setForm({ ...form, contact_address: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" />
                            </div>
                        </div>
                        <button type="submit" className="rounded-xl bg-[#0d6b4f] px-5 py-3 font-semibold text-white">Save Settings</button>
                    </form>
                </div>
            </div>
        </>
    );
}
