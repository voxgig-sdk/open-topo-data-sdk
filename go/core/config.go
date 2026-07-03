package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OpenTopoData",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.opentopodata.org/v1",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_elevation": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_elevation": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "dataset",
						"req": true,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "elevation",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "location",
						"req": true,
						"type": "`$OBJECT`",
						"index$": 2,
					},
				},
				"name": "get_elevation",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "test-dataset",
											"kind": "param",
											"name": "id",
											"orig": "dataset",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"active": true,
											"kind": "query",
											"name": "interpolation",
											"orig": "interpolation",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "56.35,123.90",
											"kind": "query",
											"name": "location",
											"orig": "location",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/{dataset}",
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"dataset": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"interpolation",
										"location",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
