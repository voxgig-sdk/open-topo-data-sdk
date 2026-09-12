# OpenTopoData SDK configuration

module OpenTopoDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "OpenTopoData",
        "slug" => "open-topo-data",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://api.opentopodata.org/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_elevation" => {},
        },
      },
      "entity" => {
        "get_elevation" => {
          "fields" => [
            {
              "name" => "dataset",
              "req" => true,
              "short" => "The dataset used for this elevation query",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "elevation",
              "req" => true,
              "short" => "The elevation in meters at the specified location",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "location",
              "req" => true,
              "short" => "The location coordinates",
              "type" => "`$OBJECT`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "get_elevation",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "test-dataset",
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "dataset",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "interpolation",
                        "orig" => "interpolation",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "56.35,123.90",
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{dataset}",
                  "rename" => {
                    "param" => {
                      "dataset" => "id",
                    },
                  },
                  "segments" => [
                    {
                      "var" => "id",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "interpolation",
                      "location",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "parts" => [
                    "{id}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OpenTopoDataFeatures.make_feature(name)
  end
end
