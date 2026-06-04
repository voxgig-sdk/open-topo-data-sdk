# OpenTopoData SDK

Look up ground elevation at any latitude/longitude from a choice of open global and regional DEMs

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Open Topo Data

[Open Topo Data](https://www.opentopodata.org/) is a small REST API server that returns ground elevation for a given latitude and longitude. The hosted instance at `api.opentopodata.org` is run by the project's maintainer (ajnisbet) and is free for light public use; the same server software can be self-hosted against your own choice of datasets.

What you get from the API:

- A single endpoint shape, `GET /v1/{dataset}?locations={lat},{lng}|{lat},{lng}|...`, returning JSON elevations in metres.
- A choice of global and regional digital elevation models, including SRTM (30 m and 90 m), ASTER (~30 m global), NED (~10 m USA), Mapzen (~30 m global with bathymetry), EU-DEM (25 m Europe), ETOPO1 and GEBCO2020 (global with bathymetry), NZ DEM (8 m New Zealand), plus BKG, Swisstopo and EMODnet.
- Optional Google encoded polyline input and a configurable interpolation method (nearest, bilinear, cubic).

Operational notes: the public API has documented fair-use limits of up to 100 locations per request, 1 call per second, and 1000 calls per day. No API key or authentication is required. CORS is not enabled on the public host, so browser-side calls need a proxy or the self-hosted/paid alternative.

## Try it

**TypeScript**
```bash
npm install open-topo-data
```

**Python**
```bash
pip install open-topo-data-sdk
```

**PHP**
```bash
composer require voxgig/open-topo-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/open-topo-data-sdk/go
```

**Ruby**
```bash
gem install open-topo-data-sdk
```

**Lua**
```bash
luarocks install open-topo-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenTopoDataSDK } from 'open-topo-data'

const client = new OpenTopoDataSDK({})

// List all getelevations
const getelevations = await client.GetElevation().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o open-topo-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "open-topo-data": {
      "command": "/abs/path/to/open-topo-data-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **GetElevation** | Elevation lookups for one or more lat/lng points against a named DEM, served from `GET /v1/{dataset}?locations={lat},{lng}|...`. | `/{dataset}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from opentopodata_sdk import OpenTopoDataSDK

client = OpenTopoDataSDK({})

# List all getelevations
getelevations, err = client.GetElevation(None).list(None, None)
```

### PHP

```php
<?php
require_once 'opentopodata_sdk.php';

$client = new OpenTopoDataSDK([]);

// List all getelevations
[$getelevations, $err] = $client->GetElevation(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/open-topo-data-sdk/go"

client := sdk.NewOpenTopoDataSDK(map[string]any{})

// List all getelevations
getelevations, err := client.GetElevation(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "OpenTopoData_sdk"

client = OpenTopoDataSDK.new({})

# List all getelevations
getelevations, err = client.GetElevation(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("open-topo-data_sdk")

local client = sdk.new({})

-- List all getelevations
local getelevations, err = client:GetElevation(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenTopoDataSDK.test()
const result = await client.GetElevation().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenTopoDataSDK.test(None, None)
result, err = client.GetElevation(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenTopoDataSDK::test(null, null);
[$result, $err] = $client->GetElevation(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetElevation(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenTopoDataSDK.test(nil, nil)
result, err = client.GetElevation(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetElevation(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Open Topo Data

- Upstream: [https://www.opentopodata.org/](https://www.opentopodata.org/)

- Open Topo Data is open source (maintained by ajnisbet on GitHub) and can be self-hosted.
- The hosted public API at `api.opentopodata.org` is free to use within published fair-use limits.
- Each elevation dataset (SRTM, ASTER, NED, EU-DEM, GEBCO, etc.) has its own licence and may require attribution when results are redistributed.
- For commercial use, higher limits, or CORS-enabled access, the maintainer points to the paid GPXZ service.

---

Generated from the Open Topo Data OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
