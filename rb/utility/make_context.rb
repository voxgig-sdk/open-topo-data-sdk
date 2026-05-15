# OpenTopoData SDK utility: make_context
require_relative '../core/context'
module OpenTopoDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenTopoDataContext.new(ctxmap, basectx)
  }
end
