import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminMemberController::show
* @see app/Http/Controllers/AdminMemberController.php:19
* @route '/admin/members/{member}'
*/
export const show = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/members/{member}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminMemberController::show
* @see app/Http/Controllers/AdminMemberController.php:19
* @route '/admin/members/{member}'
*/
show.url = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { member: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { member: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            member: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        member: typeof args.member === 'object'
        ? args.member.id
        : args.member,
    }

    return show.definition.url
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminMemberController::show
* @see app/Http/Controllers/AdminMemberController.php:19
* @route '/admin/members/{member}'
*/
show.get = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminMemberController::show
* @see app/Http/Controllers/AdminMemberController.php:19
* @route '/admin/members/{member}'
*/
show.head = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminMemberController::show
* @see app/Http/Controllers/AdminMemberController.php:19
* @route '/admin/members/{member}'
*/
const showForm = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminMemberController::show
* @see app/Http/Controllers/AdminMemberController.php:19
* @route '/admin/members/{member}'
*/
showForm.get = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AdminMemberController::show
* @see app/Http/Controllers/AdminMemberController.php:19
* @route '/admin/members/{member}'
*/
showForm.head = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\AdminMemberImportController::importMethod
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/admin/members/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminMemberImportController::importMethod
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminMemberImportController::importMethod
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminMemberImportController::importMethod
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importMethod.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminMemberImportController::importMethod
* @see app/Http/Controllers/AdminMemberImportController.php:17
* @route '/admin/members/import'
*/
importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: importMethod.url(options),
    method: 'post',
})

importMethod.form = importMethodForm

/**
* @see \App\Http\Controllers\AdminMemberController::update
* @see app/Http/Controllers/AdminMemberController.php:54
* @route '/admin/members/{member}'
*/
export const update = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/members/{member}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\AdminMemberController::update
* @see app/Http/Controllers/AdminMemberController.php:54
* @route '/admin/members/{member}'
*/
update.url = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { member: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { member: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            member: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        member: typeof args.member === 'object'
        ? args.member.id
        : args.member,
    }

    return update.definition.url
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminMemberController::update
* @see app/Http/Controllers/AdminMemberController.php:54
* @route '/admin/members/{member}'
*/
update.patch = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\AdminMemberController::update
* @see app/Http/Controllers/AdminMemberController.php:54
* @route '/admin/members/{member}'
*/
const updateForm = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminMemberController::update
* @see app/Http/Controllers/AdminMemberController.php:54
* @route '/admin/members/{member}'
*/
updateForm.patch = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\AdminMemberController::updateStatus
* @see app/Http/Controllers/AdminMemberController.php:126
* @route '/admin/members/{member}/status'
*/
export const updateStatus = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

updateStatus.definition = {
    methods: ["post"],
    url: '/admin/members/{member}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminMemberController::updateStatus
* @see app/Http/Controllers/AdminMemberController.php:126
* @route '/admin/members/{member}/status'
*/
updateStatus.url = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { member: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { member: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            member: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        member: typeof args.member === 'object'
        ? args.member.id
        : args.member,
    }

    return updateStatus.definition.url
            .replace('{member}', parsedArgs.member.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminMemberController::updateStatus
* @see app/Http/Controllers/AdminMemberController.php:126
* @route '/admin/members/{member}/status'
*/
updateStatus.post = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStatus.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminMemberController::updateStatus
* @see app/Http/Controllers/AdminMemberController.php:126
* @route '/admin/members/{member}/status'
*/
const updateStatusForm = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AdminMemberController::updateStatus
* @see app/Http/Controllers/AdminMemberController.php:126
* @route '/admin/members/{member}/status'
*/
updateStatusForm.post = (args: { member: number | { id: number } } | [member: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateStatus.url(args, options),
    method: 'post',
})

updateStatus.form = updateStatusForm

const members = {
    show: Object.assign(show, show),
    import: Object.assign(importMethod, importMethod),
    update: Object.assign(update, update),
    updateStatus: Object.assign(updateStatus, updateStatus),
}

export default members