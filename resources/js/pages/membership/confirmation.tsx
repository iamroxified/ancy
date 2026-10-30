import { Head, usePage } from '@inertiajs/react';

export default function MemberConfirmationPage() {
    const { membershipNumber } = usePage().props as any;

    return (
        <>
            <Head title="Registration Confirmed" />
            <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
                <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#eefaf5] text-2xl text-[#0d6b4f]">✓</div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0d6b4f]">Registration received</p>
                    <h1 className="mt-4 text-3xl font-bold text-slate-900">Your membership application has been submitted.</h1>
                    <p className="mt-4 text-slate-600">Your public membership reference number is:</p>
                    <div className="mt-6 rounded-2xl bg-slate-100 p-5 text-2xl font-bold tracking-[0.15em] text-[#0b1d36]">{membershipNumber}</div>
                    <p className="mt-5 text-sm text-slate-600">Please keep this number for follow-up or confirmation requests. Registration does not by itself constitute voter registration, electoral verification, or proof of membership approval.</p>
                    <a href="/" className="mt-8 inline-flex rounded-xl bg-[#0d6b4f] px-6 py-3 font-semibold text-white">Return Home</a>
                </div>
            </div>
        </>
    );
}
