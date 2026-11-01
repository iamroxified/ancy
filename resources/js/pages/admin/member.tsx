import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { useEffect, useState } from 'react';

type LocationOption = { id: number; name: string };

export default function AdminMemberPage() {
    const { member, states, errors } = usePage().props as any;
    const [status, setStatus] = useState(member?.status ?? 'pending');
    const [form, setForm] = useState({
        full_name: member?.full_name ?? '',
        vin: '',
        phone_number: '',
        state_id: member?.state_id ? String(member.state_id) : '',
        local_government_id: member?.local_government_id ? String(member.local_government_id) : '',
        ward_id: member?.ward_id ? String(member.ward_id) : '',
        polling_unit_id: member?.polling_unit_id ? String(member.polling_unit_id) : '',
    });
    const [localGovernments, setLocalGovernments] = useState<LocationOption[]>([]);
    const [wards, setWards] = useState<LocationOption[]>([]);
    const [pollingUnits, setPollingUnits] = useState<LocationOption[]>([]);

    useEffect(() => {
        if (!form.state_id) return;
        let current = true;
        fetch(`/locations/states/${form.state_id}/local-governments`, { headers: { Accept: 'application/json' } })
            .then((response) => response.json())
            .then((options) => { if (current) setLocalGovernments(options); });
        return () => { current = false; };
    }, [form.state_id]);

    useEffect(() => {
        if (!form.local_government_id) return;
        let current = true;
        fetch(`/locations/local-governments/${form.local_government_id}/wards`, { headers: { Accept: 'application/json' } })
            .then((response) => response.json())
            .then((options) => { if (current) setWards(options); });
        return () => { current = false; };
    }, [form.local_government_id]);

    useEffect(() => {
        if (!form.ward_id) return;
        let current = true;
        fetch(`/locations/wards/${form.ward_id}/polling-units`, { headers: { Accept: 'application/json' } })
            .then((response) => response.json())
            .then((options) => { if (current) setPollingUnits(options); });
        return () => { current = false; };
    }, [form.ward_id]);

    const handleUpdate = () => {
        if (status !== member.status && !window.confirm(`Change this member's status to ${status}?`)) return;
        router.post(`/admin/members/${member.id}/status`, { status }, { preserveScroll: true });
    };

    const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.patch(`/admin/members/${member.id}`, form, { preserveScroll: true });
    };

    return (
        <>
            <Head title={member?.membership_number ? `Member ${member.membership_number}` : 'Imported Member'} />
            <div className="min-h-screen bg-slate-100 p-6 text-slate-900">
                <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-[#0d6b4f]">Member Record</p>
                            <h1 className="mt-2 text-3xl font-bold">{member?.full_name ?? 'Name not provided'}</h1>
                        </div>
                        <a href="/admin" className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Back to dashboard</a>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Membership Number</p><p className="mt-2 font-semibold">{member?.membership_number ?? 'Not assigned'}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Status</p><p className="mt-2 font-semibold">{member?.status}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">VIN</p><p className="mt-2 font-semibold">{member?.vin}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Phone Number</p><p className="mt-2 font-semibold">{member?.phone_number}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">State</p><p className="mt-2 font-semibold">{member?.state}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">LGA</p><p className="mt-2 font-semibold">{member?.lga}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Ward</p><p className="mt-2 font-semibold">{member?.ward}</p></div>
                        <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs uppercase tracking-[0.15em] text-slate-500">Polling Unit</p><p className="mt-2 font-semibold">{member?.polling_unit}</p></div>
                    </div>

                    <form onSubmit={handleEdit} className="mt-8 grid gap-5 rounded-2xl border border-slate-200 p-5">
                        <h2 className="text-lg font-semibold">Correct member details</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="grid gap-2 text-sm font-medium">Full Name<input value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} className="rounded-xl border border-slate-200 px-4 py-3" />{errors?.full_name ? <span className="text-red-600">{errors.full_name}</span> : null}</label>
                            <label className="grid gap-2 text-sm font-medium">Replace VIN (optional)<input value={form.vin} onChange={(event) => setForm({ ...form, vin: event.target.value })} autoComplete="off" className="rounded-xl border border-slate-200 px-4 py-3" />{errors?.vin ? <span className="text-red-600">{errors.vin}</span> : null}</label>
                            <label className="grid gap-2 text-sm font-medium">Replace Phone Number (optional)<input value={form.phone_number} onChange={(event) => setForm({ ...form, phone_number: event.target.value })} autoComplete="off" className="rounded-xl border border-slate-200 px-4 py-3" />{errors?.phone_number ? <span className="text-red-600">{errors.phone_number}</span> : null}</label>
                            <label className="grid gap-2 text-sm font-medium">State<select value={form.state_id} onChange={(event) => { setLocalGovernments([]); setWards([]); setPollingUnits([]); setForm({ ...form, state_id: event.target.value, local_government_id: '', ward_id: '', polling_unit_id: '' }); }} className="rounded-xl border border-slate-200 px-4 py-3"><option value="">Select state</option>{(states ?? []).map((item: LocationOption) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{errors?.state_id ? <span className="text-red-600">{errors.state_id}</span> : null}</label>
                            <label className="grid gap-2 text-sm font-medium">LGA<select value={form.local_government_id} disabled={!form.state_id} onChange={(event) => { setWards([]); setPollingUnits([]); setForm({ ...form, local_government_id: event.target.value, ward_id: '', polling_unit_id: '' }); }} className="rounded-xl border border-slate-200 px-4 py-3"><option value="">Select LGA</option>{localGovernments.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{errors?.local_government_id ? <span className="text-red-600">{errors.local_government_id}</span> : null}</label>
                            <label className="grid gap-2 text-sm font-medium">Ward<select value={form.ward_id} disabled={!form.local_government_id} onChange={(event) => { setPollingUnits([]); setForm({ ...form, ward_id: event.target.value, polling_unit_id: '' }); }} className="rounded-xl border border-slate-200 px-4 py-3"><option value="">Select ward</option>{wards.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{errors?.ward_id ? <span className="text-red-600">{errors.ward_id}</span> : null}</label>
                            <label className="grid gap-2 text-sm font-medium md:col-span-2">Polling Unit<select value={form.polling_unit_id} disabled={!form.ward_id} onChange={(event) => setForm({ ...form, polling_unit_id: event.target.value })} className="rounded-xl border border-slate-200 px-4 py-3"><option value="">Select polling unit</option>{pollingUnits.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>{errors?.polling_unit_id ? <span className="text-red-600">{errors.polling_unit_id}</span> : null}</label>
                        </div>
                        <button type="submit" className="w-fit rounded-xl bg-[#0b1d36] px-5 py-3 font-semibold text-white">Save Corrections</button>
                    </form>

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
