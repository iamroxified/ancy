PROJECT: Alliance of North Central Youth of Nigeria (ANCYN) Website & Membership Management System

Act as a senior full-stack software engineer, UI/UX designer, database architect, and security specialist. Build a complete, production-ready website and membership management system for the Alliance of North Central Youth of Nigeria (ANCYN).

Do not stop at designing the interface or creating a static frontend. Implement the frontend, backend, database, authentication, validation, admin dashboard, and all essential functionality. Every button, form, filter, and dashboard action must work.

1. PROJECT OBJECTIVES

The system must:

1. Establish a professional online presence for ANCYN.
2. Communicate the organization’s identity, vision, mission, objectives, and core values.
3. Allow individuals to register as members by submitting their personal and polling-unit information.
4. Store membership records in a properly structured database.
5. Allow authorized administrators to securely log in and view, search, filter, and manage membership records.
6. Support exporting membership records to CSV or Excel.
7. Be responsive, accessible, secure, and easy to use on mobile phones, tablets, and desktop computers.

2. ORGANIZATION INFORMATION

Full name: Alliance of North Central Youth of Nigeria

Abbreviation: ANCYN

Organization type: Regional, youth-driven organization.

About Us

The Alliance of North Central Youth of Nigeria (ANCYN) is a regional, youth-driven organization committed to empowering young people across Nigeria’s North Central geopolitical zone.

The Alliance provides a unified platform for youth engagement, leadership development, economic advancement, and community transformation.

ANCYN works to amplify youth voices, strengthen interstate collaboration, and promote peace, innovation, and inclusive governance within the region.

Vision

To build a united, empowered, and progressive North Central region where young people are drivers of sustainable development, peace, and innovation.

Mission

To mobilize, empower, and connect the youth of the North Central zone through leadership training, socioeconomic programs, advocacy, community development initiatives, and partnerships that enhance youth participation in regional and national development.

Core Values

* Unity: Promoting cooperation among youth across all North Central states.
* Integrity: Upholding transparency, accountability, and ethical leadership.
* Innovation: Encouraging creativity, digital literacy, and entrepreneurship.
* Peace and Inclusiveness: Fostering harmony, tolerance, and equal opportunities for all.
* Service: Commitment to community development and national growth.

Objectives

Youth Empowerment: Provide training, mentorship, and capacity-building programs that enhance leadership and employability skills.

Advocacy: Represent youth interests in regional and national dialogues, policymaking, and developmental initiatives.

Economic Development: Facilitate opportunities for entrepreneurship, job creation, and access to resources for young people.

Peacebuilding: Promote inter-ethnic unity, conflict resolution, and security awareness across the region.

Collaboration: Build partnerships with government agencies, NGOs, private sector organizations, and international bodies to support youth development.

Community Development: Initiate and support projects focused on education, health, environment, and social welfare.

Digital and Social Advancement: Strengthen digital skills, innovation hubs, and technology-driven solutions for youth advancement.

States and Territory Covered

ANCYN covers the following seven administrative areas:

1. Benue State
2. Kogi State
3. Kwara State
4. Nasarawa State
5. Niger State
6. Plateau State
7. Federal Capital Territory (FCT)

Display these areas prominently on the website, preferably through an interactive or visually appealing regional representation.

Do not invent the names of ANCYN executives, officeholders, sponsors, contact information, achievements, events, or official partnerships. Make such content configurable through the admin panel or use clearly marked placeholders until verified information is supplied.

3. WEBSITE DESIGN AND USER EXPERIENCE

Create a modern, premium, credible, youth-focused organizational website.

The visual identity should communicate leadership, unity, patriotism, innovation, peace, and regional development.

Design direction

* Use a clean, professional layout with generous whitespace.
* Use a refined color palette based on deep navy blue, green, white, and restrained gold accents.
* Use strong typography, clear visual hierarchy, and high-quality, relevant imagery representing Nigerian youth, leadership, community development, and collaboration.
* Avoid excessive gradients, unnecessary animations, cluttered layouts, and generic AI-generated design patterns.
* Use subtle transitions and polished hover states where appropriate.
* Ensure excellent mobile responsiveness and accessibility.
* Use reusable UI components and consistent spacing.

Public website pages

A. Home Page

Include:

* A professional navigation bar with the ANCYN name, logo placeholder, and navigation links.
* A compelling hero section introducing ANCYN.
* Primary call-to-action: “Register as a Member”.
* Secondary call-to-action: “Learn About ANCYN”.
* A short introduction to the organization.
* Vision and mission sections.
* Core values.
* Key objectives.
* The seven states and territory covered.
* A section explaining why young people should join ANCYN.
* Highlights of programs and initiatives, using editable placeholders where actual information is unavailable.
* A final membership registration call-to-action.
* A professional footer with contact placeholders, navigation links, and privacy information.

B. About ANCYN

Present the organization’s background, vision, mission, core values, and objectives in a structured and visually appealing format.

C. Our Coverage

Present Benue, Kogi, Kwara, Nasarawa, Niger, Plateau, and the FCT. Use cards, a regional map, or another suitable visual. Do not fabricate state chapter addresses or coordinator names.

