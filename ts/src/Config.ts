
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.opentopodata.org/v1',

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
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "elevation",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "location",
          "req": true,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        }
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
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "interpolation",
                    "orig": "interpolation",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "56.35,123.90",
                    "kind": "query",
                    "name": "location",
                    "orig": "location",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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

