import PublicPageController from './PublicPageController'
import MemberRegistrationController from './MemberRegistrationController'
import AdminAuthController from './AdminAuthController'
import AdminDashboardController from './AdminDashboardController'
import AdminMemberController from './AdminMemberController'
import Settings from './Settings'

const Controllers = {
    PublicPageController: Object.assign(PublicPageController, PublicPageController),
    MemberRegistrationController: Object.assign(MemberRegistrationController, MemberRegistrationController),
    AdminAuthController: Object.assign(AdminAuthController, AdminAuthController),
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
    AdminMemberController: Object.assign(AdminMemberController, AdminMemberController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers