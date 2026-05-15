# OpenTopoData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenTopoDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenTopoDataBaseFeature.new
    when "test"
      OpenTopoDataTestFeature.new
    else
      OpenTopoDataBaseFeature.new
    end
  end
end
