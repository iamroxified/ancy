import PublicPageController from './PublicPageController'
import MemberRegistrationController from './MemberRegistrationController'
import LocationCatalogController from './LocationCatalogController'
import AdminAuthController from './AdminAuthController'
import AdminDashboardController from './AdminDashboardController'
import AdminMemberController from './AdminMemberController'
import AdminContactMessageController from './AdminContactMessageController'
import Settings from './Settings'

const Controllers = {
    PublicPageController: Object.assign(PublicPageController, PublicPageController),
    MemberRegistrationController: Object.assign(MemberRegistrationController, MemberRegistrationController),
    LocationCatalogController: Object.assign(LocationCatalogController, LocationCatalogController),
    AdminAuthController: Object.assign(AdminAuthController, AdminAuthController),
    AdminDashboardController: Object.assign(AdminDashboardController, AdminDashboardController),
    AdminMemberController: Object.assign(AdminMemberController, AdminMemberController),
    AdminContactMessageController: Object.assign(AdminContactMessageController, AdminContactMessageController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers