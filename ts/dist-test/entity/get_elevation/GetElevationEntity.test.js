"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetElevationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPEN_TOPO_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPEN_TOPO_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenTopoDataSDK.test();
        const ent = testsdk.GetElevation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPEN_TOPO_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_elevation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "dataset", "req": true, "short": "The dataset used for this elevation query", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "float", "name": "elevation", "req": true, "short": "The elevation in meters at the specified location", "type": "`$NUMBER`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "location", "req": true, "short": "The location coordinates", "type": "`$OBJECT`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "get_elevation", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "test-dataset", "kind": "param", "name": "id", "orig": "dataset", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "interpolation", "orig": "interpolation", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "56.35,123.90", "kind": "query", "name": "location", "orig": "location", "reqd": true, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /{dataset}", "json": "{\"operationId\":\"getElevation\",\"parameters\":[{\"description\":\"The name of the elevation dataset to query. Available datasets on the public API include: test-dataset, nzdem8m, ned10m, eudem25m, mapzen, aster30m, srtm30m, srtm90m, bkg200m, etopo1, gebco2020, emod2018\",\"in\":\"path\",\"name\":\"dataset\",\"required\":true,\"schema\":{\"enum\":[\"test-dataset\",\"nzdem8m\",\"ned10m\",\"eudem25m\",\"mapzen\",\"aster30m\",\"srtm30m\",\"srtm90m\",\"bkg200m\",\"etopo1\",\"gebco2020\",\"emod2018\"],\"example\":\"test-dataset\",\"type\":\"string\"}},{\"description\":\"The locations to query, provided as latitude,longitude pairs. Multiple locations can be separated by pipe characters (|). Maximum 100 locations per request on the public API. Example: 56.35,123.90 or 39.7471,-104.9963|40.7128,-74.0060\",\"in\":\"query\",\"name\":\"locations\",\"required\":true,\"schema\":{\"example\":\"56.35,123.90\",\"type\":\"string\"}},{\"description\":\"The interpolation algorithm to use for calculating elevation. Options may include bilinear, cubic, or nearest neighbor depending on server configuration.\",\"in\":\"query\",\"name\":\"interpolation\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"multipleLocations\":{\"summary\":\"Multiple locations query\",\"value\":{\"results\":[{\"dataset\":\"ned10m\",\"elevation\":1590,\"location\":{\"lat\":39.7471,\"lng\":-104.9963}},{\"dataset\":\"srtm30m\",\"elevation\":1604,\"location\":{\"lat\":39.7471,\"lng\":-104.9963}}],\"status\":\"OK\"}},\"singleLocation\":{\"summary\":\"Single location query\",\"value\":{\"results\":[{\"dataset\":\"test-dataset\",\"elevation\":815,\"location\":{\"lat\":56,\"lng\":123}}],\"status\":\"OK\"}}},\"schema\":{\"properties\":{\"results\":{\"description\":\"Array of elevation results for each queried location\",\"items\":{\"properties\":{\"dataset\":{\"description\":\"The dataset used for this elevation query\",\"example\":\"test-dataset\",\"type\":\"string\"},\"elevation\":{\"description\":\"The elevation in meters at the specified location\",\"example\":815,\"format\":\"float\",\"type\":\"number\"},\"location\":{\"description\":\"The location coordinates\",\"properties\":{\"lat\":{\"description\":\"Latitude coordinate\",\"example\":56,\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"description\":\"Longitude coordinate\",\"example\":123,\"format\":\"double\",\"type\":\"number\"}},\"required\":[\"lat\",\"lng\"],\"type\":\"object\"}},\"required\":[\"elevation\",\"location\",\"dataset\"],\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"description\":\"Status of the API request\",\"example\":\"OK\",\"type\":\"string\"}},\"required\":[\"results\",\"status\"],\"type\":\"object\"}}},\"description\":\"Successful response with elevation data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message describing what went wrong\",\"example\":\"Maximum 100 locations per request\",\"type\":\"string\"},\"status\":{\"example\":\"INVALID_REQUEST\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters or too many locations\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Dataset not found or location not in dataset bounds\",\"type\":\"string\"},\"status\":{\"example\":\"NOT_FOUND\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Dataset not found or location not in dataset bounds\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Rate limit error message\",\"example\":\"Max 1 call per second or max 1000 calls per day exceeded\",\"type\":\"string\"},\"status\":{\"example\":\"RATE_LIMIT_EXCEEDED\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"An internal server error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"SERVER_ERROR\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{dataset}", "rename": { "param": { "dataset": "id" } }, "segments": [{ "var": "id" }], "select": { "exist": ["id", "interpolation", "location"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "get_elevation", "name__orig": "get_elevation", "Name": "GetElevation", "name_": "get_elevation", "name-": "get-elevation", "NAME": "GET_ELEVATION", "index$": 0 }, { "active": true, "entity": "get_elevation", "key$": "BasicGetElevationFlow", "kind": "basic", "name": "BasicGetElevationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": { "dataset": "dataset01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "get_elevation_ref01" } }], "index$": 0 }] }, 'GetElevation');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_elevation_ref01_data = Object.values(setup.data.existing.get_elevation)[0];
        // LIST
        const get_elevation_ref01_ent = client.GetElevation();
        const get_elevation_ref01_match = {};
        get_elevation_ref01_match['dataset'] = setup.idmap['dataset01'];
        const get_elevation_ref01_list = (await get_elevation_ref01_ent.list(get_elevation_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_elevation/GetElevationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenTopoDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_elevation01', 'get_elevation02', 'get_elevation03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPEN_TOPO_DATA_TEST_GET_ELEVATION_ENTID': idmap,
        'OPEN_TOPO_DATA_TEST_LIVE': 'FALSE',
        'OPEN_TOPO_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['OPEN_TOPO_DATA_TEST_GET_ELEVATION_ENTID'];
    const live = 'TRUE' === env.OPEN_TOPO_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPEN_TOPO_DATA_TEST_GET_ELEVATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenTopoDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=GetElevationEntity.test.js.map