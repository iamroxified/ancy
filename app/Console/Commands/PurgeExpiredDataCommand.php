<?php

namespace App\Console\Commands;

use App\Models\AuditLog;
use App\Models\ContactMessage;
use App\Models\Member;
use App\Models\SiteSetting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PurgeExpiredDataCommand extends Command
{
    protected $signature = 'ancy:purge-expired-data';

    protected $description = 'Delete member and contact records past configured retention periods.';

    public function handle(): int
    {
        $memberDays = (int) SiteSetting::value('member_retention_days', config('ancyn.retention.member_days', 0));
        $messageDays = (int) SiteSetting::value('contact_message_retention_days', config('ancyn.retention.contact_message_days', 0));

        if ($memberDays <= 0 && $messageDays <= 0) {
            $this->info('Automatic retention is disabled. No records were deleted.');

            return self::SUCCESS;
        }

        $deleted = DB::transaction(function () use ($memberDays, $messageDays): array {
            $counts = ['members' => 0, 'contact_messages' => 0];

            if ($memberDays > 0) {
                $counts['members'] = Member::query()
                    ->where('created_at', '<', now()->subDays($memberDays))
                    ->delete();
            }

            if ($messageDays > 0) {
                $counts['contact_messages'] = ContactMessage::query()
                    ->where('created_at', '<', now()->subDays($messageDays))
                    ->delete();
            }

            AuditLog::record('retention_purge_completed', $counts);

            return $counts;
        });

        $this->info("Deleted {$deleted['members']} expired member records and {$deleted['contact_messages']} expired contact messages.");

        return self::SUCCESS;
    }
}