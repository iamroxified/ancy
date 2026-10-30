import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\LocationCatalogController::localGovernments
* @see app/Http/Controllers/LocationCatalogController.php:12
* @route '/locations/states/{state}/local-governments'
*/
export const localGovernments = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: localGovernments.url(args, options),
    method: 'get',
})

localGovernments.definition = {
    methods: ["get","head"],
    url: '/locations/states/{state}/local-governments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationCatalogController::localGovernments
* @see app/Http/Controllers/LocationCatalogController.php:12
* @route '/locations/states/{state}/local-governments'
*/
localGovernments.url = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { state: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { state: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            state: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        state: typeof args.state === 'object'
        ? args.state.id
        : args.state,
    }

    return localGovernments.definition.url
            .replace('{state}', parsedArgs.state.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationCatalogController::localGovernments
* @see app/Http/Controllers/LocationCatalogController.php:12
* @route '/locations/states/{state}/local-governments'
*/
localGovernments.get = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: localGovernments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::localGovernments
* @see app/Http/Controllers/LocationCatalogController.php:12
* @route '/locations/states/{state}/local-governments'
*/
localGovernments.head = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: localGovernments.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::localGovernments
* @see app/Http/Controllers/LocationCatalogController.php:12
* @route '/locations/states/{state}/local-governments'
*/
const localGovernmentsForm = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: localGovernments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::localGovernments
* @see app/Http/Controllers/LocationCatalogController.php:12
* @route '/locations/states/{state}/local-governments'
*/
localGovernmentsForm.get = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: localGovernments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::localGovernments
* @see app/Http/Controllers/LocationCatalogController.php:12
* @route '/locations/states/{state}/local-governments'
*/
localGovernmentsForm.head = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: localGovernments.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

localGovernments.form = localGovernmentsForm

/**
* @see \App\Http\Controllers\LocationCatalogController::wards
* @see app/Http/Controllers/LocationCatalogController.php:19
* @route '/locations/local-governments/{localGovernment}/wards'
*/
export const wards = (args: { localGovernment: number | { id: number } } | [localGovernment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wards.url(args, options),
    method: 'get',
})

wards.definition = {
    methods: ["get","head"],
    url: '/locations/local-governments/{localGovernment}/wards',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationCatalogController::wards
* @see app/Http/Controllers/LocationCatalogController.php:19
* @route '/locations/local-governments/{localGovernment}/wards'
*/
wards.url = (args: { localGovernment: number | { id: number } } | [localGovernment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { localGovernment: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { localGovernment: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            localGovernment: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        localGovernment: typeof args.localGovernment === 'object'
        ? args.localGovernment.id
        : args.localGovernment,
    }

    return wards.definition.url
            .replace('{localGovernment}', parsedArgs.localGovernment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationCatalogController::wards
* @see app/Http/Controllers/LocationCatalogController.php:19
* @route '/locations/local-governments/{localGovernment}/wards'
*/
wards.get = (args: { localGovernment: number | { id: number } } | [localGovernment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wards.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::wards
* @see app/Http/Controllers/LocationCatalogController.php:19
* @route '/locations/local-governments/{localGovernment}/wards'
*/
wards.head = (args: { localGovernment: number | { id: number } } | [localGovernment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: wards.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::wards
* @see app/Http/Controllers/LocationCatalogController.php:19
* @route '/locations/local-governments/{localGovernment}/wards'
*/
const wardsForm = (args: { localGovernment: number | { id: number } } | [localGovernment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: wards.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::wards
* @see app/Http/Controllers/LocationCatalogController.php:19
* @route '/locations/local-governments/{localGovernment}/wards'
*/
wardsForm.get = (args: { localGovernment: number | { id: number } } | [localGovernment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: wards.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::wards
* @see app/Http/Controllers/LocationCatalogController.php:19
* @route '/locations/local-governments/{localGovernment}/wards'
*/
wardsForm.head = (args: { localGovernment: number | { id: number } } | [localGovernment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: wards.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

wards.form = wardsForm

/**
* @see \App\Http\Controllers\LocationCatalogController::pollingUnits
* @see app/Http/Controllers/LocationCatalogController.php:26
* @route '/locations/wards/{locationWard}/polling-units'
*/
export const pollingUnits = (args: { locationWard: number | { id: number } } | [locationWard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pollingUnits.url(args, options),
    method: 'get',
})

pollingUnits.definition = {
    methods: ["get","head"],
    url: '/locations/wards/{locationWard}/polling-units',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LocationCatalogController::pollingUnits
* @see app/Http/Controllers/LocationCatalogController.php:26
* @route '/locations/wards/{locationWard}/polling-units'
*/
pollingUnits.url = (args: { locationWard: number | { id: number } } | [locationWard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locationWard: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { locationWard: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            locationWard: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        locationWard: typeof args.locationWard === 'object'
        ? args.locationWard.id
        : args.locationWard,
    }

    return pollingUnits.definition.url
            .replace('{locationWard}', parsedArgs.locationWard.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LocationCatalogController::pollingUnits
* @see app/Http/Controllers/LocationCatalogController.php:26
* @route '/locations/wards/{locationWard}/polling-units'
*/
pollingUnits.get = (args: { locationWard: number | { id: number } } | [locationWard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pollingUnits.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::pollingUnits
* @see app/Http/Controllers/LocationCatalogController.php:26
* @route '/locations/wards/{locationWard}/polling-units'
*/
pollingUnits.head = (args: { locationWard: number | { id: number } } | [locationWard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pollingUnits.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::pollingUnits
* @see app/Http/Controllers/LocationCatalogController.php:26
* @route '/locations/wards/{locationWard}/polling-units'
*/
const pollingUnitsForm = (args: { locationWard: number | { id: number } } | [locationWard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pollingUnits.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::pollingUnits
* @see app/Http/Controllers/LocationCatalogController.php:26
* @route '/locations/wards/{locationWard}/polling-units'
*/
pollingUnitsForm.get = (args: { locationWard: number | { id: number } } | [locationWard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pollingUnits.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LocationCatalogController::pollingUnits
* @see app/Http/Controllers/LocationCatalogController.php:26
* @route '/locations/wards/{locationWard}/polling-units'
*/
pollingUnitsForm.head = (args: { locationWard: number | { id: number } } | [locationWard: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: pollingUnits.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

pollingUnits.form = pollingUnitsForm

const locations = {
    localGovernments: Object.assign(localGovernments, localGovernments),
    wards: Object.assign(wards, wards),
    pollingUnits: Object.assign(pollingUnits, pollingUnits),
}

export default locations