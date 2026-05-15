# OpenTopoData SDK utility: prepare_body
module OpenTopoDataUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
