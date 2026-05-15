package voxgigopentopodatasdk

import (
	"github.com/voxgig-sdk/open-topo-data-sdk/core"
	"github.com/voxgig-sdk/open-topo-data-sdk/entity"
	"github.com/voxgig-sdk/open-topo-data-sdk/feature"
	_ "github.com/voxgig-sdk/open-topo-data-sdk/utility"
)

// Type aliases preserve external API.
type OpenTopoDataSDK = core.OpenTopoDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OpenTopoDataEntity = core.OpenTopoDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OpenTopoDataError = core.OpenTopoDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewGetElevationEntityFunc = func(client *core.OpenTopoDataSDK, entopts map[string]any) core.OpenTopoDataEntity {
		return entity.NewGetElevationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenTopoDataSDK = core.NewOpenTopoDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
