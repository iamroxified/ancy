<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminMemberController;
use App\Http\Controllers\AdminContactMessageController;
use App\Http\Controllers\MemberRegistrationController;
use App\Http\Controllers\LocationCatalogController;
use App\Http\Controllers\PublicPageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicPageController::class, 'home'])->name('home');
Route::get('/about', [PublicPageController::class, 'about'])->name('about');
Route::get('/coverage', [PublicPageController::class, 'coverage'])->name('coverage');
Route::get('/register', [PublicPageController::class, 'registerPage'])->name('register');
Route::post('/register/member', [MemberRegistrationController::class, 'store'])->middleware('throttle:5,1')->name('member.register');
Route::get('/register/confirmation', [MemberRegistrationController::class, 'confirmation'])->name('register.confirmation');
Route::get('/contact', [PublicPageController::class, 'contactPage'])->name('contact');
Route::post('/contact', [PublicPageController::class, 'submitContact'])->middleware('throttle:5,1')->name('contact.submit');
Route::get('/privacy', [PublicPageController::class, 'privacyPage'])->name('privacy');
Route::get('/locations/states/{state}/local-governments', [LocationCatalogController::class, 'localGovernments'])->name('locations.local-governments');
Route::get('/locations/local-governments/{localGovernment}/wards', [LocationCatalogController::class, 'wards'])->name('locations.wards');
Route::get('/locations/wards/{locationWard}/polling-units', [LocationCatalogController::class, 'pollingUnits'])->name('locations.polling-units');

Route::get('/admin/login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('/admin/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1')->name('admin.login.submit');
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::get('/admin/members/{member}', [AdminMemberController::class, 'show'])->name('admin.members.show');
    Route::patch('/admin/members/{member}', [AdminMemberController::class, 'update'])->name('admin.members.update');
    Route::post('/admin/members/{member}/status', [AdminMemberController::class, 'updateStatus'])->name('admin.members.update-status');
    Route::get('/admin/export', [AdminDashboardController::class, 'export'])->name('admin.export');
    Route::get('/admin/messages', [AdminContactMessageController::class, 'index'])->name('admin.messages.index');
    Route::get('/admin/messages/{contactMessage}', [AdminContactMessageController::class, 'show'])->name('admin.messages.show');
    Route::post('/admin/messages/{contactMessage}/status', [AdminContactMessageController::class, 'updateStatus'])->name('admin.messages.status');
});

Route::middleware(['auth', 'admin', 'super-admin'])->group(function () {
    Route::get('/admin/settings', [AdminDashboardController::class, 'settings'])->name('admin.settings');
    Route::post('/admin/settings', [AdminDashboardController::class, 'saveSettings'])->name('admin.settings.save');
});

require __DIR__.'/settings.php';
