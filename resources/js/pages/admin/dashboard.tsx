import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { FormEvent, useState } from 'react';

export default function AdminDashboardPage() {
    const page = usePage().props as any;
    const stats = page.stats ?? {};
    const members = page.members?.data ?? [];
    const links = page.members?.links ?? [];
    const states = page.states ?? [];
    const statuses = page.statuses ?? [];
    const filters = page.filters ?? {};
    const organizationName = page.organizationName ?? 'ANCYN';

    const [query, setQuery] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? '');
    const [state, setState] = useState(filters.state ?? '');
    const [lga, setLga] = useState(filters.lga ?? '');

    const applyFilters = (event: FormEvent) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (query) params.set('search', query);
        if (status) params.set('status', status);
        if (state) params.set('state', state);
        if (lga) params.set('lga', lga);
        router.get('/admin', params.toString() ? `?${params.toString()}` : '/admin');
    };

    const handleStatusUpdate = (id: number, statusValue: string) => {
        router.post(`/admin/members/${id}/status`, { status: statusValue }, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
                <div className="mx-auto max-w-7xl">
                    <header className="mb-8 flex flex-col justify-between gap-4 rounded-3xl bg-[#0b1d36] p-6 text-white md:flex-row md:items-center">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]">Admin Portal</p>
                            <h1 className="mt-2 text-3xl font-bold">{organizationName}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="/admin/settings" className="rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white">Settings</a>
                            <button type="button" onClick={() => router.post('/admin/logout')} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#0b1d36]">Logout</button>
                        </div>
                    </header>

                    <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Total Members</p><p className="mt-3 text-3xl font-bold">{stats.total ?? 0}</p></div>
                        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Pending</p><p className="mt-3 text-3xl font-bold">{stats.pending ?? 0}</p></div>
                        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Approved</p><p className="mt-3 text-3xl font-bold">{stats.approved ?? 0}</p></div>
                        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Rejected / Inactive</p><p className="mt-3 text-3xl font-bold">{stats.rejected_or_inactive ?? 0}</p></div>
                        <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Today</p><p className="mt-3 text-3xl font-bold">{stats.today ?? 0}</p></div>
                    </section>

                    <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                        <form onSubmit={applyFilters} className="grid gap-4 md:grid-cols-5">
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, VIN, membership no" className="rounded-xl border border-slate-200 px-4 py-3" />
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3">
                                <option value="">All statuses</option>
                                {(statuses ?? []).map((item: string) => <option key={item} value={item}>{item}</option>)}
                            </select>
                            <select value={state} onChange={(e) => setState(e.target.value)} className="rounded-xl border border-slate-200 px-4 py-3">
                                <option value="">All states</option>
                                {(states ?? []).map((item: string) => <option key={item} value={item}>{item}</option>)}
                            </select>
                            <input value={lga} onChange={(e) => setLga(e.target.value)} placeholder="LGA" className="rounded-xl border border-slate-200 px-4 py-3" />
                            <div className="flex gap-3">
                                <button type="submit" className="flex-1 rounded-xl bg-[#0d6b4f] px-4 py-3 font-semibold text-white">Search</button>
                                <a href="/admin/export" className="flex-1 rounded-xl bg-[#0b1d36] px-4 py-3 text-center font-semibold text-white">Export CSV</a>
                            </div>
                        </form>
                    </section>

                    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse text-left">
                                <thead className="bg-slate-50 text-sm uppercase tracking-wide text-slate-600">
                                    <tr>
                                        <th className="px-4 py-3">Membership</th>
                                        <th className="px-4 py-3">Name</th>
                                        <th className="px-4 py-3">VIN</th>
                                        <th className="px-4 py-3">Phone</th>
                                        <th className="px-4 py-3">State</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(members ?? []).map((member: any) => (
                                        <tr key={member.id} className="border-t border-slate-200">
                                            <td className="px-4 py-3 text-sm font-medium text-slate-800">{member.membership_number}</td>
                                            <td className="px-4 py-3 text-sm text-slate-700">{member.full_name}</td>
                                            <td className="px-4 py-3 text-sm text-slate-700">{member.vin}</td>
                                            <td className="px-4 py-3 text-sm text-slate-700">{member.phone_number}</td>
                                            <td className="px-4 py-3 text-sm text-slate-700">{member.state}</td>
                                            <td className="px-4 py-3 text-sm">
                                                <select defaultValue={member.status} onChange={(e) => handleStatusUpdate(member.id, e.target.value)} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs">
                                                    {(statuses ?? []).map((item: string) => <option key={item} value={item}>{item}</option>)}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                <a href={`/admin/members/${member.id}`} className="font-semibold text-[#0d6b4f]">View</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <div className="mt-6 flex justify-center gap-2">
                        {(links ?? []).map((link: any, index: number) => (
                            <a key={`${link.label}-${index}`} href={link.url || '#'} className={`rounded-lg border px-3 py-2 text-sm ${link.active ? 'bg-[#0d6b4f] text-white border-[#0d6b4f]' : 'bg-white text-slate-700 border-slate-200'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
