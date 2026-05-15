# OpenTopoData SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpenTopoDataUtility.registrar = ->(u) {
  u.clean = OpenTopoDataUtilities::Clean
  u.done = OpenTopoDataUtilities::Done
  u.make_error = OpenTopoDataUtilities::MakeError
  u.feature_add = OpenTopoDataUtilities::FeatureAdd
  u.feature_hook = OpenTopoDataUtilities::FeatureHook
  u.feature_init = OpenTopoDataUtilities::FeatureInit
  u.fetcher = OpenTopoDataUtilities::Fetcher
  u.make_fetch_def = OpenTopoDataUtilities::MakeFetchDef
  u.make_context = OpenTopoDataUtilities::MakeContext
  u.make_options = OpenTopoDataUtilities::MakeOptions
  u.make_request = OpenTopoDataUtilities::MakeRequest
  u.make_response = OpenTopoDataUtilities::MakeResponse
  u.make_result = OpenTopoDataUtilities::MakeResult
  u.make_point = OpenTopoDataUtilities::MakePoint
  u.make_spec = OpenTopoDataUtilities::MakeSpec
  u.make_url = OpenTopoDataUtilities::MakeUrl
  u.param = OpenTopoDataUtilities::Param
  u.prepare_auth = OpenTopoDataUtilities::PrepareAuth
  u.prepare_body = OpenTopoDataUtilities::PrepareBody
  u.prepare_headers = OpenTopoDataUtilities::PrepareHeaders
  u.prepare_method = OpenTopoDataUtilities::PrepareMethod
  u.prepare_params = OpenTopoDataUtilities::PrepareParams
  u.prepare_path = OpenTopoDataUtilities::PreparePath
  u.prepare_query = OpenTopoDataUtilities::PrepareQuery
  u.result_basic = OpenTopoDataUtilities::ResultBasic
  u.result_body = OpenTopoDataUtilities::ResultBody
  u.result_headers = OpenTopoDataUtilities::ResultHeaders
  u.transform_request = OpenTopoDataUtilities::TransformRequest
  u.transform_response = OpenTopoDataUtilities::TransformResponse
}
