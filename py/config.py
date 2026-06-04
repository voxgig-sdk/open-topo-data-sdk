# OpenTopoData SDK configuration


def make_config():
    return {
        "main": {
            "name": "OpenTopoData",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.opentopodata.org/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_elevation": {},
            },
        },
        "entity": {
      "get_elevation": {
        "fields": [
          {
            "name": "dataset",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "elevation",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "location",
            "req": True,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "get_elevation",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "test-dataset",
                      "kind": "param",
                      "name": "id",
                      "orig": "dataset",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "interpolation",
                      "orig": "interpolation",
                      "reqd": False,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "56.35,123.90",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/{dataset}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "dataset": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                    "interpolation",
                    "location",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
