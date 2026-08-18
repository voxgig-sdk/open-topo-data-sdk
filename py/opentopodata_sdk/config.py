# OpenTopoData SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
          },
          {
            "name": "elevation",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "location",
            "req": True,
            "type": "`$OBJECT`",
          },
        ],
        "name": "get_elevation",
        "op": {
          "list": {
            "input": "data",
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
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "interpolation",
                      "orig": "interpolation",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "56.35,123.90",
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.results`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