D. Membership Registration

Create a dedicated, mobile-friendly membership registration page with a clear explanation of the information being collected and a link to the privacy notice.

E. Contact Us

Provide a contact form and configurable organizational email, phone number, office address, and social media links. Use placeholders until official details are supplied.

F. Privacy Notice

Explain what data is collected, why it is collected, how it is used, who can access it, how it is protected, and how members can request corrections or deletion where applicable.

4. MEMBERSHIP REGISTRATION FORM

Create a fully functional registration form that saves submitted records to the database.

The required fields are:

1. Full Name — required text field.
2. VIN (Voter Identification Number) — required field, treated as a string to preserve any leading zeros or letters.
3. Phone Number — required field, validated for Nigerian phone-number formats.
4. State of Residence / Registration — required dropdown containing Benue, Kogi, Kwara, Nasarawa, Niger, Plateau, and Federal Capital Territory.
5. Local Government Area (LGA) — required dropdown whose options depend on the selected state or territory.
6. Ward — required field or dropdown where a reliable ward list is available.
7. Polling Unit — required field or dropdown where a reliable polling-unit list is available.

Registration behavior

* Validate all required fields on both frontend and backend.
* Use dependent dropdowns for state and LGA.
* Load official ward and polling-unit options from a verified dataset if available.
* If reliable ward or polling-unit data is unavailable, allow the user to enter those values manually rather than fabricating options.
* Normalize phone numbers consistently.
* Prevent duplicate registrations using an appropriate database uniqueness constraint for VIN and/or another verified unique identifier.
* When a duplicate is detected, show a clear, user-friendly error without revealing the details of an existing member.
* Display a loading state while submitting.
* Show a success message after the server confirms the record has been saved.
* Generate a unique membership reference number for every successful registration.
* Provide a registration confirmation screen displaying the reference number.
* Do not expose database IDs or sensitive personal information in public URLs.
* Include a required privacy acknowledgment checkbox.
* Do not request or store passwords, bank details, photographs of voter cards, or other unnecessary sensitive information.

Make it clear that registration with ANCYN does not itself constitute voter registration, electoral verification, or proof of membership approval.

5. DATABASE ARCHITECTURE

Use a relational database with proper migrations, constraints, indexes, and relationships.

Create a members table with fields similar to:

* id — primary key.
* membership_number — unique public reference.
* full_name — required.
* vin — encrypted at rest if practical, or otherwise protected through a carefully designed access-controlled storage approach.
* vin_lookup_hash — optional keyed hash for duplicate detection without requiring plaintext comparison.
* phone_number — required and appropriately protected.
* state — required.
* lga — required.
* ward — required.
* polling_unit — required.
* privacy_consent_at — timestamp.
* status — pending, approved, rejected, or inactive, as appropriate.
* created_at.
* updated_at.

Store sensitive information using appropriate encryption and access controls. Do not log VINs or full membership records in application logs.

Create an admins or equivalent users table with:

* ID.
* Name.
* Email.
* Securely hashed password.
* Role.
* Account status.
* Last login timestamp.
* Created and updated timestamps.

Create an audit log for important administrative actions, such as viewing sensitive records where feasible, changing membership status, exporting records, and modifying administrator accounts. Never store passwords, encryption keys, or full VINs in audit logs.

Add database indexes for common searches, filtering, and reporting.

6. ADMIN AUTHENTICATION AND SECURITY

Create a separate, protected admin login page.

Requirements:

* Secure session-based authentication or the framework’s recommended secure authentication mechanism.
* Secure password hashing.
* Role-based access control.
* Server-side authorization for every protected endpoint.
* Login rate limiting and protection against brute-force attacks.
* CSRF protection where applicable.
* Input validation and output escaping.
* SQL injection protection.
* Secure session cookies.
* Appropriate security headers.
* Protection against unauthorized access to exported files and membership records.
* Logout functionality.
* No public admin registration page.
* Never hardcode production credentials or secrets.
* Provide a secure process for creating the first administrator.
* Do not include default production passwords in the codebase.

If multiple administrators are supported, implement roles such as Super Admin and Records Administrator. Only the Super Admin should be able to manage administrator accounts and privileged system settings.

7. ADMIN DASHBOARD

Build a polished, responsive dashboard accessible only to authenticated administrators.

Dashboard overview

Display:

* Total registered members.
* Pending registrations.
* Approved members.
* Rejected or inactive members.
* Registrations received today.
* Registrations by state.

All figures must be calculated from real database records, not hardcoded sample values.

Membership management

Provide a paginated table with:

* Membership number.
* Full name.
* VIN displayed in a masked format by default.
* Phone number with appropriate masking where suitable.
* State.
* LGA.
* Ward.
* Polling unit.
* Registration date.
* Membership status.
* Actions.

Available actions:

* View member details.
* Edit incorrect information with an audit trail.
* Approve or reject registrations.
* Mark records inactive where appropriate.
* Search records.
* Filter by state, LGA, ward, polling unit, status, and registration date.
* Sort by relevant columns.
* Export filtered results to CSV or Excel.

