import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MemberRegistrationController::register
* @see app/Http/Controllers/MemberRegistrationController.php:21
* @route '/register/member'
*/
export const register = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

register.definition = {
    methods: ["post"],
    url: '/register/member',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MemberRegistrationController::register
* @see app/Http/Controllers/MemberRegistrationController.php:21
* @route '/register/member'
*/
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MemberRegistrationController::register
* @see app/Http/Controllers/MemberRegistrationController.php:21
* @route '/register/member'
*/
register.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::register
* @see app/Http/Controllers/MemberRegistrationController.php:21
* @route '/register/member'
*/
const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\MemberRegistrationController::register
* @see app/Http/Controllers/MemberRegistrationController.php:21
* @route '/register/member'
*/
registerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: register.url(options),
    method: 'post',
})

register.form = registerForm

const member = {
    register: Object.assign(register, register),
}

export default member