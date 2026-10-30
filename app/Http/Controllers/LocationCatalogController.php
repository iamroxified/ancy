<?php

namespace App\Http\Controllers;

use App\Models\LocalGovernment;
use App\Models\LocationState;
use App\Models\LocationWard;
use Illuminate\Http\JsonResponse;

class LocationCatalogController extends Controller
{
    public function localGovernments(LocationState $state): JsonResponse
    {
        return response()->json(
            $state->localGovernments()->orderBy('name')->get(['id', 'name'])
        );
    }

    public function wards(LocalGovernment $localGovernment): JsonResponse
    {
        return response()->json(
            $localGovernment->wards()->orderBy('name')->get(['id', 'name'])
        );
    }

    public function pollingUnits(LocationWard $locationWard): JsonResponse
    {
        return response()->json(
            $locationWard->pollingUnits()->orderBy('name')->get(['id', 'name'])
        );
    }
}