Require explicit authorization for revealing a complete VIN or exporting sensitive records. Record these actions in the audit log. Do not place VINs in URLs, analytics, or browser logs.

Include a confirmation dialog for destructive or consequential actions.

Search

Allow administrators to search by:

* Name.
* Membership number.
* VIN, using a secure lookup approach.
* Phone number.
* State and LGA.

Ensure search works on the backend and does not require downloading the entire database into the browser.

Reports

Provide:

* Membership totals by state.
* Membership totals by LGA.
* Registration trends over time.
* Membership status summaries.
* CSV/Excel export of authorized, filtered records.

All reports must use actual database queries.

8. TECHNICAL STACK

Prefer the following stack, unless the existing project already uses a suitable alternative:

* Backend: Laravel with PHP.
* Database: MySQL.
* Frontend: Laravel Blade with Tailwind CSS and Alpine.js, or another maintainable frontend approach compatible with Laravel.
* Authentication: Laravel’s established authentication tooling.
* Charts: A lightweight charting library if required.
* Excel exports: A maintained Laravel-compatible export package if needed.

Build a clean, maintainable Laravel application with:

* MVC architecture.
* Reusable components.
* Form request validation.
* Service classes where appropriate.
* Database migrations and seeders.
* Policies and middleware.
* Eloquent relationships.
* Pagination.
* Proper error handling.
* Environment-based configuration.

If an existing repository or project directory is available, inspect it first and preserve working functionality. Do not overwrite existing files unnecessarily.

If no project exists, initialize the application and install the required dependencies.

9. DATA PRIVACY AND RESPONSIBLE HANDLING

VIN and polling-unit details are sensitive personal and electoral information. Implement data minimization and strong safeguards.

* Collect this information only for a clearly stated, legitimate membership-management purpose.
* Explain whether VIN is genuinely necessary before collecting it.
* Obtain informed consent and provide a privacy notice.
* Restrict access to authorized personnel.
* Never publish membership lists or individual voter details.
* Do not use the information to infer political affiliation, target voters, or generate political persuasion profiles.
* Provide a configurable data-retention policy.
* Implement secure backups and an appropriate recovery procedure.
* Keep production secrets out of source control.
* Apply relevant Nigerian data-protection requirements, including the Nigeria Data Protection Act, where applicable.
* Ensure that exports are private, access-controlled, and auditable.

Do not integrate with INEC systems or claim to verify a VIN against official electoral records unless a legitimate, authorized, documented integration is explicitly provided.

10. CONTENT MANAGEMENT

Where practical, allow authorized administrators to update:

* About Us content.
* Vision and mission.
* Core values and objectives.
* Coverage information.
* Contact details.
* Social media links.
* Announcements and program highlights.

Do not make the website dependent on an administrator editing source code for ordinary content changes.

11. TESTING AND QUALITY ASSURANCE

Write and run tests for:

* Successful member registration.
* Missing or invalid fields.
* Duplicate VIN handling.
* Phone-number validation.
* State and LGA validation.
* Authentication and logout.
* Unauthorized dashboard access.
* Role-based permissions.
* Membership search and filtering.
* Membership status changes.
* Data export authorization.
* Sensitive-data masking.
* Database constraints and encryption/decryption behavior, where implemented.

Test on desktop and mobile screen sizes.

Fix runtime errors, broken routes, validation failures, console errors, and migration problems before declaring the project complete.

12. DEPLOYMENT AND DOCUMENTATION

Provide:

* A complete working codebase.
* A .env.example file without real secrets.
* Database migrations.
* Seeders for non-sensitive reference data.
* Instructions for creating the first administrator securely.
* Local installation instructions.
* Database setup instructions.
* Production deployment instructions.
* Storage and backup guidance.
* A README explaining the architecture, routes, features, and maintenance.
* A list of environment variables and required dependencies.

Never claim deployment or testing succeeded unless it actually did.

13. IMPLEMENTATION WORKFLOW

Work in these phases:

Phase 1: Inspect the project environment and establish the application architecture.

Phase 2: Build the public website and responsive navigation.

Phase 3: Implement the membership registration form, database schema, and backend validation.

Phase 4: Implement authentication, role-based authorization, and the admin dashboard.

Phase 5: Build membership search, filtering, status management, reporting, and exports.

Phase 6: Implement privacy safeguards, audit logging, and automated tests.

Phase 7: Test the complete workflow, fix bugs, and document setup and deployment.

At the end of each phase, verify that the implemented functionality works before proceeding.

FINAL ACCEPTANCE CRITERIA

The project is complete only when:

1. The public website renders correctly on desktop and mobile.
2. A visitor can register as a member.
3. A successful submission creates a persistent database record.
4. Duplicate registrations are handled safely.
5. An administrator can log in securely.
6. The dashboard displays real membership statistics.
7. Administrators can search, filter, view, and manage records according to their permissions.
8. Authorized users can export records securely.
9. Sensitive information is protected and never exposed publicly.
10. Database migrations and tests run successfully.
11. The project can be installed and deployed using the supplied documentation.

Begin by inspecting the available project files and environment. Then implement the application end to end. Do not stop after generating a plan, wireframe, mockup, or static frontend.