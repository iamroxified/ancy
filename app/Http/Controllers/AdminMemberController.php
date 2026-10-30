<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\Member;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMemberController extends Controller
{
    public function show(Member $member)
    {
        AuditLog::record('member_record_viewed', ['member_id' => $member->id, 'membership_number' => $member->membership_number], Member::class, $member->id);

        return Inertia::render('admin/member', [
            'member' => [
                'id' => $member->id,
                'membership_number' => $member->membership_number,
                'full_name' => $member->full_name,
                'vin' => $member->maskedVin(),
                'phone_number' => $member->maskedPhone(),
                'state' => $member->state,
                'lga' => $member->lga,
                'ward' => $member->ward,
                'polling_unit' => $member->polling_unit,
                'status' => $member->status,
                'created_at' => $member->created_at?->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    public function updateStatus(Request $request, Member $member)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,approved,rejected,inactive'],
        ]);

        $previous = $member->status;
        $member->status = $validated['status'];
        $member->save();

        AuditLog::record('member_status_updated', [
            'member_id' => $member->id,
            'from' => $previous,
            'to' => $validated['status'],
        ], Member::class, $member->id);

        return back()->with('success', 'Member status updated successfully.');
    }
}
