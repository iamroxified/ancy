import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PublicPageController::home
* @see app/Http/Controllers/PublicPageController.php:13
* @route '/'
*/
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicPageController::home
* @see app/Http/Controllers/PublicPageController.php:13
* @route '/'
*/
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::home
* @see app/Http/Controllers/PublicPageController.php:13
* @route '/'
*/
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::home
* @see app/Http/Controllers/PublicPageController.php:13
* @route '/'
*/
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicPageController::home
* @see app/Http/Controllers/PublicPageController.php:13
* @route '/'
*/
const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::home
* @see app/Http/Controllers/PublicPageController.php:13
* @route '/'
*/
homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::home
* @see app/Http/Controllers/PublicPageController.php:13
* @route '/'
*/
homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: home.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

home.form = homeForm

/**
* @see \App\Http\Controllers\PublicPageController::about
* @see app/Http/Controllers/PublicPageController.php:35
* @route '/about'
*/
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicPageController::about
* @see app/Http/Controllers/PublicPageController.php:35
* @route '/about'
*/
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::about
* @see app/Http/Controllers/PublicPageController.php:35
* @route '/about'
*/
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::about
* @see app/Http/Controllers/PublicPageController.php:35
* @route '/about'
*/
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicPageController::about
* @see app/Http/Controllers/PublicPageController.php:35
* @route '/about'
*/
const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: about.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::about
* @see app/Http/Controllers/PublicPageController.php:35
* @route '/about'
*/
aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: about.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::about
* @see app/Http/Controllers/PublicPageController.php:35
* @route '/about'
*/
aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: about.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

about.form = aboutForm

/**
* @see \App\Http\Controllers\PublicPageController::coverage
* @see app/Http/Controllers/PublicPageController.php:49
* @route '/coverage'
*/
export const coverage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: coverage.url(options),
    method: 'get',
})

coverage.definition = {
    methods: ["get","head"],
    url: '/coverage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicPageController::coverage
* @see app/Http/Controllers/PublicPageController.php:49
* @route '/coverage'
*/
coverage.url = (options?: RouteQueryOptions) => {
    return coverage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::coverage
* @see app/Http/Controllers/PublicPageController.php:49
* @route '/coverage'
*/
coverage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: coverage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::coverage
* @see app/Http/Controllers/PublicPageController.php:49
* @route '/coverage'
*/
coverage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: coverage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicPageController::coverage
* @see app/Http/Controllers/PublicPageController.php:49
* @route '/coverage'
*/
const coverageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: coverage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::coverage
* @see app/Http/Controllers/PublicPageController.php:49
* @route '/coverage'
*/
coverageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: coverage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::coverage
* @see app/Http/Controllers/PublicPageController.php:49
* @route '/coverage'
*/
coverageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: coverage.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

coverage.form = coverageForm

/**
* @see \App\Http\Controllers\PublicPageController::registerPage
* @see app/Http/Controllers/PublicPageController.php:56
* @route '/register'
*/
export const registerPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: registerPage.url(options),
    method: 'get',
})

registerPage.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicPageController::registerPage
* @see app/Http/Controllers/PublicPageController.php:56
* @route '/register'
*/
registerPage.url = (options?: RouteQueryOptions) => {
    return registerPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::registerPage
* @see app/Http/Controllers/PublicPageController.php:56
* @route '/register'
*/
registerPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: registerPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::registerPage
* @see app/Http/Controllers/PublicPageController.php:56
* @route '/register'
*/
registerPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: registerPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicPageController::registerPage
* @see app/Http/Controllers/PublicPageController.php:56
* @route '/register'
*/
const registerPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: registerPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::registerPage
* @see app/Http/Controllers/PublicPageController.php:56
* @route '/register'
*/
registerPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: registerPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::registerPage
* @see app/Http/Controllers/PublicPageController.php:56
* @route '/register'
*/
registerPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: registerPage.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

registerPage.form = registerPageForm

/**
* @see \App\Http\Controllers\PublicPageController::contactPage
* @see app/Http/Controllers/PublicPageController.php:70
* @route '/contact'
*/
export const contactPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contactPage.url(options),
    method: 'get',
})

contactPage.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicPageController::contactPage
* @see app/Http/Controllers/PublicPageController.php:70
* @route '/contact'
*/
contactPage.url = (options?: RouteQueryOptions) => {
    return contactPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::contactPage
* @see app/Http/Controllers/PublicPageController.php:70
* @route '/contact'
*/
contactPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contactPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::contactPage
* @see app/Http/Controllers/PublicPageController.php:70
* @route '/contact'
*/
contactPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contactPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicPageController::contactPage
* @see app/Http/Controllers/PublicPageController.php:70
* @route '/contact'
*/
const contactPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contactPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::contactPage
* @see app/Http/Controllers/PublicPageController.php:70
* @route '/contact'
*/
contactPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contactPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::contactPage
* @see app/Http/Controllers/PublicPageController.php:70
* @route '/contact'
*/
contactPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: contactPage.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

contactPage.form = contactPageForm

/**
* @see \App\Http\Controllers\PublicPageController::submitContact
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
export const submitContact = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitContact.url(options),
    method: 'post',
})

submitContact.definition = {
    methods: ["post"],
    url: '/contact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PublicPageController::submitContact
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
submitContact.url = (options?: RouteQueryOptions) => {
    return submitContact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::submitContact
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
submitContact.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitContact.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicPageController::submitContact
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
const submitContactForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitContact.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PublicPageController::submitContact
* @see app/Http/Controllers/PublicPageController.php:85
* @route '/contact'
*/
submitContactForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitContact.url(options),
    method: 'post',
})

submitContact.form = submitContactForm

/**
* @see \App\Http\Controllers\PublicPageController::privacyPage
* @see app/Http/Controllers/PublicPageController.php:63
* @route '/privacy'
*/
export const privacyPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacyPage.url(options),
    method: 'get',
})

privacyPage.definition = {
    methods: ["get","head"],
    url: '/privacy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PublicPageController::privacyPage
* @see app/Http/Controllers/PublicPageController.php:63
* @route '/privacy'
*/
privacyPage.url = (options?: RouteQueryOptions) => {
    return privacyPage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PublicPageController::privacyPage
* @see app/Http/Controllers/PublicPageController.php:63
* @route '/privacy'
*/
privacyPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacyPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::privacyPage
* @see app/Http/Controllers/PublicPageController.php:63
* @route '/privacy'
*/
privacyPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacyPage.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PublicPageController::privacyPage
* @see app/Http/Controllers/PublicPageController.php:63
* @route '/privacy'
*/
const privacyPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacyPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::privacyPage
* @see app/Http/Controllers/PublicPageController.php:63
* @route '/privacy'
*/
privacyPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacyPage.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PublicPageController::privacyPage
* @see app/Http/Controllers/PublicPageController.php:63
* @route '/privacy'
*/
privacyPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: privacyPage.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

privacyPage.form = privacyPageForm

const PublicPageController = { home, about, coverage, registerPage, contactPage, submitContact, privacyPage }

export default PublicPageController