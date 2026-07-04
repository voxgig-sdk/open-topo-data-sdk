// Typed models for the OpenTopoData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetElevation {
  dataset: string
  elevation: number
  location: Record<string, any>
}

export interface GetElevationListMatch {
  id: string
}

