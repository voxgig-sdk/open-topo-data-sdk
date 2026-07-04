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
            "active": True,
            "name": "dataset",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "elevation",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "location",
            "req": True,
            "type": "`$OBJECT`",
            "index$": 2,
          },
        ],
        "name": "get_elevation",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "test-dataset",
                      "kind": "param",
                      "name": "id",
                      "orig": "dataset",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "interpolation",
                      "orig": "interpolation",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "56.35,123.90",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "reqd": True,
                      "type": "`$STRING`",
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
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
