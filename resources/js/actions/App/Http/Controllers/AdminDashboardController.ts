import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/admin'
*/
const index35f58437d9250c39f332f5e8e70440b7 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})

index35f58437d9250c39f332f5e8e70440b7.definition = {
    methods: ["get","head"],
    url: '/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/admin'
*/
index35f58437d9250c39f332f5e8e70440b7.url = (options?: RouteQueryOptions) => {
    return index35f58437d9250c39f332f5e8e70440b7.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/admin'
*/
index35f58437d9250c39f332f5e8e70440b7.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/admin'
*/
index35f58437d9250c39f332f5e8e70440b7.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/admin'
*/
const index35f58437d9250c39f332f5e8e70440b7Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/admin'
*/
index35f58437d9250c39f332f5e8e70440b7Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index35f58437d9250c39f332f5e8e70440b7.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/admin'
*/
index35f58437d9250c39f332f5e8e70440b7Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index35f58437d9250c39f332f5e8e70440b7.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index35f58437d9250c39f332f5e8e70440b7.form = index35f58437d9250c39f332f5e8e70440b7Form
/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/dashboard'
*/
const index42a740574ecbfbac32f8cc353fc32db9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

index42a740574ecbfbac32f8cc353fc32db9.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/dashboard'
*/
index42a740574ecbfbac32f8cc353fc32db9.url = (options?: RouteQueryOptions) => {
    return index42a740574ecbfbac32f8cc353fc32db9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/dashboard'
*/
index42a740574ecbfbac32f8cc353fc32db9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/dashboard'
*/
index42a740574ecbfbac32f8cc353fc32db9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/dashboard'
*/
const index42a740574ecbfbac32f8cc353fc32db9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/dashboard'
*/
index42a740574ecbfbac32f8cc353fc32db9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index42a740574ecbfbac32f8cc353fc32db9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::index
* @see app/Http/Controllers/AdminDashboardController.php:13
* @route '/dashboard'
*/
index42a740574ecbfbac32f8cc353fc32db9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index42a740574ecbfbac32f8cc353fc32db9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index42a740574ecbfbac32f8cc353fc32db9.form = index42a740574ecbfbac32f8cc353fc32db9Form

/**
* Multiple routes resolve to \App\Http\Controllers\AdminDashboardController::index, so this export is a
* dictionary keyed by URI rather than a callable, with the verbs prefixed where two routes share a URI.
* Call a specific route with `index['<key>'](...)`, or import the route by name from your
* generated `routes/` directory.
*/
export const index = {
    '/admin': index35f58437d9250c39f332f5e8e70440b7,
    '/dashboard': index42a740574ecbfbac32f8cc353fc32db9,
}

/**
* @see \App\Http\Controllers\AdminDashboardController::saveSettings
* @see app/Http/Controllers/AdminDashboardController.php:84
* @route '/admin/settings'
*/
export const saveSettings = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveSettings.url(options),
    method: 'post',
})

saveSettings.definition = {
    methods: ["post"],
    url: '/admin/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::saveSettings
* @see app/Http/Controllers/AdminDashboardController.php:84
* @route '/admin/settings'
*/
saveSettings.url = (options?: RouteQueryOptions) => {
    return saveSettings.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::saveSettings
* @see app/Http/Controllers/AdminDashboardController.php:84
* @route '/admin/settings'
*/
saveSettings.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: saveSettings.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::saveSettings
* @see app/Http/Controllers/AdminDashboardController.php:84
* @route '/admin/settings'
*/
const saveSettingsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: saveSettings.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::saveSettings
* @see app/Http/Controllers/AdminDashboardController.php:84
* @route '/admin/settings'
*/
saveSettingsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: saveSettings.url(options),
    method: 'post',
})

saveSettings.form = saveSettingsForm

/**
* @see \App\Http\Controllers\AdminDashboardController::exportMethod
* @see app/Http/Controllers/AdminDashboardController.php:105
* @route '/admin/export'
*/
export const exportMethod = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

exportMethod.definition = {
    methods: ["get","head"],
    url: '/admin/export',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminDashboardController::exportMethod
* @see app/Http/Controllers/AdminDashboardController.php:105
* @route '/admin/export'
*/
exportMethod.url = (options?: RouteQueryOptions) => {
    return exportMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminDashboardController::exportMethod
* @see app/Http/Controllers/AdminDashboardController.php:105
* @route '/admin/export'
*/
exportMethod.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::exportMethod
* @see app/Http/Controllers/AdminDashboardController.php:105
* @route '/admin/export'
*/
exportMethod.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportMethod.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::exportMethod
* @see app/Http/Controllers/AdminDashboardController.php:105
* @route '/admin/export'
*/
const exportMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::exportMethod
* @see app/Http/Controllers/AdminDashboardController.php:105
* @route '/admin/export'
*/
exportMethodForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminDashboardController::exportMethod
* @see app/Http/Controllers/AdminDashboardController.php:105
* @route '/admin/export'
*/
exportMethodForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportMethod.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportMethod.form = exportMethodForm

const AdminDashboardController = { index, saveSettings, exportMethod, export: exportMethod }

export default AdminDashboardController