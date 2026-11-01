import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminMemberImportController::store
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/members/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminMemberImportController::store
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminMemberImportController::store
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminMemberImportController::store
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminMemberImportController::store
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const AdminMemberImportController = { store }

export default AdminMemberImportController