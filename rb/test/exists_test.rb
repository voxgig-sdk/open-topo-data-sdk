# OpenTopoData SDK exists test

require "minitest/autorun"
require_relative "../OpenTopoData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenTopoDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
