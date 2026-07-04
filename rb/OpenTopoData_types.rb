# frozen_string_literal: true

# Typed models for the OpenTopoData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetElevation entity data model.
#
# @!attribute [rw] dataset
#   @return [String]
#
# @!attribute [rw] elevation
#   @return [Float]
#
# @!attribute [rw] location
#   @return [Hash]
GetElevation = Struct.new(
  :dataset,
  :elevation,
  :location,
  keyword_init: true
)

# Request payload for GetElevation#list.
#
# @!attribute [rw] id
#   @return [String]
GetElevationListMatch = Struct.new(
  :id,
  keyword_init: true
)

