<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\LocationState;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicPageController extends Controller
{
    public function home()
    {
        return Inertia::render('welcome', [
            'organization' => [
                'name' => SiteSetting::value('organization_name', config('ancyn.organization_name')),
                'abbreviation' => SiteSetting::value('abbreviation', config('ancyn.abbreviation')),
                'about' => SiteSetting::value('about_us', config('ancyn.default_about')),
                'vision' => SiteSetting::value('vision', config('ancyn.default_vision')),
                'mission' => SiteSetting::value('mission', config('ancyn.default_mission')),
            ],
            'coreValues' => $this->decodeJsonList('core_values', config('ancyn.default_core_values')),
            'objectives' => $this->decodeJsonList('objectives', config('ancyn.default_objectives')),
            'programs' => $this->decodeJsonList('programs', config('ancyn.default_programs')),
            'states' => config('ancyn.states'),
            'contact' => [
                'email' => SiteSetting::value('contact_email', config('ancyn.default_contact.email')),
                'phone' => SiteSetting::value('contact_phone', config('ancyn.default_contact.phone')),
                'address' => SiteSetting::value('contact_address', config('ancyn.default_contact.address')),
            ],
        ]);
    }

    public function about()
    {
        return Inertia::render('about', [
            'organization' => [
                'name' => SiteSetting::value('organization_name', config('ancyn.organization_name')),
                'about' => SiteSetting::value('about_us', config('ancyn.default_about')),
                'vision' => SiteSetting::value('vision', config('ancyn.default_vision')),
                'mission' => SiteSetting::value('mission', config('ancyn.default_mission')),
            ],
            'coreValues' => $this->decodeJsonList('core_values', config('ancyn.default_core_values')),
            'objectives' => $this->decodeJsonList('objectives', config('ancyn.default_objectives')),
        ]);
    }

    public function coverage()
    {
        return Inertia::render('coverage', [
            'states' => config('ancyn.states'),
        ]);
    }

    public function registerPage()
    {
        return Inertia::render('membership/register', [
            'states' => LocationState::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function privacyPage()
    {
        return Inertia::render('privacy', [
            'privacyText' => SiteSetting::value('privacy_notice', config('ancyn.default_privacy')),
        ]);
    }

    public function contactPage()
    {
        return Inertia::render('contact', [
            'contact' => [
                'email' => SiteSetting::value('contact_email', config('ancyn.default_contact.email')),
                'phone' => SiteSetting::value('contact_phone', config('ancyn.default_contact.phone')),
                'address' => SiteSetting::value('contact_address', config('ancyn.default_contact.address')),
                'facebook' => SiteSetting::value('facebook_url', config('ancyn.default_contact.facebook')),
                'x' => SiteSetting::value('x_url', config('ancyn.default_contact.x')),
                'instagram' => SiteSetting::value('instagram_url', config('ancyn.default_contact.instagram')),
                'linkedin' => SiteSetting::value('linkedin_url', config('ancyn.default_contact.linkedin')),
            ],
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        ContactMessage::query()->create([
            'name' => trim($validated['name']),
            'email' => strtolower($validated['email']),
            'subject' => trim($validated['subject']),
            'message' => trim($validated['message']),
            'status' => 'new',
        ]);

        return back()->with('success', 'Your message has been received. The ANCYN team will review it and respond using the contact details provided.');
    }

    private function decodeJsonList(string $key, mixed $default): array
    {
        $value = SiteSetting::value($key, $default);

        if (is_array($value)) {
            return $value;
        }

        $decoded = json_decode((string) $value, true);

        return is_array($decoded) ? $decoded : (array) $default;
    }
}
