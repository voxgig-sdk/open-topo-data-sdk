package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetElevationEntityFunc func(client *OpenTopoDataSDK, entopts map[string]any) OpenTopoDataEntity

