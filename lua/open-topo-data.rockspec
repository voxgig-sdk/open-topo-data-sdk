package = "voxgig-sdk-open-topo-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/open-topo-data-sdk.git"
}
description = {
  summary = "OpenTopoData SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["open-topo-data_sdk"] = "open-topo-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
