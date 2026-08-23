-- OpenTopoData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "OpenTopoData",
      slug = "open-topo-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.opentopodata.org/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_elevation"] = {},
      },
    },
    entity = {
      ["get_elevation"] = {
        ["fields"] = {
          {
            ["name"] = "dataset",
            ["req"] = true,
            ["short"] = "The dataset used for this elevation query",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "elevation",
            ["req"] = true,
            ["short"] = "The elevation in meters at the specified location",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "location",
            ["req"] = true,
            ["short"] = "The location coordinates",
            ["type"] = "`$OBJECT`",
          },
        },
        ["name"] = "get_elevation",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "test-dataset",
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "dataset",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "interpolation",
                      ["orig"] = "interpolation",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "56.35,123.90",
                      ["kind"] = "query",
                      ["name"] = "location",
                      ["orig"] = "location",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{dataset}",
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["dataset"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "interpolation",
                    "location",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
