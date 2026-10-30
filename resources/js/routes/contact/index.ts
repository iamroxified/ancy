import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\PublicPageController::submit
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicPageController::submit
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::submit
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicPageController::submit
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicPageController::submit
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(options),
    method: 'post',
})

submit.form = submitForm

const contact = {
    submit: Object.assign(submit, submit),
}

export default contact