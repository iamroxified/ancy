import { Head, usePage } from '@inertiajs/react';

export default function AdminMessagesPage() {
    const { messages } = usePage().props as any;

    return (
        <>
            <Head title="Contact Messages" />
            <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-8 flex items-center justify-between">
                        <div><p className="text-sm uppercase tracking-[0.2em] text-[#0d6b4f]">Admin Inbox</p><h1 className="mt-2 text-3xl font-bold">Contact messages</h1></div>
                        <a href="/admin" className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-700">Back to dashboard</a>
                    </header>
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                        <table className="min-w-full text-left">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Received</th><th className="px-4 py-3">From</th><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr></thead>
                            <tbody>
                                {(messages?.data ?? []).map((message: any) => <tr key={message.id} className="border-t border-slate-200">
                                    <td className="px-4 py-3 text-sm">{message.created_at}</td><td className="px-4 py-3 text-sm">{message.name}<br /><span className="text-slate-500">{message.email}</span></td><td className="px-4 py-3 text-sm">{message.subject}</td><td className="px-4 py-3 text-sm capitalize">{message.status}</td><td className="px-4 py-3 text-sm"><a href={`/admin/messages/${message.id}`} className="font-semibold text-[#0d6b4f]">Open</a></td>
                                </tr>)}
                            </tbody>
                        </table>
                        {messages?.data?.length === 0 ? <p className="p-8 text-center text-sm text-slate-500">No contact messages yet.</p> : null}
                    </div>
                    <div className="mt-6 flex justify-center gap-2">{(messages?.links ?? []).map((link: any, index: number) => <a key={`${link.label}-${index}`} href={link.url || '#'} className={`rounded-lg border px-3 py-2 text-sm ${link.active ? 'bg-[#0d6b4f] text-white' : 'bg-white text-slate-700'}`} dangerouslySetInnerHTML={{ __html: link.label }} />)}</div>
                </div>
            </main>
        </>
    );
}