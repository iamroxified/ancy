import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminContactMessageController::index
* @see app/Http/Controllers/AdminContactMessageController.php:12
* @route '/admin/messages'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/messages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminContactMessageController::index
* @see app/Http/Controllers/AdminContactMessageController.php:12
* @route '/admin/messages'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminContactMessageController::index
* @see app/Http/Controllers/AdminContactMessageController.php:12
* @route '/admin/messages'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::index
* @see app/Http/Controllers/AdminContactMessageController.php:12
* @route '/admin/messages'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::index
* @see app/Http/Controllers/AdminContactMessageController.php:12
* @route '/admin/messages'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::index
* @see app/Http/Controllers/AdminContactMessageController.php:12
* @route '/admin/messages'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::index
* @see app/Http/Controllers/AdminContactMessageController.php:12
* @route '/admin/messages'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\AdminContactMessageController::show
* @see app/Http/Controllers/AdminContactMessageController.php:22
* @route '/admin/messages/{contactMessage}'
*/
export const show = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/messages/{contactMessage}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminContactMessageController::show
* @see app/Http/Controllers/AdminContactMessageController.php:22
* @route '/admin/messages/{contactMessage}'
*/
show.url = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contactMessage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contactMessage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contactMessage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contactMessage: typeof args.contactMessage === 'object'
        ? args.contactMessage.id
        : args.contactMessage,
    }

    return show.definition.url
            .replace('{contactMessage}', parsedArgs.contactMessage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminContactMessageController::show
* @see app/Http/Controllers/AdminContactMessageController.php:22
* @route '/admin/messages/{contactMessage}'
*/
show.get = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::show
* @see app/Http/Controllers/AdminContactMessageController.php:22
* @route '/admin/messages/{contactMessage}'
*/
show.head = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::show
* @see app/Http/Controllers/AdminContactMessageController.php:22
* @route '/admin/messages/{contactMessage}'
*/
const showForm = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::show
* @see app/Http/Controllers/AdminContactMessageController.php:22
* @route '/admin/messages/{contactMessage}'
*/
showForm.get = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::show
* @see app/Http/Controllers/AdminContactMessageController.php:22
* @route '/admin/messages/{contactMessage}'
*/
showForm.head = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\AdminContactMessageController::status
* @see app/Http/Controllers/AdminContactMessageController.php:29
* @route '/admin/messages/{contactMessage}/status'
*/
export const status = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: '/admin/messages/{contactMessage}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminContactMessageController::status
* @see app/Http/Controllers/AdminContactMessageController.php:29
* @route '/admin/messages/{contactMessage}/status'
*/
status.url = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { contactMessage: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { contactMessage: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            contactMessage: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        contactMessage: typeof args.contactMessage === 'object'
        ? args.contactMessage.id
        : args.contactMessage,
    }

    return status.definition.url
            .replace('{contactMessage}', parsedArgs.contactMessage.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminContactMessageController::status
* @see app/Http/Controllers/AdminContactMessageController.php:29
* @route '/admin/messages/{contactMessage}/status'
*/
status.post = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::status
* @see app/Http/Controllers/AdminContactMessageController.php:29
* @route '/admin/messages/{contactMessage}/status'
*/
const statusForm = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminContactMessageController::status
* @see app/Http/Controllers/AdminContactMessageController.php:29
* @route '/admin/messages/{contactMessage}/status'
*/
statusForm.post = (args: { contactMessage: number | { id: number } } | [contactMessage: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: status.url(args, options),
    method: 'post',
})

status.form = statusForm

const messages = {
    index: Object.assign(index, index),
    show: Object.assign(show, show),
    status: Object.assign(status, status),
}

export default messages