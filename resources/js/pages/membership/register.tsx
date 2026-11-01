import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/core';
import { FormEvent, useState } from 'react';
import { Menu, X } from 'lucide-react';

type LocationOption = { id: number; name: string };

export default function MembershipRegisterPage() {
    const { states, errors } = usePage().props as any;
    const [processing, setProcessing] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [localGovernments, setLocalGovernments] = useState<LocationOption[]>([]);
    const [wards, setWards] = useState<LocationOption[]>([]);
    const [pollingUnits, setPollingUnits] = useState<LocationOption[]>([]);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState('');
    const [form, setForm] = useState({
        full_name: '',
        vin: '',
        phone_number: '',
        state_id: '',
        local_government_id: '',
        ward_id: '',
        polling_unit_id: '',
        privacy_consent: false,
    });

    const loadLocations = async (url: string): Promise<LocationOption[]> => {
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Location options could not be loaded. Please try again.');
        return response.json();
    };

    const selectState = async (stateId: string) => {
        setForm({ ...form, state_id: stateId, local_government_id: '', ward_id: '', polling_unit_id: '' });
        setLocalGovernments([]);
        setWards([]);
        setPollingUnits([]);
        setLocationError('');
        if (!stateId) return;
        setLoadingLocation(true);
        try {
            setLocalGovernments(await loadLocations(`/locations/states/${stateId}/local-governments`));
        } catch (error) {
            setLocationError(error instanceof Error ? error.message : 'Location options could not be loaded.');
        } finally {
            setLoadingLocation(false);
        }
    };

    const selectLocalGovernment = async (localGovernmentId: string) => {
        setForm({ ...form, local_government_id: localGovernmentId, ward_id: '', polling_unit_id: '' });
        setWards([]);
        setPollingUnits([]);
        setLocationError('');
        if (!localGovernmentId) return;
        setLoadingLocation(true);
        try {
            setWards(await loadLocations(`/locations/local-governments/${localGovernmentId}/wards`));
        } catch (error) {
            setLocationError(error instanceof Error ? error.message : 'Location options could not be loaded.');
        } finally {
            setLoadingLocation(false);
        }
    };

    const selectWard = async (wardId: string) => {
        setForm({ ...form, ward_id: wardId, polling_unit_id: '' });
        setPollingUnits([]);
        setLocationError('');
        if (!wardId) return;
        setLoadingLocation(true);
        try {
            setPollingUnits(await loadLocations(`/locations/wards/${wardId}/polling-units`));
        } catch (error) {
            setLocationError(error instanceof Error ? error.message : 'Location options could not be loaded.');
        } finally {
            setLoadingLocation(false);
        }
    };

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
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b1d36]">ANCY</span>
                            <span>ANCY</span>
                        </a>
                        <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 md:hidden">
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <nav className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full z-10 flex-col gap-1 border-t border-white/10 bg-[#0b1d36] px-6 py-3 text-sm md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}>
                            <a href="/" className="text-slate-200 hover:text-white">Home</a>
                            <a href="/about" className="text-slate-200 hover:text-white">About</a>
                            <a href="/register" className="text-slate-200 hover:text-white">Register</a>
                            <a href="/contact" className="text-slate-200 hover:text-white">Contact</a>
                            <a href="/admin/login" className="rounded-full bg-white px-4 py-2 font-medium text-[#0b1d36]">Admin Login</a>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-4xl px-6 py-16">
                    <div className="mb-8 text-center">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Member Registration</p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Join the ANCY membership network.</h1>
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
                                <select value={form.state_id} onChange={(e) => void selectState(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" required>
                                    <option value="">Select state</option>
                                    {(states ?? []).map((state: LocationOption) => (
                                        <option key={state.id} value={state.id}>{state.name}</option>
                                    ))}
                                </select>
                                {errors?.state_id ? <p className="mt-2 text-sm text-red-600">{errors.state_id}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">LGA</label>
                                <select value={form.local_government_id} onChange={(e) => void selectLocalGovernment(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" required disabled={!form.state_id || loadingLocation}>
                                    <option value="">{!form.state_id ? 'Select a state first' : loadingLocation ? 'Loading LGAs…' : 'Select LGA'}</option>
                                    {localGovernments.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                                {errors?.local_government_id ? <p className="mt-2 text-sm text-red-600">{errors.local_government_id}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Ward</label>
                                <select value={form.ward_id} onChange={(e) => void selectWard(e.target.value)} className="w-full rounded-xl border border-slate-200 px-4 py-3" required disabled={!form.local_government_id || loadingLocation}>
                                    <option value="">{!form.local_government_id ? 'Select an LGA first' : loadingLocation ? 'Loading wards…' : 'Select ward'}</option>
                                    {wards.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                                {errors?.ward_id ? <p className="mt-2 text-sm text-red-600">{errors.ward_id}</p> : null}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">Polling Unit</label>
                                <select value={form.polling_unit_id} onChange={(e) => setForm({ ...form, polling_unit_id: e.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" required disabled={!form.ward_id || loadingLocation}>
                                    <option value="">{!form.ward_id ? 'Select a ward first' : loadingLocation ? 'Loading polling units…' : 'Select polling unit'}</option>
                                    {pollingUnits.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                                {errors?.polling_unit_id ? <p className="mt-2 text-sm text-red-600">{errors.polling_unit_id}</p> : null}
                            </div>
                            {locationError ? <p role="alert" className="md:col-span-2 text-sm text-red-600">{locationError}</p> : null}
                        </div>

                        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <label className="flex items-start gap-3 text-sm text-slate-700">
                                <input type="checkbox" checked={form.privacy_consent} onChange={(e) => setForm({ ...form, privacy_consent: e.target.checked })} className="mt-1 h-4 w-4 rounded border-slate-300" required />
                                <span>I confirm that I have read the privacy notice and consent to ANCY processing my information for membership administration, communication, and lawful reporting as described in the privacy policy.</span>
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
