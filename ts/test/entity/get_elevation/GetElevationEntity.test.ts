

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenTopoDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetElevationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPEN_TOPO_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPEN_TOPO_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenTopoDataSDK.test()
    const ent = testsdk.GetElevation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPEN_TOPO_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_elevation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"dataset","req":true,"short":"The dataset used for this elevation query","type":"`$STRING`","index$":0},{"active":true,"format":"float","name":"elevation","req":true,"short":"The elevation in meters at the specified location","type":"`$NUMBER`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"location","req":true,"short":"The location coordinates","type":"`$OBJECT`","index$":3}],"id":{"field":"id","name":"id"},"name":"get_elevation","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"example":"test-dataset","kind":"param","name":"id","orig":"dataset","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"interpolation","orig":"interpolation","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"56.35,123.90","kind":"query","name":"location","orig":"location","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /{dataset}","json":"{\"operationId\":\"getElevation\",\"parameters\":[{\"description\":\"The name of the elevation dataset to query. Available datasets on the public API include: test-dataset, nzdem8m, ned10m, eudem25m, mapzen, aster30m, srtm30m, srtm90m, bkg200m, etopo1, gebco2020, emod2018\",\"in\":\"path\",\"name\":\"dataset\",\"required\":true,\"schema\":{\"enum\":[\"test-dataset\",\"nzdem8m\",\"ned10m\",\"eudem25m\",\"mapzen\",\"aster30m\",\"srtm30m\",\"srtm90m\",\"bkg200m\",\"etopo1\",\"gebco2020\",\"emod2018\"],\"example\":\"test-dataset\",\"type\":\"string\"}},{\"description\":\"The locations to query, provided as latitude,longitude pairs. Multiple locations can be separated by pipe characters (|). Maximum 100 locations per request on the public API. Example: 56.35,123.90 or 39.7471,-104.9963|40.7128,-74.0060\",\"in\":\"query\",\"name\":\"locations\",\"required\":true,\"schema\":{\"example\":\"56.35,123.90\",\"type\":\"string\"}},{\"description\":\"The interpolation algorithm to use for calculating elevation. Options may include bilinear, cubic, or nearest neighbor depending on server configuration.\",\"in\":\"query\",\"name\":\"interpolation\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"multipleLocations\":{\"summary\":\"Multiple locations query\",\"value\":{\"results\":[{\"dataset\":\"ned10m\",\"elevation\":1590,\"location\":{\"lat\":39.7471,\"lng\":-104.9963}},{\"dataset\":\"srtm30m\",\"elevation\":1604,\"location\":{\"lat\":39.7471,\"lng\":-104.9963}}],\"status\":\"OK\"}},\"singleLocation\":{\"summary\":\"Single location query\",\"value\":{\"results\":[{\"dataset\":\"test-dataset\",\"elevation\":815,\"location\":{\"lat\":56,\"lng\":123}}],\"status\":\"OK\"}}},\"schema\":{\"properties\":{\"results\":{\"description\":\"Array of elevation results for each queried location\",\"items\":{\"properties\":{\"dataset\":{\"description\":\"The dataset used for this elevation query\",\"example\":\"test-dataset\",\"type\":\"string\"},\"elevation\":{\"description\":\"The elevation in meters at the specified location\",\"example\":815,\"format\":\"float\",\"type\":\"number\"},\"location\":{\"description\":\"The location coordinates\",\"properties\":{\"lat\":{\"description\":\"Latitude coordinate\",\"example\":56,\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"description\":\"Longitude coordinate\",\"example\":123,\"format\":\"double\",\"type\":\"number\"}},\"required\":[\"lat\",\"lng\"],\"type\":\"object\"}},\"required\":[\"elevation\",\"location\",\"dataset\"],\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"description\":\"Status of the API request\",\"example\":\"OK\",\"type\":\"string\"}},\"required\":[\"results\",\"status\"],\"type\":\"object\"}}},\"description\":\"Successful response with elevation data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Maximum 100 locations per request\",\"type\":\"string\"},\"status\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters or too many locations\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Dataset not found or location not in dataset bounds\",\"type\":\"string\"},\"status\":{\"example\":\"NOT_FOUND\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Dataset not found or location not in dataset bounds\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Rate limit error message\",\"example\":\"Max 1 call per second or max 1000 calls per day exceeded\",\"type\":\"string\"},\"status\":{\"example\":\"RATE_LIMIT_EXCEEDED\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"An internal server error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"SERVER_ERROR\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{dataset}","rename":{"param":{"dataset":"id"}},"segments":[{"var":"id"}],"select":{"exist":["id","interpolation","location"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_elevation","name__orig":"get_elevation","Name":"GetElevation","name_":"get_elevation","name-":"get-elevation","NAME":"GET_ELEVATION","index$":0}, {"active":true,"entity":"get_elevation","key$":"BasicGetElevationFlow","kind":"basic","name":"BasicGetElevationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{"dataset":"dataset01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"get_elevation_ref01"}}],"index$":0}]}, 'GetElevation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_elevation_ref01_data = Object.values(setup.data.existing.get_elevation)[0] as any

    // LIST
    const get_elevation_ref01_ent = client.GetElevation()
    const get_elevation_ref01_match: any = {}
    get_elevation_ref01_match['dataset'] = setup.idmap['dataset01']

    const get_elevation_ref01_list = (await get_elevation_ref01_ent.list(get_elevation_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_elevation/GetElevationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenTopoDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_elevation01','get_elevation02','get_elevation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPEN_TOPO_DATA_TEST_GET_ELEVATION_ENTID': idmap,
    'OPEN_TOPO_DATA_TEST_LIVE': 'FALSE',
    'OPEN_TOPO_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['OPEN_TOPO_DATA_TEST_GET_ELEVATION_ENTID']

  const live = 'TRUE' === env.OPEN_TOPO_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPEN_TOPO_DATA_TEST_GET_ELEVATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenTopoDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.OPEN_TOPO_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
