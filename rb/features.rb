# OpenTopoData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenTopoDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenTopoDataBaseFeature.new
    when "ratelimit"
      OpenTopoDataRatelimitFeature.new
    when "retry"
      OpenTopoDataRetryFeature.new
    when "test"
      OpenTopoDataTestFeature.new
    when "timeout"
      OpenTopoDataTimeoutFeature.new
    else
      OpenTopoDataBaseFeature.new
    end
  end
end
