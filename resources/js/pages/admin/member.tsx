import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { useState } from 'react';

export default function AdminMemberPage() {
    const { member } = usePage().props as any;
    const [status, setStatus] = useState(member?.status ?? 'pending');

    const handleUpdate = () => {
        router.post(`/admin/members/${member.id}/status`, { status }, { preserveScroll: true });
    };

    return (
        <>
            <Head title={`Member ${member?.membership_number}`} />
            <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
                <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-[#0d6b4f]">Member Record</p>
                            <h1 className="mt-2 text-3xl font-bold">{member?.full_name}</h1>
                        </div>
                        <a href="/admin" className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Back to dashboard</a>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Membership Number</p><p className="mt-2 font-semibold">{member?.membership_number}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Status</p><p className="mt-2 font-semibold">{member?.status}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">VIN</p><p className="mt-2 font-semibold">{member?.vin}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Phone Number</p><p className="mt-2 font-semibold">{member?.phone_number}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">State</p><p className="mt-2 font-semibold">{member?.state}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">LGA</p><p className="mt-2 font-semibold">{member?.lga}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Ward</p><p className="mt-2 font-semibold">{member?.ward}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Polling Unit</p><p className="mt-2 font-semibold">{member?.polling_unit}</p></div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-slate-600">Approval / Status Update</p>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 md:flex-1">
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button onClick={handleUpdate} className="rounded-xl bg-[#0d6b4f] px-5 py-3 font-semibold text-white">Update Status</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
