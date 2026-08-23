
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'OpenTopoData',
        slug: "open-topo-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.opentopodata.org/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_elevation: {
      },

    }
  }


  entity = {
    "get_elevation": {
      "fields": [
        {
          "name": "dataset",
          "req": true,
          "short": "The dataset used for this elevation query",
          "type": "`$STRING`"
        },
        {
          "name": "elevation",
          "req": true,
          "short": "The elevation in meters at the specified location",
          "type": "`$NUMBER`"
        },
        {
          "name": "location",
          "req": true,
          "short": "The location coordinates",
          "type": "`$OBJECT`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "interpolation",
                    "orig": "interpolation",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "56.35,123.90",
                    "kind": "query",
                    "name": "location",
                    "orig": "location",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/{dataset}",
              "parts": [
                "{id}"
              ],
              "rename": {
                "param": {
                  "dataset": "id"
                }
              },
              "select": {
                "exist": [
                  "id",
                  "interpolation",
                  "location"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

