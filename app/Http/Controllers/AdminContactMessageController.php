<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactMessageController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/messages', [
            'messages' => ContactMessage::query()
                ->orderByRaw("case status when 'new' then 0 when 'read' then 1 else 2 end")
                ->orderByDesc('created_at')
                ->paginate(20),
        ]);
    }

    public function show(ContactMessage $contactMessage)
    {
        AuditLog::record('contact_message_viewed', ['message_id' => $contactMessage->id]);

        return Inertia::render('admin/message', ['message' => $contactMessage]);
    }

    public function updateStatus(Request $request, ContactMessage $contactMessage)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,read,resolved'],
        ]);

        $previousStatus = $contactMessage->status;
        $contactMessage->update(['status' => $validated['status']]);
        AuditLog::record('contact_message_status_updated', [
            'message_id' => $contactMessage->id,
            'from' => $previousStatus,
            'to' => $contactMessage->status,
        ]);

        return back()->with('success', 'Message status updated.');
    }
}