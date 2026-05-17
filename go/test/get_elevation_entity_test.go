package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/open-topo-data-sdk/go"
	"github.com/voxgig-sdk/open-topo-data-sdk/go/core"

	vs "github.com/voxgig-sdk/open-topo-data-sdk/go/utility/struct"
)

func TestGetElevationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GetElevation(nil)
		if ent == nil {
			t.Fatal("expected non-nil GetElevationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := get_elevationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "get_elevation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set OPENTOPODATA_TEST_GET_ELEVATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		getElevationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.get_elevation", setup.data)))
		var getElevationRef01Data map[string]any
		if len(getElevationRef01DataRaw) > 0 {
			getElevationRef01Data = core.ToMapAny(getElevationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = getElevationRef01Data

		// LIST
		getElevationRef01Ent := client.GetElevation(nil)
		getElevationRef01Match := map[string]any{
			"dataset": setup.idmap["dataset01"],
		}

		getElevationRef01ListResult, err := getElevationRef01Ent.List(getElevationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, getElevationRef01ListOk := getElevationRef01ListResult.([]any)
		if !getElevationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", getElevationRef01ListResult)
		}

	})
}

func get_elevationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "get_elevation", "GetElevationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read get_elevation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse get_elevation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"get_elevation01", "get_elevation02", "get_elevation03", "dataset01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("OPENTOPODATA_TEST_GET_ELEVATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"OPENTOPODATA_TEST_GET_ELEVATION_ENTID": idmap,
		"OPENTOPODATA_TEST_LIVE":      "FALSE",
		"OPENTOPODATA_TEST_EXPLAIN":   "FALSE",
		"OPENTOPODATA_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["OPENTOPODATA_TEST_GET_ELEVATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["OPENTOPODATA_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["OPENTOPODATA_APIKEY"],
			},
			extra,
		})
		client = sdk.NewOpenTopoDataSDK(core.ToMapAny(mergedOpts))
	}

	live := env["OPENTOPODATA_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["OPENTOPODATA_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
