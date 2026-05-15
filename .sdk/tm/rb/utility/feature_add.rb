# OpenTopoData SDK utility: feature_add
module OpenTopoDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
