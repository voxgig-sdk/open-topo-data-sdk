-- OpenTopoData SDK error

local OpenTopoDataError = {}
OpenTopoDataError.__index = OpenTopoDataError


function OpenTopoDataError.new(code, msg, ctx)
  local self = setmetatable({}, OpenTopoDataError)
  self.is_sdk_error = true
  self.sdk = "OpenTopoData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenTopoDataError:error()
  return self.msg
end


function OpenTopoDataError:__tostring()
  return self.msg
end


return OpenTopoDataError
