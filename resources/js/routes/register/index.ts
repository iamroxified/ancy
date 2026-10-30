import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:86
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
* @see app/Http/Controllers/MemberRegistrationController.php:86
* @route '/register/confirmation'
*/
confirmation.url = (options?: RouteQueryOptions) => {
    return confirmation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:86
* @route '/register/confirmation'
*/
confirmation.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:86
* @route '/register/confirmation'
*/
confirmation.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:86
* @route '/register/confirmation'
*/
const confirmationForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:86
* @route '/register/confirmation'
*/
confirmationForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: confirmation.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::confirmation
* @see app/Http/Controllers/MemberRegistrationController.php:86
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

const register = {
    confirmation: Object.assign(confirmation, confirmation),
}

export default register