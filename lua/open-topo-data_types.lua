-- Typed models for the OpenTopoData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class GetElevation
---@field dataset string
---@field elevation number
---@field id? string
---@field location table

---@class GetElevationListMatch
---@field id string
---@field interpolation? string
---@field location string

local M = {}

return M
