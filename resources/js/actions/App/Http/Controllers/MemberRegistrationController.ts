import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MemberRegistrationController::store
* @see app/Http/Controllers/MemberRegistrationController.php:24
* @route '/register/member'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/register/member',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MemberRegistrationController::store
* @see app/Http/Controllers/MemberRegistrationController.php:24
* @route '/register/member'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MemberRegistrationController::store
* @see app/Http/Controllers/MemberRegistrationController.php:24
* @route '/register/member'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::store
* @see app/Http/Controllers/MemberRegistrationController.php:24
* @route '/register/member'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::store
* @see app/Http/Controllers/MemberRegistrationController.php:24
* @route '/register/member'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:83
* @route '/register/confirmation'
*/
export const confirmation = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/register/confirmation',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:83
* @route '/register/confirmation'
*/
confirmation.url = (options?: RouteQueryOptions) => {
    return confirmation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:83
* @route '/register/confirmation'
*/
confirmation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:83
* @route '/register/confirmation'
*/
confirmation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:83
* @route '/register/confirmation'
*/
const confirmationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:83
* @route '/register/confirmation'
*/
confirmationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:83
* @route '/register/confirmation'
*/
confirmationForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

confirmation.form = confirmationForm

const MemberRegistrationController = { store, confirmation }

export default MemberRegistrationController