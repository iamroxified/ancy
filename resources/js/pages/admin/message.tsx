import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { useState } from 'react';

export default function AdminMessagePage() {
    const { message } = usePage().props as any;
    const [status, setStatus] = useState(message.status);

    return (
        <>
            <Head title={`Message: ${message.subject}`} />
            <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
                <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8">
                    <a href="/admin/messages" className="text-sm font-medium text-[#0d6b4f]">Back to inbox</a>
                    <p className="mt-8 text-sm uppercase tracking-[0.18em] text-slate-500">{message.created_at}</p>
                    <h1 className="mt-2 text-3xl font-bold">{message.subject}</h1>
                    <p className="mt-4 text-sm text-slate-600">{message.name} · <a className="text-[#0d6b4f]" href={`mailto:${message.email}`}>{message.email}</a></p>
                    <p className="mt-8 whitespace-pre-wrap leading-7 text-slate-800">{message.message}</p>
                    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-6">
                        <label htmlFor="message-status" className="text-sm font-medium">Status</label>
                        <select id="message-status" value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 capitalize">
                            <option value="new">New</option><option value="read">Read</option><option value="resolved">Resolved</option>
                        </select>
                        <button type="button" onClick={() => router.post(`/admin/messages/${message.id}/status`, { status })} className="rounded-lg bg-[#0d6b4f] px-4 py-2 text-sm font-semibold text-white">Save status</button>
                    </div>
                </article>
            </main>
        </>
    );
}