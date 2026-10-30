<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminMemberController;
use App\Http\Controllers\MemberRegistrationController;
use App\Http\Controllers\PublicPageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/coverage', [PublicPageController::class, 'coverage'])->name('coverage');
Route::get('/register', [PublicPageController::class, 'registerPage'])->name('register');
Route::post('/register/member', [MemberRegistrationController::class, 'store'])->name('member.register');
Route::get('/register/confirmation', [MemberRegistrationController::class, 'confirmation'])->name('register.confirmation');
Route::get('/contact', [PublicPageController::class, 'contactPage'])->name('contact');
Route::post('/contact', [PublicPageController::class, 'submitContact'])->name('contact.submit');
Route::get('/privacy', [PublicPageController::class, 'privacyPage'])->name('privacy');

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login.submit');
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/admin/settings', function () {
        return inertia('admin/settings', [
            'settings' => [
                'organization_name' => \App\Models\SiteSetting::value('organization_name', config('ancyn.organization_name')),
                'about_us' => \App\Models\SiteSetting::value('about_us', config('ancyn.default_about')),
                'vision' => \App\Models\SiteSetting::value('vision', config('ancyn.default_vision')),
                'mission' => \App\Models\SiteSetting::value('mission', config('ancyn.default_mission')),
                'contact_email' => \App\Models\SiteSetting::value('contact_email', config('ancyn.default_contact.email')),
                'contact_phone' => \App\Models\SiteSetting::value('contact_phone', config('ancyn.default_contact.phone')),
                'contact_address' => \App\Models\SiteSetting::value('contact_address', config('ancyn.default_contact.address')),
            ],
        ]);
    })->name('admin.settings');
    Route::post('/admin/settings', [AdminDashboardController::class, 'saveSettings'])->name('admin.settings.save');
    Route::get('/admin/members/{member}', [AdminMemberController::class, 'show'])->name('admin.members.show');
    Route::post('/admin/members/{member}/status', [AdminMemberController::class, 'updateStatus'])->name('admin.members.update-status');
    Route::get('/admin/export', [AdminDashboardController::class, 'export'])->name('admin.export');
});

require __DIR__.'/settings.php';
